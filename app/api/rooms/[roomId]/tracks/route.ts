import { trackSchema, youtubeUrlRegex } from '@/models/track';
import { auth } from '@/utils/auth';
import { db } from '@/utils/db';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const body = await req.json();
  const session = await auth();
  const { roomId } = await params;

  if (!session?.user.id) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const validatedFields = trackSchema.safeParse(body);

  if (!validatedFields.success) {
    return Response.json({ error: 'invalid youtube url' }, { status: 400 });
  }

  const { url } = validatedFields.data;

  const urlMatch = url.match(new RegExp(youtubeUrlRegex)) as RegExpMatchArray;

  const videoId = urlMatch[1];

  let track = null;

  // fetch youtube details
  const urlMetaData = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YT_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => data.items[0].snippet);

  try {
    track = await db.track.create({
      data: {
        url,
        roomId,
        title: urlMetaData.title,
        videoId,
        hdThumbnailUrl: urlMetaData.thumbnails.standard.url,
        sdThumbnailUrl: urlMetaData.thumbnails.high.url,
        channel: urlMetaData.channelTitle,
      },
    });

    // upvote the track by default for the person who added it
    await db.vote.create({
      data: {
        voterId: session.user.id,
        votedTrackId: track.id,
      },
      include: {
        track: true,
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'error while adding track to queue', message: error },
      { status: 500 }
    );
  }

  return Response.json(
    {
      track,
    },
    {
      status: 200,
    }
  );
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const session = await auth();
  const { roomId } = await params;

  if (!session?.user.id) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  let tracks = null;

  try {
    tracks = await db.track.findMany({
      where: {
        roomId,
      },
      include: {
        votes: {
          select: {
            votedTrackId: true,
            voterId: true,
          },
        },
        _count: {
          select: {
            votes: true,
          },
        },
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'error while fetching tracks', message: error },
      { status: 500 }
    );
  }

  return Response.json(
    {
      tracks,
    },
    {
      status: 200,
    }
  );
}
