import { ChangeEvent, useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import useSWRMutation from 'swr/mutation';
import {
  createCountry,
  deleteCountry,
  EnumApiCountry,
  fetchCountry,
  updateCountry,
} from '@/services';
import useSWR from 'swr';
import { toast } from '@/hooks';
import { Button } from '@/components';
import { TCountry } from '@/types/general/Address/country';

const ITEMS_PER_PAGE = 10;

export const UseCountries = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<TCountry | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [countryToDelete, setCountryToDelete] = useState<TCountry | null>(null);
  const [isModalCreating, setIsModalCreating] = useState<boolean>(false);

  const { trigger: deleteRegister, isMutating: isDeleting } = useSWRMutation(
    [EnumApiCountry.endpoint, 1, ITEMS_PER_PAGE, search],
    (_, { arg }: { arg: string }) => deleteCountry(arg),
  );

  const { trigger: editRegister, isMutating: isEditing } = useSWRMutation(
    [EnumApiCountry.endpoint, 1, ITEMS_PER_PAGE, search],
    (_, { arg }: { arg: TCountry }) => updateCountry(arg),
  );

  const { trigger: createRegister, isMutating: isCreating } = useSWRMutation(
    [EnumApiCountry.endpoint, 1, ITEMS_PER_PAGE, search],
    (_, { arg }: { arg: Omit<TCountry, 'id'> }) => createCountry(arg),
  );

  const { data, error, isLoading } = useSWR(
    [EnumApiCountry.endpoint, page, ITEMS_PER_PAGE, search],
    () =>
      fetchCountry(
        page,
        ITEMS_PER_PAGE,
        search,
        sorting.length > 0 ? (sorting[0].id as string) : 'Name',
        sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : 'asc',
      ),
    { keepPreviousData: true },
  );

  const handleCreateCountry = () => {
    setSelectedCountry(undefined);
    setIsModalOpen(true);
    setIsModalCreating(true);
  };

  const handleEditCountry = (country: TCountry) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
    setIsModalCreating(false);
  };

  const handleModalSubmit = async (country: Omit<TCountry, 'id'> & { id?: string }) => {
    if (country.id) {
      editRegister(country as TCountry)
        .then(() => {
          toast({
            title: 'País actualizado',
            description: `${country.name} se ha actualizado correctamente.`,
            variant: 'success',
          });
          setIsModalOpen(false);
          setPage(1);
        })
        .catch((err) => {
          toast({
            title: 'Error',
            description: 'Ocurrio un error.',
            variant: 'error',
          });
          setIsModalOpen(false);
          console.log(err);
        });
    } else {
      createRegister(country)
        .then(() => {
          toast({
            title: 'País creado',
            description: `${country.name} se ha creado correctamente.`,
            variant: 'success',
          });
          setIsModalOpen(false);
          setPage(1);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: 'Error',
            description: 'Ocurrio un error.',
            variant: 'error',
          });
          setIsModalOpen(false);
          console.log(err);
        });
    }
  };

  const handleDeleteCountry = async (country: TCountry) => {
    setCountryToDelete(country);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (countryToDelete) {
      deleteRegister(countryToDelete.id)
        .then(() => {
          toast({
            title: 'País eliminado',
            description: `${countryToDelete.name} se ha eliminado exitosamente.`,
            variant: 'success',
          });
          setIsDeleteDialogOpen(false);
          setCountryToDelete(null);
          setPage(1);
        })
        .catch((err) => {
          toast({
            title: 'Error',
            description: 'Ocurrio un error.',
            variant: 'error',
          });
          setIsDeleteDialogOpen(false);
          setCountryToDelete(null);
          console.log(err);
        });
    }
  };

  const totalPages = Math.ceil((data?.total ?? 0) / ITEMS_PER_PAGE);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 6;

    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => setPage(i)}
          variant={page === i ? 'default' : 'outline'}
          className="h-10 w-10 p-0"
          aria-label={`Go to page ${i}`}
          aria-current={page === i ? 'page' : undefined}
        >
          {i}
        </Button>,
      );
    }

    if (totalPages > maxVisiblePages) {
      buttons.push(
        <Button
          key="next"
          onClick={() => setPage(Math.min(page + 1, totalPages))}
          variant="outline"
          className="h-10 w-10 p-0"
          disabled={page === totalPages}
          aria-label="ir a la siguiente pagina"
        >
          →
        </Button>,
      );
    }

    return buttons;
  };

  return {
    renderPaginationButtons,
    handleSearchChange,
    handleConfirmDelete,
    handleCreateCountry,
    handleDeleteCountry,
    handleModalSubmit,
    handleEditCountry,
    setSorting,
    isModalCreating,
    isModalOpen,
    isDeleting,
    isDeleteDialogOpen,
    isCreating,
    error,
    isLoading,
    selectedCountry,
    isEditing,
    data,
    sorting,
    setPage,
    setIsDeleteDialogOpen,
    countryToDelete,
    setIsModalOpen,
    page,
    search,
  };
};
