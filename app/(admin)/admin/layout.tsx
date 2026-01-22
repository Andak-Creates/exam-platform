import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Your admin layout nav/header */}
      {children}
    </div>
  );
}
