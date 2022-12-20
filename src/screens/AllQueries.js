import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import Spinner from "../components/Spinner";
import { BASEURL, Error, Success } from "../shared/utils";

const AllQueries = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadQueries = async () => {
    setIsLoading(true);
    axios
      .get(`${BASEURL}/query/all`)
      .then((response) => {
        setQueries(response.data.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleLoadQueries();
  }, []);

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
                      Telegram Id
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Query Type
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Phone
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Posted on
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading && queries ? (
                    queries.map((query, index) => {
                      return (
                        <tr
                          key={index}
                          className="text-left  bg-transparent text-center transition duration-300 ease-in-out hover:bg-slate-800"
                        >
                          <td className="text-left px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {index + 1}
                          </td>
                          <td className="text-left text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            {query.name}
                          </td>
                          <td className="text-left text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            {query.email}
                          </td>
                          <td className="text-left text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            {query?.queryType}
                          </td>
                          <td className="text-left text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                            {query.phone}
                          </td>{" "}
                          <td className="text-left text-sm break-words  whitespace-pre-line text-white font-light px-6 py-4">
                            {query.description}
                          </td>
                          <td className="text-left text-sm  font-light px-6 py-4 whitespace-nowrap">
                            {query.createdAt.substring(0, 10)}
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

export default AllQueries;
