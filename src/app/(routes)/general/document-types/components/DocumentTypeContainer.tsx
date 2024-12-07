'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DocumentTypeModal } from '@/app/(routes)/general/document-types/components/DocumentTypeModal';
import { Card, CardContent, CardHeader, CardTitle, DeleteConfirmationDialog } from '@/components';
import { DataTableModileDocumentType } from '@/app/(routes)/general/document-types/components/DataTableMobileDocumentType';
import { DataTableDesktopDocumentType } from '@/app/(routes)/general/document-types/components/DataTableDesktopDocumentType';
import { UseDocumentTypes } from '../hooks';

export const DocumentTypeContainer = () => {
  const {
    error,
    isEditing,
    isDeleteDialogOpen,
    isModalOpen,
    isLoading,
    handleModalSubmit,
    handleDeleteDocumentType,
    handleCreateDocumentType,
    handleConfirmDelete,
    handleSearchChange,
    handleEditDocumentType,
    data,
    setSorting,
    sorting,
    setPage,
    selectedDocumentType,
    isDeleting,
    isModalCreating,
    isCreating,
    renderPaginationButtons,
    setIsDeleteDialogOpen,
    documentTypeToDelete,
    setIsModalOpen,
    page,
    search,
  } = UseDocumentTypes();

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Tipos de documentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <Button onClick={handleCreateDocumentType} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" /> Crear tipo de documento
            </Button>
            <Input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={handleSearchChange}
              className="w-full sm:max-w-xs"
            />
          </div>
          <div className="rounded-md border">
            <div className="hidden md:block">
              <DataTableDesktopDocumentType
                documentTypes={data?.documentTypes ?? []}
                setSorting={setSorting}
                sorting={sorting}
                handleEditDocumentType={handleEditDocumentType}
                handleDeleteDocumentType={handleDeleteDocumentType}
              />
            </div>
            <div className="xl:hidden">
              <DataTableModileDocumentType
                documentTypes={data?.documentTypes ?? []}
                onEdit={handleEditDocumentType}
                onDelete={handleDeleteDocumentType}
              />
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            {page > 1 && (
              <Button
                onClick={() => setPage(Math.max(page - 1, 1))}
                variant="outline"
                className="h-10 w-10 p-0"
                aria-label="Go to previous page"
              >
                ←
              </Button>
            )}
            {renderPaginationButtons()}
          </div>
        </div>
      </CardContent>
      <DocumentTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        documentType={selectedDocumentType}
        loading={isModalCreating ? isCreating : isEditing}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        text={`¿Estás seguro de que deseas eliminar el registro ${documentTypeToDelete?.name}? Esta acción no se puede deshacer.`}
      />
    </Card>
  );
};
