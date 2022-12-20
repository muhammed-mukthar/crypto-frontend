import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { BASEURL, Error, Success } from "../shared/utils";
import CommonButton from "./CommonButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    background: "#0f0f0f",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const ContactModal = ({ isModalOpen, setIsModalOpen }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [queryType, setQueryType] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  const addQuery = async () => {
    setIsLoading(true);

    if (!name || !email || !phone || !queryType || !description) {
      return Error("All fields are required");
    }

    // data.append("cloud_name", "rocky777");
    axios
      .post(`${BASEURL}/query`, {
        name,
        email,
        phone,
        queryType,
        description,
      })
      .then((data) => {
        setName("");
        setEmail("");
        setDescription("");
        setPhone("");
        setQueryType("general");
        closeModal();
        Success("Query sent!");
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const inputClass =
    "border-2 h-12 w-full  rounded-md mt-2 block border-slate-700 outline-none bg-transparent indent-2";
  return (
    <div className="">
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="text-white">
          <p className="font-xl font-semibold">Contact us</p>
          <div className="my-4 ">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Name
            </label>
            <input
              type="text"
              value={name}
              className={inputClass}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Query Type
            </label>
            <select
              value={queryType}
              onChange={(e) => setQueryType(e.target.value)}
              className={inputClass}
            >
              <option value="general">General</option>
              <option value="ama">AMA</option>
            </select>
          </div>
          <div className="my-4">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              className={inputClass}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>{" "}
          <div className="my-4">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Telegram Id
            </label>
            <input
              type="text"
              value={email}
              className={inputClass}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>{" "}
          <div className="my-4">
            <label className="text-sm my-4 text-left" htmlFor="email">
              Description
            </label>
            <input
              type="text"
              value={description}
              className={inputClass}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <CommonButton onClick={addQuery} text="Send" />
        </div>
      </Modal>
    </div>
  );
};

export default ContactModal;
// ReactDOM.render(<App />, appElement);
