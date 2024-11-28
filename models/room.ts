import * as z from 'zod';

export const roomSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Room name can only be of 3-20 characters' })
    .max(20, { message: 'Room name can only be of 3-20 characters' }),
});
