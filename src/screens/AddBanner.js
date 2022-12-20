import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import Spinner from "../components/Spinner";
import { BASEURL } from "../shared/utils";

const AddBanner = () => {
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
  const addBanner = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("image", image);
    data.append("upload_preset", "crypto-signal");
    data.append("telegramLink", link);
    data.append("category", selectedCategory);
    data.append("description", description);
    data.append("title", title);
    axios
      .post(`${BASEURL}/banner`, data)
      .then((data) => {
        console.log(data.url);

        setDescription("");
        setTitle("");
        setLink("");
        setImage("");
        setSelectedCategory("");
        navigate("/admin/all-banners");
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

  useEffect(() => {
    loadCategories();
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
        <p className="text-2xl font-semibold">Add Post</p>
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
              <option value="">Select Category</option>
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
              Add file
            </label>
            <input
              type="file"
              name="image"
              className={inputClass}
              onChange={(e) => setImage(e.target.files[0])}
            />
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
            <textarea
              type="text"
              value={description}
              className="border-2 w-full  rounded-md mt-2 block border-slate-700 outline-none bg-transparent indent-2"
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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
          <CommonButton onClick={addBanner} text="Add Banner" />
        </>
      )}
    </div>
  );
};

export default AddBanner;
