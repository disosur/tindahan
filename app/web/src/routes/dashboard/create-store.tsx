import MainLayout from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Badge, Check, Link } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/create-store")({
  component: RouteComponent,
});

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  role: "Store Owner",
};

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 29,
    features: ["Up to 100 products", "Basic analytics", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    features: [
      "Up to 1000 products",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    features: [
      "Unlimited products",
      "Custom integrations",
      "Dedicated support",
      "White-label",
    ],
  },
];

function RouteComponent() {
  const [storeName, setStoreName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Redirect to new store
    }, 2000);
  };

  return (
    <MainLayout role="user" user={mockUser}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Store</h1>
            <p className="text-muted-foreground">
              Set up your new e-commerce store in minutes
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Store Details */}
          <Card>
            <CardHeader>
              <CardTitle>Store Details</CardTitle>
              <CardDescription>
                Basic information about your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="storeName" className="text-sm font-medium">
                  Store Name
                </label>
                <Input
                  id="storeName"
                  placeholder="Enter your store name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Plan Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
              <CardDescription>
                Select the plan that best fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors relative ${
                      selectedPlan === plan.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-4">
                        Most Popular
                      </Badge>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{plan.name}</h3>
                        <div className="text-2xl font-bold">
                          ${plan.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            /month
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-success" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Link to="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={!storeName || isLoading}>
              {isLoading ? "Creating Store..." : "Create Store"}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
