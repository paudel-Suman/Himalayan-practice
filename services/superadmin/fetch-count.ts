import { DashboardStats } from "@/types/dashboardstats";
import Cookies from "js-cookie";


export async function getDashboardStats(): Promise<DashboardStats> {
  const token = Cookies.get("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const [productsRes, ordersRes, customersRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/product/fetch-all-active-products`,
        { headers }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/super-admin/fetch-all-orders`,
        { headers }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/super-admin/fetch-all-customer`,
        { headers }
      ),
    ]);

    const [productsData, ordersData, customersData] = await Promise.all([
      productsRes.json(),
      ordersRes.json(),
      customersRes.json(),
    ]);

    const products = productsData.data?.products || [];
    const orders = ordersData.orders?.orders || [];
    const customers = customersData.data?.users || [];

    // Calculate total sales
    const totalSales = orders.reduce(
      (sum: number, order: any) => sum + (order.totalAmount || 0),
      0
    );

    return {
      productsCount: products.length,
      ordersCount: orders.length,
      customersCount: customers.length,
      totalSales,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      productsCount: 0,
      ordersCount: 0,
      customersCount: 0,
      totalSales: 0,
    };
  }
}
