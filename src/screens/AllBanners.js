import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import Spinner from "../components/Spinner";
import { BASEURL, Error, Success } from "../shared/utils";

const AllBanners = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadUsers = async () => {
    setIsLoading(true);
    axios
      .get(`${BASEURL}/banner/all`)
      .then((response) => {
        setBanners(response.data.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleLoadUsers();
  }, []);

  const handleDelete = async (id, index) => {
    axios
      .delete(`${BASEURL}/banner/${id}`)
      .then((response) => {
        setBanners((prev) => prev.filter((i) => i._id !== id));
        Success("Deleted Successfully");
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
      <div className="flex flex-col">
        <div className="flex items-center text-white justify-between">
          <p className="text-lg">Banners</p>
          <CommonButton
            onClick={() => navigate("/admin/add-banner")}
            text="Add Post"
          />
        </div>
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
                      Title
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Link
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Added on
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Delete
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Edit
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
                  {!isLoading && banners ? (
                    banners.map((banner, index) => {
                      return (
                        <tr
                          key={index}
                          className=" bg-transparent text-center transition duration-300 ease-in-out hover:bg-slate-800"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {index + 1}
                          </td>
                          <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            {banner?.title}
                          </td>
                          <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            {banner?.description?.substring(0, 10)}...
                          </td>
                          <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            {banner?.telegramLink?.substring(0, 10)}...
                          </td>
                          <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                            {banner.createdAt.substring(0, 10)}
                          </td>
                          <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDelete(banner._id, index)}
                              className="bg-red-500 rounded-sm px-4 py-2 font-bold"
                            >
                              Delete
                            </button>
                          </td>
                          <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() =>
                                navigate(`/admin/edit/${banner._id}`)
                              }
                              className="bg-green-500 rounded-sm px-4 py-2 font-bold"
                            >
                              Edit
                            </button>
                          </td>
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

export default AllBanners;
