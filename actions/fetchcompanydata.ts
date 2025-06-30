import { CompanyType } from "@/types/company";

export async function getCompanyInfo(): Promise<CompanyType> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/site-setting/fetch-site-setting`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Company Data");
    }

    const data = await res.json();

    return data.setting;
  } catch (error) {
    console.error("Error fetching Company Data:", error);
    throw error;
  }
}
