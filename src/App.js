import "./styles.css";
import { useState } from "react";
const plantsData = require("./data.js");
export default function App() {
  const [navItem, setNavItem] = useState("store");
  const [cart, updateCart] = useState({});
  const [wishlist, updateWishlist] = useState([1, 2, 3]);
  let cartItems;
  cartItems = Object.keys(cart);
  cartItems = cartItems.map((i) => Number(i));
  console.log(navItem);

  function Navbar() {
    return (
      <div className="Navbar">
        <div style={{ textAlign: "left", padding: "0rem 1rem" }}>
          <h2 style={{ fontFamily: "Montserrat" }}>Botanic Heaven</h2>
          <p style={{ fontFamily: "Lora", fontSize: "0.8rem" }}>
            A step towards better tomorrow.
          </p>
        </div>
        <div
          className="container"
          style={{ justifyContent: "space-around", width: "350px" }}
        >
          <button className="btn btn-nav" onClick={() => setNavItem("store")}>
            Store
          </button>
          <button
            className="btn btn-nav"
            onClick={() => setNavItem("wishlist")}
          >
            Wishlist
          </button>
          <button className="btn btn-nav" onClick={() => setNavItem("cart")}>
            Cart
          </button>
        </div>
      </div>
    );
  }
  function Product({ plantItem }) {
    function ProductName({ name }) {
      return (
        <p
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}
        >
          {name} Plant
        </p>
      );
    }
    function ProductPrice({ price, dprice }) {
      return (
        <p
          style={{
            fontFamily: "Lora",
            color: "#4CAF50",
            fontStyle: "none",
            fontWeight: "bold"
          }}
        >
          Rs. {dprice} Only
          <span
            className="product-price-o"
            style={{
              textDecoration: "line-through",
              color: "#757575",
              marginLeft: "1rem",
              fontSize: "0.7rem"
            }}
          >
            Rs. {price}
          </span>
        </p>
      );
    }
    function WishlistBtn({ pid, wlist }) {
      if (wlist.includes(pid)) {
        return <span>❤️</span>;
      } else {
        return <span>🤍</span>;
      }
    }
    function wishlistToggle(pid) {
      console.log(pid);
      if (wishlist.includes(pid)) {
        console.log(pid, "present");
        let tlist = wishlist.filter((item) => {
          return item !== pid;
        });
        updateWishlist(tlist);
      } else {
        updateWishlist([...wishlist, pid]);
      }
    }

    function addToCart(item) {
      let obj = {};
      let pid = item.id;

      if (cartItems.includes(pid)) {
        obj[pid] = cart[pid] + 1;
        updateCart({ ...cart, ...obj });
      } else {
        obj[pid] = 1;
        updateCart({ ...cart, ...obj });
      }
      //updateCart([...cart, item]);
      // let q = 0;
      // for (let i = 0; i < cart.length; ++i) {
      //   if (cart[i].id === item.id) {
      //     let qtemp = cart[i].cartQuantity;
      //     //wishlist[i].quantity = qtemp + 1;
      //     let tlist = cart.filter((itm) => {
      //       return itm.id !== item.id;
      //     });
      //     updateCart([...tlist, { ...item, cartQuantity: qtemp + 1 }]);
      //     q = 1;
      //   }
      // }
      // if (q === 0) {
      //   updateCart([...cart, { ...item, cartQuantity: 1 }]);
      // }
    }
    // {plantItem.quantity
    //   ? isNan(plantItem.quantity - cart[plantItem.id])
    //   : plantItem.quantity - cart[plantItem.id]}
    let dquant = plantItem.quantity;
    let addBtn = false;
    if (cartItems.includes(plantItem.id)) {
      dquant = dquant - cart[plantItem.id];
    }
    if (dquant <= 0) {
      addBtn = true;
    }
    function ProductInfo() {
      if (navItem == "cart") {
        return (
          <div
            style={{
              display: "flex",
              height: "2rem",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <button
              className="btn"
              style={{ padding: "0.1rem", width: "3rem", height: "2rem" }}
            >
              +
            </button>
            <p style={{ marginTop: "0.5rem" }}>{cart[plantItem.id]}</p>
            <button
              className="btn"
              style={{ padding: "0.1rem", width: "3rem", height: "2rem" }}
            >
              -
            </button>
          </div>
        );
      } else {
        return (
          <p style={{ fontSize: "0.8rem", color: "#757575" }}>
            Only <b style={{ color: "black" }}>{dquant}</b> items left Hurry
            up...
          </p>
        );
      }
    }
    return (
      <div className="product-card" key={plantItem.id}>
        <img src={plantItem.img} height="200px" alt={plantItem.name} />
        <div style={{ textAlign: "left", padding: "1rem" }}>
          <ProductName name={plantItem.name} />
          <ProductPrice price={plantItem.price} dprice={plantItem.dprice} />
          <ProductInfo />
          <div>
            <button
              onClick={() => {
                addToCart(plantItem);
              }}
              disabled={addBtn}
              className="btn"
            >
              Add to Cart
            </button>
            <button
              className="btn"
              onClick={() => wishlistToggle(plantItem.id)}
              style={{ backgroundColor: "inherit" }}
            >
              <WishlistBtn pid={plantItem.id} wlist={wishlist} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function Store() {
    return (
      <div className="Store container">
        {plantsData.map((plantItem) => {
          return <Product plantItem={plantItem} key={plantItem.id} />;
        })}
      </div>
    );
  }
  function Wishlist() {
    return (
      <div className="Wishlist container">
        {plantsData.map((plantItem) => {
          if (wishlist.includes(plantItem.id)) {
            return <Product plantItem={plantItem} key={plantItem.id} />;
          }
        })}
      </div>
    );
  }
  function Cart() {
    return (
      <div className="Cart container">
        {plantsData.map((plantItem) => {
          if (cartItems.includes(plantItem.id)) {
            return <Product plantItem={plantItem} key={plantItem.id} />;
          }
        })}
      </div>
    );
  }
  function DisplayProducts() {
    if (navItem === "store") return <Store />;
    else if (navItem === "wishlist") return <Wishlist />;
    else return <Cart />;
  }

  return (
    <div className="App">
      <Navbar />
      <DisplayProducts />
    </div>
  );
}
