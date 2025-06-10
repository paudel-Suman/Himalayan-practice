type FetchOptions = {
  url: string;
  errorMessage?: string;
};

export async function fetchData<T>({
  url,
  errorMessage = "Failed to fetch data",
}: FetchOptions): Promise<T | []> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(errorMessage);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
