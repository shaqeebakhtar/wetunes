import { auth } from '@/utils/auth';
import { db } from '@/utils/db';

export async function POST() {
  const session = await auth();

  if (!session?.user.id) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const room = await db.room.create({
    data: {
      adminId: session.user.id,
    },
  });

  return Response.json(
    {
      roomId: room.id,
    },
    {
      status: 200,
    }
  );
}
