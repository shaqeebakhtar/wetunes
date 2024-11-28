import { auth } from '@/utils/auth';

import { db } from '@/utils/db';

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ roomId: string; trackId: string }>;
  }
) {
  const session = await auth();
  const { roomId, trackId } = await params;

  if (!session?.user.id) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const track = await db.track.findFirst({
    where: {
      roomId,
      id: trackId,
    },
  });

  if (!track) {
    return Response.json({ error: 'track not found' }, { status: 404 });
  }

  let vote = null;

  try {
    vote = await db.vote.create({
      data: {
        voterId: session.user.id,
        votedTrackId: trackId,
      },
      include: {
        track: true,
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'error while voting', message: error },
      { status: 200 }
    );
  }

  return Response.json({ upVoted: !!vote }, { status: 200 });
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ roomId: string; trackId: string }>;
  }
) {
  const session = await auth();
  const { roomId, trackId } = await params;

  if (!session?.user.id) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const track = await db.track.findFirst({
    where: {
      roomId,
      id: trackId,
    },
  });

  if (!track) {
    return Response.json({ error: 'track not found' }, { status: 404 });
  }

  let vote = null;

  try {
    vote = await db.vote.delete({
      where: {
        voterId_votedTrackId: {
          voterId: session.user.id,
          votedTrackId: trackId,
        },
      },
      include: {
        track: true,
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'error while down voting', message: error },
      { status: 200 }
    );
  }

  return Response.json({ downVoted: !!vote }, { status: 200 });
}
