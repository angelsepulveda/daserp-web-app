'use client';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DeleteConfirmationDialog,
  Input,
} from '@/components';
import { PlusCircle } from 'lucide-react';
import { DataTableModileDocumentType } from '@/app/(routes)/general/document-types/components/DataTableMobileDocumentType';
import { DataTableDesktopVoucherType } from '@/app/(routes)/general/voucher-types/components/DatableDesktopVoucherType';
import { UseVoucherTypes } from '@/app/(routes)/general/voucher-types/hooks';
import { VoucherTypeModal } from '@/app/(routes)/general/voucher-types/components/VoucherTypeModal';

export const VoucherTypes = () => {
  const {
    error,
    isEditing,
    isDeleteDialogOpen,
    isModalOpen,
    isLoading,
    handleModalSubmit,
    handleCreateVoucherType,
    handleEditVoucherType,
    handleConfirmDelete,
    handleSearchChange,
    data,
    setSorting,
    sorting,
    setPage,
    selectedVoucherType,
    isDeleting,
    isModalCreating,
    handleDeleteVoucherType,
    isCreating,
    renderPaginationButtons,
    setIsDeleteDialogOpen,
    voucherTypeToDelete,
    setIsModalOpen,
    page,
    search,
  } = UseVoucherTypes();

  if (error) return <div>Failed to load</div>;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Tipos de comprobantes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <Button onClick={handleCreateVoucherType} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" /> Crear tipo de comprobante
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
              <DataTableDesktopVoucherType
                isLoading={isLoading}
                voucherTypes={data?.voucherTypes ?? []}
                setSorting={setSorting}
                sorting={sorting}
                handleEditVoucherType={handleEditVoucherType}
                handleDeleteVoucherType={handleDeleteVoucherType}
              />
            </div>
            <div className="xl:hidden">
              <DataTableModileDocumentType
                documentTypes={data?.voucherTypes ?? []}
                onEdit={handleEditVoucherType}
                onDelete={handleDeleteVoucherType}
                isLoading={isLoading}
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
      <VoucherTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        voucherType={selectedVoucherType}
        loading={isModalCreating ? isCreating : isEditing}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        text={`¿Estás seguro de que deseas eliminar el registro ${voucherTypeToDelete?.name}? Esta acción no se puede deshacer.`}
      />
    </Card>
  );
};
