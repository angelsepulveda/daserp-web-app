export type DocumentType = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type DataTableProps = {
  onEdit: (user: DocumentType) => void;
  onDelete: (user: DocumentType) => void;
};
