import { apiService } from '@/services/apiService';
import { BasePagination } from '@/types/basePagination';
import { TVoucherType } from '@/types';

export enum EnumApiVoucherType {
  fetchVoucharType = 'voucher-types',
}

export async function fetchVoucherType(
  page: number,
  pageSize: number,
  search: string,
  sortField: string | null,
  sortOrder: 'asc' | 'desc' | null,
): Promise<{ voucherTypes: TVoucherType[]; total: number }> {
  const apiUrl = `https://localhost:7035/api/${EnumApiVoucherType.fetchVoucharType}?PageIndex=${page}&PageSize=${pageSize}&Order=${sortOrder}&Sort=${sortField}&search=${encodeURIComponent(
    search,
  )}`;

  const response = await apiService<BasePagination<TVoucherType>>(apiUrl, 'GET');
  const { data, count } = response;
  return { voucherTypes: data, total: count };
}

export async function createVoucharType(voucherType: Omit<TVoucherType, 'id'>): Promise<void> {
  const apiUrl = 'https://localhost:7035/api/voucher-types';
  await apiService(apiUrl, 'POST', voucherType);
}

export async function updateVoucharType(voucherType: TVoucherType): Promise<void> {
  const apiUrl = 'https://localhost:7035/api/vourcher-types';
  await apiService(apiUrl, 'PUT', voucherType);
}

export async function deleteVoucharType(id: string): Promise<void> {
  const apiUrl = `https://localhost:7035/api/voucher-types/${id}`;
  await apiService(apiUrl, 'DELETE');
}
