import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/auth";
import { useCart } from "../components/context/cart";
import Layout from "../components/layout/Layout";
import React from "react";
import { Button } from "antd";

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
        let total = 0;
        cart.map((p) => {
            total += p.price;
        });
        return total.toLocaleString("en-US", {
            style:"currency",
            currency:"USD"
        });
    } catch (error) {
        console.log(error)
    }
  }
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item?.id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart',JSON.stringify(myCart))
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2 mt-2">
                {`Hello ${auth?.token && auth?.user?.name}, Your Cart Items`}
              </h1>
              <h4 className="text-center">
                {cart?.length > 0
                  ? `Total ${cart?.length} products in cart`
                  : "No products in cart"}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {cart?.map((p, index) => (
                <div className="row p-3 mb-2 card flex-row">
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_API}/product/image/${p._id}`}
                      alt="product_photo"
                      width="100px"
                      height="100px"
                      className="img img-responsive"
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{p?.title}</p>
                    <p>{p?.description?.substring(0,50)}</p>
                    <p>Price: {p?.price}</p>
                    <Button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p?._id)}
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
                <h4>Cart Summary</h4>
                <p>Total | Checkout | Payment</p>
                <hr/>
                <h4>Total: {totalPrice()} </h4>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CartPage;
