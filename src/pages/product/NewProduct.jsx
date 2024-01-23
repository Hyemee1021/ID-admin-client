import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import { CustomInpute } from "../../components/custom-inpute/CustomInpute";
import { useDispatch, useSelector } from "react-redux";
import { getAllCats } from "../category/categoryAction";
import { postAProduct } from "./productAction";
import { Link } from "react-router-dom";

const initialState = {};
const NewProduct = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [imgs, setImgs] = useState([]);

  const { catList } = useSelector((state) => state.catInfo);

  useEffect(() => {
    dispatch(getAllCats());
  }, [dispatch]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // combine data and file
    const formDt = new FormData();

    for (let key in form) {
      formDt.append(key, form[key]);
    }

    if (imgs.length) {
      console.log("add the images", imgs);
      [...imgs].forEach((item) => {
        formDt.append("images", item);
      });
    }

    dispatch(postAProduct(formDt));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnImgAttached = (e) => {
    const { files } = e.target;
    setImgs(files);
  };

  const inputs = [
    {
      label: "Product Name",
      name: "name",
      required: true,
      placeholder: "Iphone 20Pro",
      //   value = form.name
    },
    {
      label: "SKU",
      name: "sku",
      required: true,
      placeholder: "IP-20PR",
    },
    {
      label: "QTY",
      name: "qty",
      required: true,
      type: "number",
      placeholder: "20",
    },
    {
      label: "Price",
      name: "price",
      required: true,
      type: "number",
      placeholder: "2000",
    },
    {
      label: "Sales Price",
      name: "salesPrice",

      type: "number",
      placeholder: "1000",
    },
    {
      label: "Sales Start Date",
      name: "salesStartDate",
      type: "date",
    },
    {
      label: "Sales End Date",
      name: "salesEndDate",
      type: "date",
    },
    {
      label: "Description",
      name: "description",
      as: "textarea",
      rows: "7",
      placeholder: "Details of the product",
      required: true,
    },
  ];
  console.log(imgs);
  return (
    <AdminLayout title="Product">
      <Link to="/product">
        {" "}
        <Button variant="secondary"> &lt; Back </Button>{" "}
      </Link>

      <div className="mt-3">Fill up the form below to add new product</div>

      <Form
        onSubmit={handleOnSubmit}
        className="mt-5 mb-5"
        // action=""
        // method=""
        // encType=""
      >
        {/* // make category available to select  */}

        <Form.Group className="mb-3">
          <Form.Label>Select Category</Form.Label>
          <Form.Select name="parentCatId" onChange={handleOnChange}>
            <option value="">-- select --</option>

            {catList.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {inputs.map((item, i) => (
          <CustomInpute key={i} {...item} onChange={handleOnChange} />
        ))}
        {/* // handling the attachement  */}

        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            name="img"
            required={true}
            multiple
            onChange={handleOnImgAttached}
          />
        </Form.Group>

        <div className="d-grid">
          <Button type="submit">Add Product</Button>
        </div>
      </Form>
    </AdminLayout>
  );
};

export default NewProduct;
