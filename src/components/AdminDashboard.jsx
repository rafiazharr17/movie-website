import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import UserManagement from "./UserManagement";

const AdminDashboard = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchAdminEmail();
  }, []);

  const fetchAdminEmail = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setAdminEmail(user.email);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    setIsSidebarOpen(false); // Close sidebar after selecting an item
  };

  const handleDashboardClick = () => {
    setActiveMenuItem(null);
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case "manageUsers":
        return <UserManagement mode="manage" />;
      case "updateUsers":
        return <UserManagement mode="update" />;
      case "deleteUsers":
        return <UserManagement mode="delete" />;
      default:
        return (
          <div className="bg-blue-800/30 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Welcome to Admin Dashboard
            </h2>
            <p className="text-sm mb-4">
              Select an option from the sidebar to manage users or perform other
              admin tasks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-700/30 p-3 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
                <ul className="text-sm space-y-1">
                  <li>Total Users: XX</li>
                  <li>Active Users: XX</li>
                  <li>New Users (This Month): XX</li>
                </ul>
              </div>
              <div className="bg-blue-700/30 p-3 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                <ul className="text-sm space-y-1">
                  <li>User "John Doe" registered</li>
                  <li>User "Jane Smith" updated profile</li>
                  <li>Admin "Alice" deleted user "Bob"</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-blue-100">
      <AdminHeader
        toggleSidebar={toggleSidebar}
        onDashboardClick={handleDashboardClick}
      />
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onMenuItemClick={handleMenuItemClick}
      />
      <motion.div
        className="p-4 pt-20 transition-all duration-300 ease-in-out"
        initial={false}
        animate={{
          marginLeft: isSidebarOpen ? "16rem" : "0",
          marginRight: "0",
          maxWidth: "100%",
        }}
      >
        <div className="bg-blue-800/30 p-4 rounded-lg shadow-lg mb-4">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-sm">Logged in as: {adminEmail}</p>
        </div>
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
