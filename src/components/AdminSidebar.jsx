import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminSidebar = ({ isOpen, onClose, onMenuItemClick }) => {
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);

  const toggleManageUsers = () => {
    setIsManageUsersOpen(!isManageUsersOpen);
  };

  return (
    <motion.div
      className={`fixed top-16 left-0 bottom-0 w-64 bg-blue-900 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-40`}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-200">Admin Menu</h2>
        <ul>
          <motion.li
            className="mb-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={toggleManageUsers}
              className="text-blue-100 hover:text-blue-300 transition-colors w-full text-left p-2 rounded-md block flex justify-between items-center"
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
            >
              <span>Manage Users</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  isManageUsersOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          </motion.li>
          <AnimatePresence>
            {isManageUsersOpen && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-4"
              >
                <motion.li
                  className="mb-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.button
                    onClick={() => onMenuItemClick("updateUsers")}
                    className="text-blue-100 hover:text-blue-300 transition-colors w-full text-left p-2 rounded-md block"
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  >
                    Update Users
                  </motion.button>
                </motion.li>
                <motion.li
                  className="mb-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.button
                    onClick={() => onMenuItemClick("deleteUsers")}
                    className="text-blue-100 hover:text-blue-300 transition-colors w-full text-left p-2 rounded-md block"
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  >
                    Delete Users
                  </motion.button>
                </motion.li>
              </motion.ul>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
