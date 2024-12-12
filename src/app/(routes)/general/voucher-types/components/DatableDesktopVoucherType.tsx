import { Dispatch, SetStateAction, useMemo } from 'react';
import { ColumnDef, SortingState } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { TVoucherType } from '@/types';
import { Button, TableCustom } from '@/components';

type TDataTableDesktopVoucherTypeProps = {
  voucherTypes: TVoucherType[];
  setSorting: Dispatch<SetStateAction<SortingState>>;
  sorting: SortingState;
  handleEditVoucherType: (voucherType: TVoucherType) => void;
  handleDeleteVoucherType: (voucherType: TVoucherType) => void;
  isLoading: boolean;
};

export const DataTableDesktopVoucherType = ({
  voucherTypes,
  setSorting,
  sorting,
  handleDeleteVoucherType,
  handleEditVoucherType,
  isLoading,
}: TDataTableDesktopVoucherTypeProps) => {
  const columns = useMemo<ColumnDef<TVoucherType>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Nombre
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
      },
      {
        accessorKey: 'code',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Código
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
      },
      {
        accessorKey: 'description',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Descripción
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const documentType = row.original;
          return (
            <div className="flex space-x-2">
              <Button
                size="icon"
                onClick={() => handleEditVoucherType(documentType)}
                aria-label={`Edit ${documentType.name}`}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteVoucherType(documentType)}
                aria-label={`Delete ${documentType.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
        header: 'Actions',
      },
    ],
    [],
  );

  return (
    <TableCustom
      data={voucherTypes}
      columns={columns}
      setSorting={setSorting}
      sorting={sorting}
      isLoading={isLoading}
    />
  );
};
