import React, { useRef } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { CategoryTable } from "../../components/custom-tables/CategoryTable";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { postNewCat } from "./categoryAction";

const Category = () => {
  const titleRef = useRef("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure?")) {
      const title = titleRef.current.value;
      if (!title) {
        return toast.error("Missing title");
      }

      //call api
      dispatch(postNewCat({ title }));
    }
  };

  return (
    <AdminLayout title="Category">
      <div>
        <h4>Add new category</h4>
        <Form onSubmit={handleOnSubmit}>
          <Row className="m-4 g-2">
            <Col md={8}>
              <Form.Control
                ref={titleRef}
                required={true}
                placeholder="add New category title here"
              />
            </Col>
            <Col md={4} className="d-grid">
              <Button type="submit">Add New Category</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <hr />
      <div>
        <CategoryTable />
      </div>
    </AdminLayout>
  );
};

export default Category;
