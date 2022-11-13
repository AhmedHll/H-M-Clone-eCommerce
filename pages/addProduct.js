import React, { useRef, useState } from "react";
import Spinner from "../components/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import categories from "../utils/categories";

function addProduct() {
  const [checked, setChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState(null);
  const [images, setImages] = useState(null);
  const [price, setPrice] = useState(null);
  const [previewPrice, setPreviewPrice] = useState(null);
  const [previewTitle, setPreviewTitle] = useState(null);
  const [previewImages, setPreviewImages] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const handlePreview = async (e) => {
    e.preventDefault();
    try {
      setFetching(true);
      const body = {
        id: linkRef.current.value.split("item/")[1].split(".html")[0],
      };
      const res = await fetch("/api/preview", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const preview = await res.json();
      if (preview.success) {
        setFetching(false);
        setTitle(preview.preview.titleModule.subject);
        setPreviewTitle(preview.preview.titleModule.subject);
        setImages(preview.preview.imageModule.imagePathList);
        setPreviewImages(preview.preview.imageModule.imagePathList);
        setPrice(preview.preview.priceModule.minAmount.value);
        setPreviewPrice(preview.preview.priceModule.minAmount.value);
      }
    } catch (err) {
      setIsError(true);

      console.log(err);
    }
  };
  const handleTitle = () => {
    titleRef.current.value == ""
      ? setTitle(previewTitle)
      : setTitle(titleRef.current.value);
  };
  const handlePrice = () => {
    priceRef.current.value == ""
      ? setPrice(previewPrice)
      : setPrice(priceRef.current.value);
  };
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const linkRef = useRef(null);
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const body = {
        product: {
          title: title,

          images: images,
          categories: checked,
          price: price,
          date: new Date().toLocaleDateString(),
        },
      };
      const res = await fetch("/api/addProduct", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setChecked([]);
        setTitle(null);
        setPreviewTitle(null);
        setImages(null);
        setPreviewImages(null);
        setPrice(null);
        linkRef.current.value = "";
        titleRef.current.value = "";
        priceRef.current.value = "";
        if (process.browser) {
          var checkbox = document.getElementsByTagName("input");
          for (var i = 0; i < checkbox.length; ++i) {
            checkbox[i].checked = false;
          }
        }
      }
    } catch (err) {
      setIsError(true);

      console.log(err);
    }
  };

  const handleImages = (event) => {
    {
      event.target.value.length < 5
        ? ((images[event.target.alt] = previewImages[event.target.alt]),
          setImages(images),
          setTitle(title + "."))
        : ((images[event.target.alt] = event.target.value),
          setImages(images),
          setTitle(title + "."));
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  bg-gray-200 h-screen overflow-hidden">
      <section className=" relative md:flex justify-center items-center hidden h-screen overflow-hidden">
        <img
          src="https://telegra.ph/file/9b093a36207a14f93f94b.jpg"
          className="h-screen object-cover w-full brightness-50 "
        />

        <div className="absolute w-full flex flex-col h-[90vh] overflow-auto">
          <h1 className="m-auto text-center text-2xl lg:text-3xl font font-bold text-white capitalize tracking-widest ">
            <div>
              {title ? (
                title
              ) : fetching ? (
                <Spinner />
              ) : isError ? (
                "Error Occurred"
              ) : (
                "your sins weigh upon your soul"
              )}
            </div>
            {price ? `price: ${price}$` : ""}
          </h1>
          <div className="grid grid-cols-2 gap-y-3">
            <AnimatePresence>
              {images
                ? images.map((image) => (
                    <div className="flex flex-col" key={images.indexOf(image)}>
                      <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5 }}
                        src={image}
                        className="w-[90%] m-auto rounded-md max-h-[500px] object-cover"
                      ></motion.img>
                      <input
                        alt={images.indexOf(image)}
                        type="text"
                        defaultValue={image}
                        className="w-[90%] m-auto mt-2"
                        onChange={handleImages}
                      />
                    </div>
                  ))
                : ""}
            </AnimatePresence>
          </div>

          {checked.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              className="text-yellow-500 text-2xl font-bold mt-2"
            >{`Categories checked : ${checkedItems}`}</motion.div>
          )}
        </div>
      </section>
      <div className="flex justify-center">
        <form action="#" className="m-10">
          <input
            type="text"
            id="link"
            name="link"
            placeholder="Link"
            onChange={handlePreview}
            className=" h-10  text-gray-700 bg-white border-2 border-gray-200 rounded-md shadow-sm block w-full"
            ref={linkRef}
            required
          />

          <input
            type="text"
            id="title"
            name="title"
            placeholder="Custom title (optional)"
            onChange={handleTitle}
            className=" h-10  text-gray-700 bg-white border-2 border-gray-200 rounded-md shadow-sm block w-full"
            ref={titleRef}
          />
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Custom price (optional)"
            onChange={handlePrice}
            className=" h-10  text-gray-700 bg-white border-2 border-gray-200 rounded-md shadow-sm block w-full"
            ref={priceRef}
          />
          <div className=" h-[375px] overflow-auto">
            <div className=" mt-5">Categories:</div>
            <div className="grid grid-cols-2 gap-5 my-5 justify-between ">
              {categories.map((category) => (
                <AnimatePresence>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.5 }}
                    key={categories.indexOf(category)}
                    className=""
                  >
                    <input
                      className="w-5 h-5 mx-1"
                      value={category.name}
                      type="checkbox"
                      onChange={handleCheck}
                    />
                    <span className={isChecked(category.name)}>
                      {category.name}
                    </span>
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={` w-32 h-12
             text-sm font-medium text-white transition bg-blue-600 border border-blue-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none  active:text-blue-500 mt-5  ${
               isLoading && "cursor-not-allowed"
             }`}
            onClick={handleSubmit}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : <h1>Add Product</h1>}
          </motion.button>
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className=" bg-green-500 rounded-md px-11 py-3 text-white ml-2 block md:inline"
              >
                Success
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
export default addProduct;
