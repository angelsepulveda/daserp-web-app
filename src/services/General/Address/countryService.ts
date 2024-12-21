import { apiService } from '@/services/apiService';
import { BasePagination } from '@/types/basePagination';
import { TCountry } from '@/types/general/Address/country';

export enum EnumApiCountry {
  endpoint = 'countries',
}

export async function fetchCountry(
  page: number,
  pageSize: number,
  search: string,
  sortField: string | null,
  sortOrder: 'asc' | 'desc' | null,
): Promise<{ countries: TCountry[]; total: number }> {
  const apiUrl = `https://localhost:7035/api/${EnumApiCountry.endpoint}?PageIndex=${page}&PageSize=${pageSize}&Order=${sortOrder}&Sort=${sortField}&search=${encodeURIComponent(
    search,
  )}`;

  const response = await apiService<BasePagination<TCountry>>(apiUrl, 'GET');
  const { data, count } = response;
  return { countries: data, total: count };
}

export async function createCountry(country: Omit<TCountry, 'id'>): Promise<void> {
  const apiUrl = 'https://localhost:7035/api/countries';
  await apiService(apiUrl, 'POST', country);
}

export async function updateCountry(country: TCountry): Promise<void> {
  const apiUrl = 'https://localhost:7035/api/countries';
  await apiService(apiUrl, 'PUT', country);
}

export async function deleteCountry(id: string): Promise<void> {
  const apiUrl = `https://localhost:7035/api/countries/${id}`;
  await apiService(apiUrl, 'DELETE');
}
