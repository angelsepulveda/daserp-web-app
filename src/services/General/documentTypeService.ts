import { DocumentType } from '@/types/documentType';
import { apiService } from '@/services/apiService';
import { BasePagination } from '@/types/basePagination';

export enum EnumApiDocumentType {
  fetchDocumentType = 'document-types',
}

export async function fetchDocumentType(
  page: number,
  pageSize: number,
  search: string,
  sortField: string | null,
  sortOrder: 'asc' | 'desc' | null,
): Promise<{ documentTypes: DocumentType[]; total: number }> {
  const apiUrl = `https://localhost:7035/api/${EnumApiDocumentType.fetchDocumentType}?PageIndex=${page}&PageSize=${pageSize}&Order=${sortOrder}&Sort=${sortField}&search=${encodeURIComponent(
    search,
  )}`;

  const response = await apiService<BasePagination<DocumentType>>(apiUrl, 'GET');
  const { data, count } = response;
  return { documentTypes: data, total: count };
}

export async function createDocumentType(documentType: Omit<DocumentType, 'id'>): Promise<void> {
  const apiUrl = 'https://localhost:7035/api/document-types';
  await apiService(apiUrl, 'POST', documentType);
}

export async function updateDocumentType(documentType: DocumentType): Promise<void> {
  const apiUrl = 'https://localhost:7035/api/document-types';
  await apiService(apiUrl, 'PUT', documentType);
}

export async function deleteDocumentType(id: string): Promise<void> {
  const apiUrl = `https://localhost:7035/api/document-types/${id}`;
  await apiService(apiUrl, 'DELETE');
}
