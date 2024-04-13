import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const token = localStorage.getItem("token");
  // add debouncing
  const getUsers = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user/bulk?filter=` + filter,
      { headers: { Authorization: "Bearer " + token } }
    );
    setUsers(response.data.user);
  };

  useEffect(() => {
    getUsers();
  }, [filter]);

  return (
    <div className="mx-2">
      <div className="font-bold mt-2 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200 focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <SingleUser user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};

function SingleUser({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={(e) =>
            navigate("/send?id=" + user._id + "&name=" + user.firstName)
          }
          text={"Send Money"}
        />
      </div>
    </div>
  );
}
