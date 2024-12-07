import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components';
import { DocumentType } from '@/types/documentType';
import { Edit, Trash2 } from 'lucide-react';

interface CardViewProps {
  documentTypes: DocumentType[];
  onEdit: (documentType: DocumentType) => void;
  onDelete: (documentType: DocumentType) => void;
}

export const DataTableModileDocumentType = ({ documentTypes, onEdit, onDelete }: CardViewProps) => {
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
};
