export async function apiService<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  customHeaders?: Record<string, string>,
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders, // Agrega encabezados personalizados si es necesario
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    throw error;
  }
}
