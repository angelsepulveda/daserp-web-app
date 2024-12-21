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
import { UseCountries } from '@/app/(routes)/general/address/countries/hooks/useCountries';
import { DataTableDesktopCountry } from '@/app/(routes)/general/address/countries/components/DataTableDesktopCountry';
import { DataTableModileCountry } from '@/app/(routes)/general/address/countries/components/DataTableMobileCountry';
import { CountryModal } from '@/app/(routes)/general/address/countries/components/CountryModal';

export const Countries = () => {
  const {
    error,
    isEditing,
    isDeleteDialogOpen,
    isModalOpen,
    isLoading,
    handleModalSubmit,
    handleCreateCountry,
    handleEditCountry,
    handleConfirmDelete,
    handleSearchChange,
    data,
    setSorting,
    sorting,
    setPage,
    selectedCountry,
    isDeleting,
    isModalCreating,
    handleDeleteCountry,
    isCreating,
    renderPaginationButtons,
    setIsDeleteDialogOpen,
    countryToDelete,
    setIsModalOpen,
    page,
    search,
  } = UseCountries();

  if (error) return <div>Failed to load</div>;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Tipos de comprobantes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <Button onClick={handleCreateCountry} className="w-full sm:w-auto">
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
              <DataTableDesktopCountry
                isLoading={isLoading}
                countries={data?.countries ?? []}
                setSorting={setSorting}
                sorting={sorting}
                handleEditCountry={handleEditCountry}
                handleDeleteCountry={handleDeleteCountry}
              />
            </div>
            <div className="xl:hidden">
              <DataTableModileCountry
                countries={data?.countries ?? []}
                onEdit={handleEditCountry}
                onDelete={handleDeleteCountry}
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
      <CountryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        country={selectedCountry}
        loading={isModalCreating ? isCreating : isEditing}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        text={`¿Estás seguro de que deseas eliminar el registro ${countryToDelete?.name}? Esta acción no se puede deshacer.`}
      />
    </Card>
  );
};
