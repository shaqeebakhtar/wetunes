import { roomSchema } from '@/models/room';
import { auth } from '@/utils/auth';
import { db } from '@/utils/db';

export async function POST(req: Request) {
  const body = await req.json();
  const session = await auth();

  if (!session?.user.id) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const validatedFields = roomSchema.safeParse(body);

  if (!validatedFields.success) {
    return Response.json({ error: 'invalid youtube url' }, { status: 400 });
  }

  const { name } = validatedFields.data;

  const room = await db.room.create({
    data: {
      name,
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
