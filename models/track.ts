import * as z from 'zod';

export const youtubeUrlRegex =
  /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

export const trackSchema = z.object({
  url: z
    .string()
    .regex(new RegExp(youtubeUrlRegex), { message: 'not a valid youtube url' }),
});
