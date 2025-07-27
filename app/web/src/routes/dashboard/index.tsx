import MainLayout from "@/components/layout/main-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DollarSign, Plus, Store, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: App,
});

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  role: "Store Owner",
};

const mockStores = [
  {
    id: "store-123",
    name: "My Fashion Store",
    status: "active",
    plan: "Pro",
    revenue: 12450,
    orders: 89,
    customers: 156,
  },
  {
    id: "store-456",
    name: "Tech Gadgets Shop",
    status: "active",
    plan: "Basic",
    revenue: 8920,
    orders: 45,
    customers: 78,
  },
];

function App() {
  return (
    <MainLayout role="user" user={mockUser}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your stores and view performance metrics
            </p>
          </div>
          <Link to="/dashboard/create-store">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Store
            </Button>
          </Link>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Stores
              </CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStores.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {mockStores
                  .reduce((sum, store) => sum + store.revenue, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStores.reduce((sum, store) => sum + store.orders, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStores.reduce((sum, store) => sum + store.customers, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stores List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Stores</CardTitle>
            <CardDescription>
              Manage and monitor your e-commerce stores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStores.map((store) => (
                <div
                  key={store.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Store className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{store.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant={
                            store.status === "active" ? "success" : "secondary"
                          }
                        >
                          {store.status}
                        </Badge>
                        <Badge variant="outline">{store.plan}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">
                        ${store.revenue.toLocaleString()}
                      </div>
                      <div>Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">
                        {store.orders}
                      </div>
                      <div>Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">
                        {store.customers}
                      </div>
                      <div>Customers</div>
                    </div>
                    {/* <Link to={`/store/${store.id}`}> */}
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                    {/* </Link> */}
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
