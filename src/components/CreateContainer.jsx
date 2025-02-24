import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { categories } from "../utils/dataHelper";
import Loader from "./Loader";
import { storage } from "../firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { saveNewItem } from "../utils/firebaseFunctions";
import { v4 as uuidv4 } from 'uuid';

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [fields, setFields] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    setIsLoading(true);
    const fileData = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${fileData.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileData);
    uploadTask.on(
      "state_changed",
      (snap) => {

      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading file");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageAsset(url);
          setFields(true);
          setMsg("Image uploaded successfully..!");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
        });
      }
    );
  };

  const handleDeleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setFields(true);
      setMsg("Image deleted successfully..!");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!title || !category || !calories || !price || !imageAsset) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: uuidv4(),
          Title: title,
          ImageURL: imageAsset,
          Category: category,
          Calories: calories,
          Qty: 1,
          Price: price,
        };
        await saveNewItem(data); // Ensure you await this call
        setFields(true);
        setMsg("Item added successfully..!");
        setAlertStatus("success");
        clearData();
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while saving data");
      setAlertStatus("danger");
      clearData();
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setTitle("");
    setCalories("");
    setImageAsset("");
    setPrice("");
    setCategory("");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me title"
            style={{ color: "var(--text-color)" }}
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400"
          />
        </div>
        <div className="w-full">
          <select
            className="outline-none w-full text-base text-gray-500 border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white"
                  style={{ color: "var(--heading-color)" }}
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 rounded-lg w-full h-[225px] md:h-[420px] cursor-pointer relative">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      className="w-0 h-0"
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded"
                      className="w-full h-auto max-h-[420px] object-contain" // Responsive image sizing
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={handleDeleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
              style={{ color: "var(--text-color)" }}
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
              style={{ color: "var(--text-color)" }}
            />
          </div>
        </div>

        <div className="w-full flex items-center">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
