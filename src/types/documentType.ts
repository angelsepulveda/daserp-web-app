import { z } from 'zod';

export type DocumentType = {
  id: string;
  name: string;
  code: string;
  description: string;
};

export type DataTableProps = {
  onEdit: (user: DocumentType) => void;
  onDelete: (user: DocumentType) => void;
};

export const documentTypeSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener como minimo 2 caracteres')
    .max(20, 'El nombre no debe superar los 20 caracteres'),
  code: z.string().max(10, 'El codigo no debe superar los 10 caracteres'),
  description: z.string().max(256, 'La descripcion no debe superar los 256 caracteres'),
});

export type DocumentTypeFormData = z.infer<typeof documentTypeSchema>;
