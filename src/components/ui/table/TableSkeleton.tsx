import { Skeleton, TableCell, TableRow } from '@/components';

interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

export const TableSkeleton = ({ columns, rows = 5 }: TableSkeletonProps) => {
  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {[...Array(columns)].map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
