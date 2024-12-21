import { z } from 'zod';

export type TCountry = {
  id: string;
  name: string;
  code: string;
  demonym: string;
};

export const countrySchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener como minimo 2 caracteres')
    .max(200, 'El nombre no debe superar los 200 caracteres'),
  code: z.string().max(50, 'El codigo no debe superar los 50 caracteres'),
  demonym: z.string().max(255, 'La descripcion no debe superar los 255 caracteres'),
});

export type TCountryFormData = z.infer<typeof countrySchema>;
