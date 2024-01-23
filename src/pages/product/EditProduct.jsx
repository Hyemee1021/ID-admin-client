import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import { CustomInpute } from "../../components/custom-inpute/CustomInpute";
import { useDispatch, useSelector } from "react-redux";
import { getAllCats } from "../category/categoryAction";
import { getAProduct, postAProduct, updateAProduct } from "./productAction";
import { Link, useParams } from "react-router-dom";

const initialState = {};
const EditProduct = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const [form, setForm] = useState(initialState);
  const [imgs, setImgs] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);

  const { catList } = useSelector((state) => state.catInfo);
  const { selectedProduct } = useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(getAllCats());
    _id !== form._id && dispatch(getAProduct(_id));

    setForm(selectedProduct);
  }, [dispatch, selectedProduct, _id]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { createdAt, sku, slug, updatedAt, __v, ...rest } = form;

    // combine data and file
    const formDt = new FormData();

    for (let key in rest) {
      formDt.append(key, rest[key]);
    }

    if (imgs.length) {
      [...imgs].forEach((item) => {
        formDt.append("newImages", item);
      });
    }

    imgToDelete.length && formDt.append("imgToDelete", imgToDelete);

    dispatch(updateAProduct(_id, formDt));
  };

  console.log(form);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnImgAttached = (e) => {
    const { files } = e.target;
    setImgs(files);
  };

  const handleOnDeleteImg = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      //add to state
      setImgToDelete([...imgToDelete, value]);
    } else {
      setImgToDelete(imgToDelete.filter((url) => url != value));
    }
    setImgToDelete;
  };

  const inputs = [
    {
      label: "Product Name",
      name: "name",
      required: true,
      placeholder: "Iphone 20Pro",
      value: form.name,
    },
    {
      label: "Slug",
      name: "slug",
      required: true,
      disabled: true,
      value: form.slug,
    },
    {
      label: "SKU",
      name: "sku",
      required: true,
      placeholder: "IP-20PR",
      value: form.sku,
      disabled: true,
    },
    {
      label: "QTY",
      name: "qty",
      required: true,
      type: "number",
      placeholder: "20",
      value: form.qty,
    },
    {
      label: "Price",
      name: "price",
      required: true,
      type: "number",
      placeholder: "2000",
      value: form.price,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      value: form.salesPrice,
      type: "number",
      placeholder: "1000",
    },
    {
      label: "Sales Start Date",
      name: "salesStartDate",
      type: "date",
      value: form?.salesStartDate?.slice(0, 10) || "",
    },
    {
      label: "Sales End Date",
      name: "salesEndDate",
      type: "date",
      value: form?.salesEndDate?.slice(0, 10) || "",
    },
    {
      label: "Description",
      name: "description",
      as: "textarea",
      rows: "7",
      placeholder: "Details of the product",
      required: true,
      value: form.description,
    },
  ];

  return (
    <AdminLayout title="Edit Product">
      <Link to="/product">
        {" "}
        <Button variant="secondary"> &lt; Back </Button>{" "}
      </Link>

      <div className="mt-3">
        Update the form below and submit the form to update the product
      </div>
      {_id}

      <Form onSubmit={handleOnSubmit} className="mt-5 mb-5">
        {/* // make category available to select  */}

        <Form.Group className="mb-3">
          <Form.Label>Select Category</Form.Label>
          <Form.Select
            defaultValue={form.parentCatId}
            name="parentCatId"
            onChange={handleOnChange}
          >
            <option value="">-- select --</option>

            {catList.map((item) => (
              <option
                selected={item._id === form.parentCatId}
                key={item._id}
                value={item._id}
              >
                {item.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {inputs.map((item, i) => (
          <CustomInpute key={i} {...item} onChange={handleOnChange} />
        ))}

        {/* show the existing image  */}

        <div className="d-flex gap-3 m-4">
          {form?.images?.map((url) => (
            <div key={url}>
              <div>
                <input
                  type="radio"
                  name="thumbnail"
                  id={url}
                  checked={url === form.thumbnail}
                  onChange={handleOnChange}
                  value={url}
                />{" "}
                <label htmlFor={url}>Make Thumbnail</label>
              </div>
              <img
                className="img-thumbnail"
                width={"150px"}
                src={import.meta.env.VITE_SERVER_ROOT + url}
              />
              <div>
                <input
                  type="checkbox"
                  id={url + 1}
                  onChange={handleOnDeleteImg}
                  value={url}
                />{" "}
                <label htmlFor={url + 1}>Delete </label>
              </div>
            </div>
          ))}
        </div>

        {/* // handling the attachement  */}

        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            name="img"
            multiple
            onChange={handleOnImgAttached}
          />
        </Form.Group>

        <div className="d-grid">
          <Button type="submit">Update Product</Button>
        </div>
      </Form>
    </AdminLayout>
  );
};

export default EditProduct;
