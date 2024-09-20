import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useToast } from "@chakra-ui/react";

const UserManagement = ({ mode }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error fetching users",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setUsers(data);
    }
  };

  const handleUpdateUser = async (user) => {
    if (editingUser && editingUser.id === user.id) {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: editingUser.username,
          is_admin: editingUser.is_admin,
        })
        .eq("id", user.id);

      if (error) {
        toast({
          title: "Error updating user",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "User updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEditingUser(null);
        fetchUsers();
      }
    } else {
      setEditingUser({ ...user });
    }
  };

  const handleDeleteUser = async (id) => {
    const { error } = await supabase.from("profiles").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error deleting user",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "User deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchUsers();
    }
  };

  const renderActions = (user) => {
    const isEditing = editingUser && editingUser.id === user.id;

    switch (mode) {
      case "manage":
        return (
          <>
            <button
              onClick={() => handleUpdateUser(user)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2 transition duration-300"
            >
              {isEditing ? "Save" : "Update"}
            </button>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition duration-300"
            >
              Delete
            </button>
          </>
        );
      case "update":
        return (
          <button
            onClick={() => handleUpdateUser(user)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2 transition duration-300"
          >
            {isEditing ? "Save" : "Update"}
          </button>
        );
      case "delete":
        return (
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition duration-300"
          >
            Delete
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-blue-800/30 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-700">
              <th className="text-left py-2">Username</th>
              <th className="text-left py-2">Is Admin</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-blue-700/50">
                <td className="py-2">
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="text"
                      value={editingUser.username}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          username: e.target.value,
                        })
                      }
                      className="bg-blue-700/30 text-white px-2 py-1 rounded"
                    />
                  ) : (
                    user.username || "N/A"
                  )}
                </td>
                <td className="py-2">
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="checkbox"
                      checked={editingUser.is_admin}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          is_admin: e.target.checked,
                        })
                      }
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  ) : user.is_admin ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className="py-2">{renderActions(user)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
