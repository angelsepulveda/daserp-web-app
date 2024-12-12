import { DocumentType } from '@/types/documentType';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/components';
import { Edit, Trash2 } from 'lucide-react';
import { TVoucherType } from '@/types';

type TDataTableMobileVoucherTypeProps = {
  vouchetTypes: TVoucherType[];
  onEdit: (voucherType: TVoucherType) => void;
  onDelete: (voucherType: TVoucherType) => void;
  isLoading: boolean;
};

export const DataTableModileVoucherType = ({
  vouchetTypes,
  onEdit,
  onDelete,
  isLoading,
}: TDataTableMobileVoucherTypeProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 gap-4">
        {vouchetTypes.map((voucherType) => (
          <Card key={voucherType.id}>
            <CardHeader>
              <CardTitle>{voucherType.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Código:</strong> {voucherType.code}
              </p>
              <p>
                <strong>Descripción:</strong> {voucherType.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(voucherType)}
                aria-label={`Editar ${voucherType.name}`}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(voucherType)}
                aria-label={`Eliminar ${voucherType.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
};
