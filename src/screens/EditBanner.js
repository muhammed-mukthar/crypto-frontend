import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import Spinner from "../components/Spinner";
import { BASEURL, Success } from "../shared/utils";

const EditBanner = () => {
  const { id } = useParams();
  const inputClass =
    "border-2 h-12 w-full  rounded-md mt-2 block border-slate-700 outline-none bg-transparent indent-2";
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const updateBanner = async () => {
    setIsLoading(true);
    axios
      .put(`${BASEURL}/banner`, {
        id,
        title,
        description,
        telegramLink: link,
        category: selectedCategory,
      })
      .then((data) => {
        console.log(data.url);

        setDescription("");
        setTitle("");
        setLink("");
        setImage("");
        setSelectedCategory("");
        navigate("/admin/all-banners");
        Success("Updated Successfully");
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const loadCategories = async () => {
    axios
      .get(`${BASEURL}/category/all`)
      .then((response) => setCategories(response.data.data))
      .catch((e) => console.log(e));
  };

  const loadBanner = async (id) => {
    axios
      .get(`${BASEURL}/banner/${id}`)
      .then((response) => {
        const { title, description, telegramLink, category } =
          response.data.data;
        setTitle(title);
        setDescription(description);
        setLink(telegramLink);
        setSelectedCategory(category);
      })

      .catch((e) => console.log(e));
  };

  useEffect(() => {
    loadCategories();
    loadBanner(id);
  }, []);

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
        <p className="text-2xl font-semibold">Edit Banner</p>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="my-4">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Category
            </label>
            <select
              type="text"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              className={inputClass}
            >
              {categories &&
                categories.map((category, index) => (
                  <option value={category._id} key={index}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="my-4">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Title
            </label>
            <input
              type="text"
              value={title}
              className={inputClass}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>{" "}
          <div className="my-4">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Description{" "}
            </label>
            <input
              type="text"
              value={description}
              className={inputClass}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Telegram Link
            </label>
            <input
              type="text"
              value={link}
              className={inputClass}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <CommonButton onClick={updateBanner} text="Update Banner" />
        </>
      )}
    </div>
  );
};

export default EditBanner;
