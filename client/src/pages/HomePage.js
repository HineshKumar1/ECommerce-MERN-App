import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../components/context/auth'
import axios from 'axios';
import { message } from "antd";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Checkbox} from "antd"

function HomePage() {
  const [auth,setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [Categories, setCategories] = useState([]);

  const getProducts = async()=>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/product/`);
      if (data.status) {
        setProducts(data.product);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Error While fetch product");
    }
  }
     //get all category
     const getAllCategory = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/category/`
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
    getProducts();
    getAllCategory();
  }, [products])
  
  return (
    <Layout>
      <div className='row mt-3'>
        <div className='col-md-2'>
        <h4 className='text-center'>Filter by Category </h4>
        <div className='d-flex flex-column'>
        {Categories.map(c=>(
          <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked)}>
            {c.name}
          </Checkbox>
        ))}
        </div>
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
          {products.map((product, index) => (
               <Card sx={{ maxWidth: 340}} className='mr-3 mt-3 mb-3'>
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
                   {product.description}
                 </Typography>
                 <Typography variant="h5" className='mt-2'>
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
  )
}

export default HomePage