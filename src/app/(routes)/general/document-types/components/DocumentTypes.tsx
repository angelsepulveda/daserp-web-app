'use client';

import { DocumentType } from '@/types/documentType';
import { DataTableDocumentType } from '@/app/(routes)/general/document-types/components/DataTableDocumentType';

export const DocumentTypes = () => {
  const handleEdit = (user: DocumentType) => {
    console.log('Edit user:', user);
    // Implement edit logic here
  };

  const handleDelete = (user: DocumentType) => {
    console.log('Delete user:', user);
    // Implement delete logic here
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Tipos de documentos</h1>
      <DataTableDocumentType onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
};
