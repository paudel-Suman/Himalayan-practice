export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
interface ApiClientOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: object;
  token?: string;
}

export async function apiClient<T>(
  url: string,
  { method = "GET", headers = {}, body, token }: ApiClientOptions = {}
): Promise<T> {
  const isFormData = body instanceof FormData;

  const res = await fetch(url, {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isFormData ? body : JSON.stringify(body),
  });

  const data = await res.json();

  // if (!res.ok) {
  //   // showError(data.message || 'API request failed');
  //   throw new Error(data.message || 'API request failed');
  // }

  return data;
}
