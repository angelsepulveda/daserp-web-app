import { DocumentType } from '@/types/documentType';
import { apiService } from '@/services/apiService';
import { BasePagination } from '@/types/basePagination';

export async function fetchDocumentType(
  page: number,
  pageSize: number,
  search: string,
  sortField: string | null,
  sortOrder: 'asc' | 'desc' | null,
): Promise<{ documentTypes: DocumentType[]; total: number }> {
  const apiUrl = `https://localhost:7035/api/document-types?PageIndex=${page}&PageSize=${pageSize}&Order=${sortOrder}&Sort=${sortField}&search=${encodeURIComponent(
    search,
  )}`;

  const response = await apiService<BasePagination<DocumentType>>(apiUrl, 'GET');
  const { data, count } = response;
  return { documentTypes: data, total: count };
}
