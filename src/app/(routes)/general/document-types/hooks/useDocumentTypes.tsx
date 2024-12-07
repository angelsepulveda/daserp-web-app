import { ChangeEvent, useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { DocumentType } from '@/types/documentType';
import useSWRMutation from 'swr/mutation';
import {
  createDocumentType,
  deleteDocumentType,
  EnumApiDocumentType,
  fetchDocumentType,
  updateDocumentType,
} from '@/services/General/documentTypeService';
import useSWR from 'swr';
import { toast } from '@/hooks';
import { Button } from '@/components';

const ITEMS_PER_PAGE = 10;

export const UseDocumentTypes = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | undefined>(
    undefined,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [documentTypeToDelete, setDocumentTypeToDelete] = useState<DocumentType | null>(null);
  const [isModalCreating, setIsModalCreating] = useState<boolean>(false);

  const { trigger: deleteRegister, isMutating: isDeleting } = useSWRMutation(
    [EnumApiDocumentType.fetchDocumentType, 1, ITEMS_PER_PAGE, search],
    (_, { arg }: { arg: string }) => deleteDocumentType(arg),
  );

  const { trigger: editRegister, isMutating: isEditing } = useSWRMutation(
    [EnumApiDocumentType.fetchDocumentType, 1, ITEMS_PER_PAGE, search],
    (_, { arg }: { arg: DocumentType }) => updateDocumentType(arg),
  );

  const { trigger: createRegister, isMutating: isCreating } = useSWRMutation(
    [EnumApiDocumentType.fetchDocumentType, 1, ITEMS_PER_PAGE, search],
    (_, { arg }: { arg: Omit<DocumentType, 'id'> }) => createDocumentType(arg),
  );

  const { data, error, isLoading } = useSWR(
    [EnumApiDocumentType.fetchDocumentType, page, ITEMS_PER_PAGE, search],
    () =>
      fetchDocumentType(
        page,
        ITEMS_PER_PAGE,
        search,
        sorting.length > 0 ? (sorting[0].id as string) : 'Name',
        sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : 'asc',
      ),
    { keepPreviousData: true },
  );

  const handleCreateDocumentType = () => {
    setSelectedDocumentType(undefined);
    setIsModalOpen(true);
    setIsModalCreating(true);
  };

  const handleEditDocumentType = (documentType: DocumentType) => {
    setSelectedDocumentType(documentType);
    setIsModalOpen(true);
    setIsModalCreating(false);
  };

  const handleModalSubmit = async (documentType: Omit<DocumentType, 'id'> & { id?: string }) => {
    if (documentType.id) {
      editRegister(documentType as DocumentType)
        .then(() => {
          toast({
            title: 'Tipo de documento actualizado',
            description: `${documentType.name} se ha actualizado correctamente.`,
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
      createRegister(documentType)
        .then(() => {
          toast({
            title: 'Tipo de documento creado',
            description: `${documentType.name} se ha creado correctamente.`,
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

  const handleDeleteDocumentType = async (documentType: DocumentType) => {
    setDocumentTypeToDelete(documentType);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (documentTypeToDelete) {
      deleteRegister(documentTypeToDelete.id)
        .then(() => {
          toast({
            title: 'Tipo de documento eliminado',
            description: `${documentTypeToDelete.name} se ha eliminado exitosamente.`,
            variant: 'success',
          });
          setIsDeleteDialogOpen(false);
          setDocumentTypeToDelete(null);
          setPage(1);
        })
        .catch((err) => {
          toast({
            title: 'Error',
            description: 'Ocurrio un error.',
            variant: 'error',
          });
          setIsDeleteDialogOpen(false);
          setDocumentTypeToDelete(null);
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
    handleCreateDocumentType,
    handleDeleteDocumentType,
    handleModalSubmit,
    handleEditDocumentType,
    setSorting,
    isModalCreating,
    isModalOpen,
    isDeleting,
    isDeleteDialogOpen,
    isCreating,
    error,
    isLoading,
    selectedDocumentType,
    isEditing,
    data,
    sorting,
    setPage,
    setIsDeleteDialogOpen,
    documentTypeToDelete,
    setIsModalOpen,
    page,
    search,
  };
};
