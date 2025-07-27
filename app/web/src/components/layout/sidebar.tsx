"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  UserPlus,
  Settings,
  Store,
  Tag,
  Puzzle,
  ChevronDown,
  Menu,
  X,
  Palette,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

interface SidebarProps {
  role: "user" | "store" | "admin";
  storeId?: string;
}

export function Sidebar({ role, storeId }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getUserNavItems = () => [
    { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { name: "Create Store", to: "/dashboard/create-store", icon: Store },
  ];

  const getStoreNavItems = () => [
    { name: "Store Dashboard", to: `/store/${storeId}`, icon: Store },
    {
      name: "Inventory",
      icon: Package,
      children: [{ name: "Products", to: `/store/${storeId}/inventory` }],
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      children: [{ name: "All Orders", to: `/store/${storeId}/orders` }],
    },
    {
      name: "Discounts",
      icon: Tag,
      children: [{ name: "All Discounts", to: `/store/${storeId}/discounts` }],
    },
    {
      name: "Customers",
      icon: Users,
      children: [{ name: "All Customers", to: `/store/${storeId}/customers` }],
    },
    {
      name: "Employees",
      icon: UserPlus,
      children: [
        { name: "All Employees", to: `/store/${storeId}/employees` },
        { name: "Invite Employee", to: `/store/${storeId}/employees/invite` },
      ],
    },
    {
      name: "Design",
      icon: Palette,
      children: [
        { name: "Page Builder", to: `/store/${storeId}/design/page-builder` },
        { name: "Themes", to: `/store/${storeId}/design/themes` },
        { name: "Custom Code", to: `/store/${storeId}/design/custom-code` },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      children: [
        { name: "General", to: `/store/${storeId}/settings/general` },
        { name: "Billing", to: `/store/${storeId}/settings/billing` },
        { name: "Payments", to: `/store/${storeId}/settings/payments` },
        { name: "Shipping", to: `/store/${storeId}/settings/shipping` },
        { name: "Taxes", to: `/store/${storeId}/settings/taxes` },
        {
          name: "Notifications",
          to: `/store/${storeId}/settings/notifications`,
        },
        { name: "Integrations", to: `/store/${storeId}/settings/integrations` },
      ],
    },
  ];

  const getAdminNavItems = () => [
    { name: "Dashboard", to: "/admin", icon: LayoutDashboard },
    {
      name: "Stores",
      icon: Store,
      children: [{ name: "All Stores", to: "/admin/stores" }],
    },
    {
      name: "Users",
      icon: Users,
      children: [{ name: "All Users", to: "/admin/users" }],
    },
    {
      name: "Employees",
      icon: UserPlus,
      children: [{ name: "All Employees", to: "/admin/employees" }],
    },
    {
      name: "Plugins",
      icon: Puzzle,
      children: [{ name: "All Plugins", to: "/admin/plugins" }],
    },
    {
      name: "Marketplace",
      icon: Store,
      children: [{ name: "Browse Marketplace", to: "/admin/marketplace" }],
    },
  ];

  const getNavItems = () => {
    switch (role) {
      case "user":
        return getUserNavItems();
      case "store":
        return getStoreNavItems();
      case "admin":
        return getAdminNavItems();
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className={cn("font-semibold text-lg", isCollapsed && "hidden")}>
            {role === "admin"
              ? "Admin Panel"
              : role === "store"
                ? "Store Panel"
                : "Dashboard"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {/* Back to Dashboard button for store mode */}
        {role === "store" && (
          <Link to="/dashboard">
            <Button
              variant="outline"
              className="w-full justify-start border-dashed mb-4 bg-transparent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {!isCollapsed && "Back to Dashboard"}
            </Button>
          </Link>
        )}

        {navItems.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            pathname=""
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-50"
        >
          <Menu className="h-4 w-4" />
        </Button>

        {isMobileOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed left-0 top-0 h-full w-80 bg-card border-r shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold text-lg">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <NavContent />
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col h-screen bg-card border-r transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <NavContent />
      </div>
    </>
  );
}

function NavItem({
  item,
  pathname,
  isCollapsed,
}: {
  item: any;
  pathname: string;
  isCollapsed: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive =
    pathname === item.to ||
    (hasChildren && item.children.some((child: any) => pathname === child.to));

  if (hasChildren) {
    return (
      <div>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start",
            isCollapsed && "justify-center px-2"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <item.icon className="h-4 w-4" />
          {!isCollapsed && (
            <>
              <span className="ml-2">{item.name}</span>
              <ChevronDown
                className={cn(
                  "ml-auto h-4 w-4 transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </>
          )}
        </Button>

        {isOpen && !isCollapsed && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children.map((child: any) => (
              <Link key={child.to} to={child.to}>
                <Button
                  variant={pathname === child.to ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm"
                  size="sm"
                >
                  {child.name}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link to={item.to}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start",
          isCollapsed && "justify-center px-2"
        )}
      >
        <item.icon className="h-4 w-4" />
        {!isCollapsed && <span className="ml-2">{item.name}</span>}
      </Button>
    </Link>
  );
}
