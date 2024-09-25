import React, { useEffect, useState } from "react";
import usersCss from "../users/Users.module.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { setDriver } from "localforage";
function Users() {
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState({});
  const [isAdmin, setIsAdmin] = useState();
  const [editBox, setEditBox] = useState("none");
  useEffect(() => {
    axios("http://localhost:3000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);
  return (
    <>
      <title>Users / Admin</title>
      <div className={usersCss.container}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>IsADMIN</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((elem) => {
              return (
                <tr key={uuidv4()}>
                  <td>{elem.id}</td>
                  <td>{elem.name}</td>
                  <td>{elem.email}</td>
                  <td>{elem.isAdmin ? "True" : "False"}</td>
                  <td>
                    <button
                      id={elem.id}
                      className={usersCss.delete_btn}
                      onClick={(e) => {
                        let id = e.currentTarget.id;
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            axios.delete("http://localhost:3000/users/" + id);
                            setUsers(users.filter((elem) => elem.id != id));
                            Swal.fire({
                              title: "Deleted!",
                              text: "This user has been deleted!",
                              icon: "success",
                            });
                          }
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      id={elem.id}
                      className={usersCss.edit_btn}
                      onClick={(e) => {
                        let id = e.target.id;
                        let edit_data = users.find((elem) => elem.id == id);
                        setEdit(edit_data);
                        setIsAdmin(edit_data.isAdmin);

                        document
                          .querySelector(".edit_box")
                          .classList.toggle("none");
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="edit_box none">
          <h2>Edit Box</h2>
          <form action="" className={usersCss.inputs}>
            <label htmlFor="">Name</label>
            <input type="text" readOnly value={edit.name} />
            <label htmlFor="">Email</label>

            <input type="text" readOnly value={edit.email} />
            <label htmlFor="" style={{ fontSize: "20px" }}>
              Is admin
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="radio"
                id="true"
                name="admin"
                value="true"
                checked={isAdmin === true}
                onChange={(e) => {
                  setIsAdmin(e.target.value === "true");
                }}
              />
              <label>True</label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="radio"
                id="false"
                name="admin"
                value="false"
                checked={isAdmin === false}
                onChange={(e) => {
                  setIsAdmin(e.target.value === "true");
                }}
              />
              <label>False</label>
            </div>
            <input
              id={edit.id}
              type="submit"
              onClick={(e) => {
                let id = e.currentTarget.id;
                console.log(id);
                e.preventDefault();
                // let edited_user = {
                //   name: edit.name,
                //   email: edit.email,
                // };
                // console.log(edited_user);
                axios.patch("http://localhost:3000/users/" + id, {
                  isAdmin: isAdmin,
                });

                window.location.reload();
                document.querySelector(".edit_box").classList.toggle("none");
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Users;
