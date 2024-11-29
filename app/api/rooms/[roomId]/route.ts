import { auth } from '@/utils/auth';
import { db } from '@/utils/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const session = await auth();
  const { roomId } = await params;

  if (!session?.user.id) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const room = await db.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      tracks: true,
    },
  });

  return Response.json(
    {
      room,
    },
    {
      status: 200,
    }
  );
}
