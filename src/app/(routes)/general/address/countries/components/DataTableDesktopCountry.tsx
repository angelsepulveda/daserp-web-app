import { Dispatch, SetStateAction, useMemo } from 'react';
import { ColumnDef, SortingState } from '@tanstack/react-table';
import { Button, TableCustom } from '@/components';
import { ArrowDown, ArrowUp, ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { TCountry } from '@/types/general/Address/country';

type TDataTableDesktopCountryProps = {
  countries: TCountry[];
  setSorting: Dispatch<SetStateAction<SortingState>>;
  sorting: SortingState;
  handleEditCountry: (country: TCountry) => void;
  handleDeleteCountry: (country: TCountry) => void;
  isLoading: boolean;
};

export const DataTableDesktopCountry = ({
  countries,
  setSorting,
  sorting,
  handleDeleteCountry,
  handleEditCountry,
  isLoading,
}: TDataTableDesktopCountryProps) => {
  const columns = useMemo<ColumnDef<TCountry>[]>(
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
        accessorKey: 'demonym',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Gentilicio
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
          const country = row.original;
          return (
            <div className="flex space-x-2">
              <Button
                size="icon"
                onClick={() => handleEditCountry(country)}
                aria-label={`Edit ${country.name}`}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteCountry(country)}
                aria-label={`Delete ${country.name}`}
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
      data={countries}
      columns={columns}
      setSorting={setSorting}
      sorting={sorting}
      isLoading={isLoading}
    />
  );
};
