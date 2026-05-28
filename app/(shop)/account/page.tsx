/**
 * Account page for Takhton
 * @module app/account/page
 */

"use client";

import { useState } from "react";
import { Package, Heart, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist.store";
import { ProductGrid } from "@/components/takhton/product/ProductGrid";

const tabs = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "profile", label: "Profile", icon: User },
];

// Mock orders data
const mockOrders = [
  {
    id: "1",
    orderNumber: "TK-2024-0001",
    date: "2024-05-15",
    status: "delivered",
    total: 587.95,
    items: 3,
  },
  {
    id: "2",
    orderNumber: "TK-2024-0002",
    date: "2024-05-20",
    status: "shipped",
    total: 245.0,
    items: 1,
  },
];

export interface AccountPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");
  const { items: wishlistItems } = useWishlistStore();

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-medium">
                JD
              </div>
              <div>
                <h1 className="font-medium">John Doe</h1>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm",
                      "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black",
                      activeTab === tab.id
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <section>
                <h2 className="t-heading-xl mb-6">Order History</h2>

                {mockOrders.length === 0 ? (
                  <div className="text-center py-12 border rounded-sm">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="font-medium mb-2">No orders yet</h3>
                    <p className="text-sm text-gray-500">
                      When you place an order, it will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-sm p-6"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Order {order.orderNumber}
                            </p>
                            <p className="text-sm text-gray-500">
                              Placed on {order.date}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "px-3 py-1 text-xs font-medium rounded-full",
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800",
                            )}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <p className="text-sm">
                            {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                          <p className="font-medium">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex gap-4 mt-4">
                          <button
                            type="button"
                            className="text-sm font-medium underline underline-offset-4 hover:text-gray-600"
                          >
                            View Order
                          </button>
                          <button
                            type="button"
                            className="text-sm font-medium underline underline-offset-4 hover:text-gray-600"
                          >
                            Track Package
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <section>
                <h2 className="t-heading-xl mb-6">
                  Wishlist ({wishlistItems.length})
                </h2>

                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12 border rounded-sm">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-sm text-gray-500">
                      Add items to your wishlist to save them for later.
                    </p>
                  </div>
                ) : (
                  <ProductGrid
                    products={wishlistItems.map((item) => item.product)}
                    columns={3}
                  />
                )}
              </section>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <section>
                <h2 className="t-heading-xl mb-6">Profile Settings</h2>

                <form className="max-w-md space-y-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      defaultValue="John Doe"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Add phone number"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className={cn(
                      "w-full py-3 text-sm font-medium rounded-full",
                      "bg-black text-white hover:bg-gray-800 transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                    )}
                  >
                    Save Changes
                  </button>
                </form>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
