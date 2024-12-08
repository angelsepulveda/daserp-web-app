import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/components';
import { DocumentType } from '@/types/documentType';
import { Edit, Trash2 } from 'lucide-react';

interface CardViewProps {
  documentTypes: DocumentType[];
  onEdit: (documentType: DocumentType) => void;
  onDelete: (documentType: DocumentType) => void;
  isLoading: boolean;
}

export const DataTableModileDocumentType = ({
  documentTypes,
  onEdit,
  onDelete,
  isLoading,
}: CardViewProps) => {
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
        {documentTypes.map((documentType) => (
          <Card key={documentType.id}>
            <CardHeader>
              <CardTitle>{documentType.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Código:</strong> {documentType.code}
              </p>
              <p>
                <strong>Descripción:</strong> {documentType.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(documentType)}
                aria-label={`Editar ${documentType.name}`}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(documentType)}
                aria-label={`Eliminar ${documentType.name}`}
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
