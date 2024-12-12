import { ChangeEvent, useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { toast } from '@/hooks';
import { Button } from '@/components';
import { TVoucherType } from '@/types';
import {
  createVoucharType,
  deleteVoucharType,
  EnumApiVoucherType,
  fetchVoucherType,
  updateVoucharType,
} from '@/services/General/voucherTypeService';

const ITEMS_PER_PAGE = 10;

export const UseVoucherTypes = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVoucherType, setSelectedVoucherType] = useState<TVoucherType | undefined>(
    undefined,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [voucherTypeToDelete, setVoucherTypeToDelete] = useState<TVoucherType | null>(null);
  const [isModalCreating, setIsModalCreating] = useState<boolean>(false);

  const { trigger: deleteRegister, isMutating: isDeleting } = useSWRMutation(
    [EnumApiVoucherType.fetchVoucharType, 1, ITEMS_PER_PAGE, search],
    (_, { arg }: { arg: string }) => deleteVoucharType(arg),
  );

  const { trigger: editRegister, isMutating: isEditing } = useSWRMutation(
    [EnumApiVoucherType.fetchVoucharType, 1, ITEMS_PER_PAGE, search],
    (_, { arg }: { arg: TVoucherType }) => updateVoucharType(arg),
  );

  const { trigger: createRegister, isMutating: isCreating } = useSWRMutation(
    [EnumApiVoucherType.fetchVoucharType, 1, ITEMS_PER_PAGE, search],
    (_, { arg }: { arg: Omit<TVoucherType, 'id'> }) => createVoucharType(arg),
  );

  const { data, error, isLoading } = useSWR(
    [EnumApiVoucherType.fetchVoucharType, page, ITEMS_PER_PAGE, search],
    () =>
      fetchVoucherType(
        page,
        ITEMS_PER_PAGE,
        search,
        sorting.length > 0 ? (sorting[0].id as string) : 'Name',
        sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : 'asc',
      ),
    { keepPreviousData: true },
  );

  const handleCreateVoucherType = () => {
    setSelectedVoucherType(undefined);
    setIsModalOpen(true);
    setIsModalCreating(true);
  };

  const handleEditVoucherType = (voucherType: TVoucherType) => {
    setSelectedVoucherType(voucherType);
    setIsModalOpen(true);
    setIsModalCreating(false);
  };

  const handleModalSubmit = async (voucherType: Omit<TVoucherType, 'id'> & { id?: string }) => {
    if (voucherType.id) {
      editRegister(voucherType as TVoucherType)
        .then(() => {
          toast({
            title: 'Tipo de comprobante actualizado',
            description: `${voucherType.name} se ha actualizado correctamente.`,
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
      createRegister(voucherType)
        .then(() => {
          toast({
            title: 'Tipo de comprobante creado',
            description: `${voucherType.name} se ha creado correctamente.`,
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
    }
  };

  const handleDeleteVoucherType = async (voucherType: TVoucherType) => {
    setVoucherTypeToDelete(voucherType);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (voucherTypeToDelete) {
      deleteRegister(voucherTypeToDelete.id)
        .then(() => {
          toast({
            title: 'Tipo de comprobante eliminado',
            description: `${voucherTypeToDelete.name} se ha eliminado exitosamente.`,
            variant: 'success',
          });
          setIsDeleteDialogOpen(false);
          setSelectedVoucherType(undefined);
          setPage(1);
        })
        .catch((err) => {
          toast({
            title: 'Error',
            description: 'Ocurrio un error.',
            variant: 'error',
          });
          setIsDeleteDialogOpen(false);
          setSelectedVoucherType(undefined);
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
    handleCreateVoucherType,
    handleDeleteVoucherType,
    handleModalSubmit,
    handleEditVoucherType,
    setSorting,
    isModalCreating,
    isModalOpen,
    isDeleting,
    isDeleteDialogOpen,
    isCreating,
    error,
    isLoading,
    selectedVoucherType,
    isEditing,
    data,
    sorting,
    setPage,
    setIsDeleteDialogOpen,
    voucherTypeToDelete,
    setIsModalOpen,
    page,
    search,
  };
};
