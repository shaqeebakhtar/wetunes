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

  const track = await db.track.update({
    where: {
      roomId,
      id: trackId,
    },
    data: {
      isPlaying: true,
    },
  });

  return Response.json({ isPlaying: track.id }, { status: 200 });
}
