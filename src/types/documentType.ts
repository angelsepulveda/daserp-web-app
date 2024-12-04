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
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name must be at most 50 characters'),
  code: z.string().max(10, 'Name must be at most 10 characters'),
  description: z.string().max(256, 'Name must be at most 256 characters'),
});

export type DocumentTypeFormData = z.infer<typeof documentTypeSchema>;
