import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserTable.css';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [emailToDelete, setEmailToDelete] = useState("");
    const [editUser, setEditUser] = useState(null); // User to edit stored in state
    const [userType, setUserType] = useState("Farmer");

    useEffect(() => {
        fetchUsers();
    }, []);

    function fetchUsers() {
        axios.get("http://localhost:8080/api/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }

    function handleDelete(event) {
        const email = event.currentTarget.getAttribute("email");
        setEmailToDelete(email);
        setShowConfirm(true);
    }

    function confirmDelete() {
        axios.delete("http://localhost:8080/api/delete", {
            params: { email: emailToDelete }
        })
        .then(() => {
            fetchUsers();
            setShowConfirm(false);
        })
        .catch((err) => {
            console.error("Error deleting user: ", err);
        });
    }

    function cancelDelete() {
        setShowConfirm(false);
    }

    function handleEdit(event) {
        const email = event.currentTarget.getAttribute("email");
        const userToEdit = users.find(user => user.email === email);
        setEditUser(userToEdit);
    }

    function handleUpdate() {
        axios.put("http://localhost:8080/api/update", editUser)
            .then(() => {
                fetchUsers();
                setEditUser(null);
            })
            .catch((error) => {
                console.error("Error updating user:", error);
            });
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setEditUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    function handleAddUser() {
        const email = document.getElementById("emailAdd").value;
        const name = document.getElementById("nameAdd").value;
        const password = document.getElementById("passwordAdd").value;
        const confirmPassword = document.getElementById("confirmPasswordAdd").value;
        const address = document.getElementById("addressAdd").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const newUser = { email, name, password, userType, address };

        if (userType === "Farmer") {
            newUser.governmentId = document.getElementById("govIdAdd").value;
            newUser.phone = document.getElementById("phoneAdd").value;
        }

        axios.post("http://localhost:8080/api/add", newUser)
            .then(() => {
                fetchUsers();
                document.getElementById("addUserForm").style.display = "none";
            })
            .catch((error) => {
                console.error("Error adding user:", error);
            });
    }

    return (
        <div>
            <h1>User Table</h1>
            <div className="add-user-container">
                <button className="add-user-btn" onClick={() => document.getElementById('addUserForm').style.display = 'block'}>
                    + Add User
                </button>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>USER TYPE</th>
                        <th>EMAIL</th>
                        <th>PASSWORD</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.email}>
                            <td>{user.name}</td>
                            <td>{user.userType}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={handleEdit}
                                    email={user.email}
                                >
                                    ✎ Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    className="delete-btn"
                                    onClick={handleDelete}
                                    email={user.email}
                                >
                                    🗑️ Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit User Section */}
            {editUser && (
                <div id="updateSection">
                    <h2>Edit User</h2>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={editUser.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={editUser.email} onChange={handleInputChange} disabled />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={editUser.password} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>User Type:</label>
                        <input type="text" name="userType" value={editUser.userType} onChange={handleInputChange} />
                    </div>
                    <button onClick={handleUpdate}>Update User</button>
                    <button onClick={() => setEditUser(null)}>Cancel</button>
                </div>
            )}

            {/* Add User Form */}
            <div id="addUserForm" style={{ display: 'none' }}>
                <h2>Add New User</h2>
                <div>
                    <label>User Type:</label>
                    <select onChange={(e) => setUserType(e.target.value)}>
                        <option value="Farmer">Farmer</option>
                        <option value="Buyer">Buyer</option>
                    </select>
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" id="nameAdd" />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" id="emailAdd" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" id="passwordAdd" />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" id="confirmPasswordAdd" />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" id="addressAdd" />
                </div>

                {userType === "Farmer" && (
                    <>
                        <div>
                            <label>Government ID:</label>
                            <input type="text" id="govIdAdd" />
                        </div>
                        <div>
                            <label>Phone Number:</label>
                            <input type="text" id="phoneAdd" />
                        </div>
                    </>
                )}

                <button onClick={handleAddUser}>Add User</button>
                <button onClick={() => document.getElementById('addUserForm').style.display = 'none'}>Cancel</button>
            </div>

            {showConfirm && (
                <div className="confirm-modal">
                    <p>Are you sure you want to delete this user?</p>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={cancelDelete}>No</button>
                </div>
            )}
        </div>
    );
}

export default UserTable;
