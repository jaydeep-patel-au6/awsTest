import React from "react";
import data from "../../data.json";
import Products from "./Products";
import Filter from "./Filter";
import Cart from "./Cart";
import { BrowserRouter, Switch, Route, Link,useHistory } from "react-router-dom";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
  }

  createOrder = (order, cartItems) => {
    // alert("Order Conforms for " + order.name + order.email );
    alert(`Your order is conform \n 
    Name :-  ${order.name} \n
    Address :- ${order.address} \n
    Email :- ${order.email} \n
 
    
    
    
    `)
    window.location.reload(false);
    localStorage.removeItem('cartItems')
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  

  render() {
    return (
      <div className="grid-container">
       
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        
      </div>
    );
  }
}
export default Home