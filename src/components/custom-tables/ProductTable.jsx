import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../pages/product/productAction";
import { Link } from "react-router-dom";

export const ProductTable = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="">{productList.length} Products found!</div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Status</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Sales Price</th>
            {/* <th>Sales Starts</th>
          <th>Sales Ends</th> */}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {productList.map(
            (
              { _id, name, status, slug, qty, price, salesPrice, thumbnail },
              i
            ) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    width="100px"
                    src={import.meta.env.VITE_SERVER_ROOT + thumbnail}
                  />
                </td>
                <td
                  className={
                    status === "active" ? "text-success" : "text-danger"
                  }
                >
                  {status}
                </td>
                <td>
                  Name: {name} <br /> Slug: {slug}
                </td>
                <td>{qty}</td>
                <td>{price}</td>
                <td>{salesPrice}</td>
                <td>
                  <Link to={`/product/edit/${_id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};
