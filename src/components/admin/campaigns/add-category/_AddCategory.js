import React, { useState } from "react";
import "./AddCategory.css";
import UserTable from "../../../common/table/UserTable";
import AddUserForm from "../../../common/forms/AddUserForm";
import EditUserForm from "../../../common/forms/EditUserForm";

const AddCategory = () => {
  const usersData = [
    { id: 1, name: "Tania", username: "floppydiskette" },
    { id: 2, name: "Craig", username: "siliconeidolon" },
    { id: 3, name: "Ben", username: "benisphere" },
  ];
  const initialFormState = { id: null, name: "", username: "" };

  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const addUser = (user) => {
    //extracting context
    // const { employees, removeEmployee, editEmployee } = useContext(GlobalContext);
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };
  return (
    <div>
      <div className="container">
        <h1>Campaigns</h1>
        <div className="flex-row">
          <div className="flex-large">
            {editing ? (
              <div>
                <h2>Edit user</h2>
                <EditUserForm
                  setEditing={setEditing}
                  currentUser={currentUser}
                  updateUser={updateUser}
                />
              </div>
            ) : (
              <div>
                <h2>Add user</h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
          </div>
          <div className="flex-large">
            <UserTable
              users={users}
              deleteUser={deleteUser}
              editRow={editRow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
