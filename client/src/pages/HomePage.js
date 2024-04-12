import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../components/context/auth";
import axios from "axios";
import { message } from "antd";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/product/`);
      if (data.status) {
        setProducts(data.product);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Error While fetch product");
    }
  };
  const handleFilter = async (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    } catch (error) {
      console.log(error);
      message.error("Error While filter product");
    }
  };
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/category/`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getProducts();
    }
    getAllCategory();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked.length, radio.length]);

  //get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/product/filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter by Category </h4>
          <div className="d-flex flex-column">
            {Categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/*Price Filter*/}
          <h4 className="text-center mt-4">Filter by Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p?._id}>
                  <Radio value={p?.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">
          {JSON.stringify(radio, null, 4)}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((product, index) => (
              <Card sx={{ maxWidth: 340 }} className="mr-3 mt-3 mb-3">
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={`${process.env.REACT_APP_API}/product/image/${product._id}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description.substring(0, 50)}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    {product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">More Details</Button>
                  <Button size="small">Add Cart</Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
