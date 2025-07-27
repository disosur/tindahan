import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";

export const Route = createFileRoute("/store/")({
  component: RouteComponent,
});

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  role: "Store Owner",
  store: "My Fashion Store",
};

const mockStats = {
  revenue: {
    current: 12450,
    previous: 11200,
    change: 11.2,
  },
  orders: {
    current: 89,
    previous: 76,
    change: 17.1,
  },
  customers: {
    current: 156,
    previous: 142,
    change: 9.9,
  },
  products: {
    current: 45,
    previous: 43,
    change: 4.7,
  },
};

const recentOrders = [
  {
    id: "#1234",
    customer: "Alice Johnson",
    amount: 89.99,
    status: "completed",
  },
  { id: "#1235", customer: "Bob Smith", amount: 156.5, status: "processing" },
  { id: "#1236", customer: "Carol Davis", amount: 234.0, status: "shipped" },
  { id: "#1237", customer: "David Wilson", amount: 67.25, status: "pending" },
];

export default function RouteComponent() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "processing":
        return "warning";
      case "shipped":
        return "info";
      case "pending":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <MainLayout role="store" storeId="" user={mockUser}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Store Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your store performance and key metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockStats.revenue.current.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-success" />+
                {mockStats.revenue.change}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.orders.current}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-success" />+
                {mockStats.orders.change}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.customers.current}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-success" />+
                {mockStats.customers.change}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.products.current}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-success" />+
                {mockStats.products.change}% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">${order.amount}</span>
                    <Badge variant={getStatusColor(order.status) as any}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
