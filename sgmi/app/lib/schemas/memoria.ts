import { z } from 'zod';

export const createMemoriaSchema = z.object({
  grupo_id: z.number().int().positive(),
  anio: z.number().int().min(2000).max(3000),
  contenido: z.string().optional()
});

export const updateMemoriaSchema = createMemoriaSchema.partial();

export type CreateMemoriaInput = z.infer<typeof createMemoriaSchema>;
export type UpdateMemoriaInput = z.infer<typeof updateMemoriaSchema>;
