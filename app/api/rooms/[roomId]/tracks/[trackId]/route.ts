import { db } from '@/utils/db';

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ roomId: string; trackId: string }>;
  }
) {
  const { roomId, trackId } = await params;

  let track = null;

  try {
    track = await db.track.update({
      where: {
        roomId,
        id: trackId,
      },
      data: {
        isPlaying: true,
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'error while playing next song', message: error },
      { status: 500 }
    );
  }

  return Response.json({ isPlaying: track.id }, { status: 200 });
}
