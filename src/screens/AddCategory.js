import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import Spinner from "../components/Spinner";
import { BASEURL } from "../shared/utils";

const AddCategory = () => {
  const inputClass =
    "border-2 h-12 w-full  rounded-md mt-2 block border-slate-700 outline-none bg-transparent indent-2";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addCategory = async () => {
    setIsLoading(true);

    axios
      .post(`${BASEURL}/category`, {
        description,
        name,
      })
      .then((data) => {
        console.log(data.url);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("role") !== "admin"
    )
      navigate("/login");
  }, []);

  return (
    <div className="max-w-[80%] m-auto text-white text-left">
      <div className="mb-4">
        <p className="text-2xl font-semibold">Add Category</p>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="my-4">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Name
            </label>
            <input
              type="text"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Description
            </label>
            <input
              type="text"
              className={inputClass}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <CommonButton onClick={addCategory} text="Add Category" />
        </>
      )}
    </div>
  );
};

export default AddCategory;
