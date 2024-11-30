'use client';

import { useState, useMemo, ChangeEvent } from 'react';
import useSWR from 'swr';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { DataTableProps, DocumentType } from '@/types/documentType';
import { fetchDocumentType } from '@/services/General/documentTypeService';

const ITEMS_PER_PAGE = 10;

export const DataTableDocumentType = ({ onEdit, onDelete }: DataTableProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, error, isLoading } = useSWR(
    [`users`, page, ITEMS_PER_PAGE, search],
    () => fetchDocumentType(page, ITEMS_PER_PAGE, search),
    { keepPreviousData: true },
  );

  const columns = useMemo<ColumnDef<DocumentType>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(user)}
                aria-label={`Edit ${user.name}`}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDelete(user)}
                aria-label={`Delete ${user.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
        header: 'Actions',
      },
    ],
    [onEdit, onDelete],
  );

  const table = useReactTable({
    data: data?.documentTypes ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
          aria-label="Go to next page"
        >
          →
        </Button>,
      );
    }

    return buttons;
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleSearchChange}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Button
          onClick={() => setPage(Math.max(page - 1, 1))}
          variant="outline"
          className="h-10 w-10 p-0"
          disabled={page === 1}
          aria-label="Go to previous page"
        >
          ←
        </Button>
        {renderPaginationButtons()}
      </div>
    </div>
  );
};
