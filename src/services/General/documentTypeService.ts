import { DocumentType } from '@/types/documentType';

const mockData: DocumentType[] = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? 'Admin' : 'User',
}));

export async function fetchDocumentType(
  page: number,
  pageSize: number,
  search: string,
): Promise<{ documentTypes: DocumentType[]; total: number }> {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

  let filteredData = mockData;
  if (search) {
    filteredData = mockData.filter(
      (documentType) =>
        documentType.name.toLowerCase().includes(search.toLowerCase()) ||
        documentType.email.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const total = filteredData.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return { documentTypes: paginatedData, total };
}
