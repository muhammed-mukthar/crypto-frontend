import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import Spinner from "../components/Spinner";
import { BASEURL, Error, Success } from "../shared/utils";

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadUsers = async () => {
    setIsLoading(true);
    axios
      .get(`${BASEURL}/user/all`)
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleLoadUsers();
  }, []);

  const handleEnableUser = async (id, index) => {
    axios
      .put(`${BASEURL}/user/enable`, {
        userId: id,
      })
      .then((response) => {
        console.log(response.data.data);
        Success("User Enabaled Successfully");
        setUsers((prev) =>
          Object.values({
            ...prev,
            [index]: { ...prev[index], status: "active" },
          })
        );
      })
      .catch((e) => {
        console.log(e);
        Error(e.response.data.message);
      });
  };

  const handleDisableUser = async (id, index) => {
    axios
      .put(`${BASEURL}/user/disable`, {
        userId: id,
      })
      .then((response) => {
        console.log(response.data.data);
        Success("User Disbaled Successfully");
        setUsers((prev) =>
          Object.values({
            ...prev,
            [index]: { ...prev[index], status: "inactive" },
          })
        );
      })
      .catch((e) => {
        console.log(e);
        Error(e.response.data.message);
      });
  };

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("role") !== "admin"
    )
      navigate("/login");
  }, []);

  return (
    <div className="max-w-6xl m-auto">
      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-white">
                <thead className="text-center bg-transparent border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      S.No
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Joining Date{" "}
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Enabled
                    </th>
                    {/* <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4"
                    >
                      Delete
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {!isLoading && users ? (
                    users.map((user, index) => {
                      return (
                        <tr
                          key={index}
                          className=" bg-transparent text-center transition duration-300 ease-in-out hover:bg-slate-800"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {index + 1}
                          </td>
                          <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            {user.name}
                          </td>
                          <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            {user.email}
                          </td>
                          <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                            {user.createdAt.substring(0, 10)}
                          </td>
                          <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            <label
                              htmlFor={`default-toggle-${user._id}`}
                              className="inline-flex relative items-center cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                id={`default-toggle-${user._id}`}
                                className="sr-only peer"
                                checked={user.status === "active"}
                                onChange={() => {
                                  // handleDisableUser(user._id, index);
                                  console.log(user._id);
                                  user.status === "active"
                                    ? handleDisableUser(user._id, index)
                                    : handleEnableUser(user._id, index);
                                }}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </td>
                          {/* <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            <button className="bg-red-500 rounded-sm px-4 py-2 font-bold">
                              Delete
                            </button>
                          </td> */}
                        </tr>
                      );
                    })
                  ) : (
                    <td colSpan={6}>
                      <Spinner />
                    </td>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
