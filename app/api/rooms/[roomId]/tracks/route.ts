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

  const track = await db.track.create({
    data: {
      url,
      roomId,
      videoId,
      hdThumbnailUrl: `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      sdThumbnailUrl: `http://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    },
  });

  return Response.json(
    {
      track,
    },
    {
      status: 200,
    }
  );
}
