import { auth } from '@/utils/auth';
import { db } from '@/utils/db';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ roomId: string }>;
  }
) {
  const session = await auth();
  const searchParams = req.nextUrl.searchParams;
  const { roomId } = await params;
  const trackId = searchParams.get('currTrack') as string;

  if (!session?.user.id) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const isRoomAdmin = await db.room.findFirst({
    where: {
      id: roomId,
      adminId: session.user.id,
    },
  });

  if (!isRoomAdmin) {
    return Response.json({ error: 'access forbidden' }, { status: 403 });
  }

  let track = null;

  try {
    track = await db.track.delete({
      where: {
        id: trackId,
        roomId,
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'error while playing next song', message: error },
      { status: 500 }
    );
  }

  return Response.json({ next: !!track }, { status: 200 });
}
