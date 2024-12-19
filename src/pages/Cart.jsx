import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { createCommand } from "../services/commandService";
import "../styles/Cart.css";
const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  const handleCheckout = async () => {
    try {
      // Check if the user is authenticated (user exists and user.id is defined)
      if (!user || !user.id) {
        alert("You must be logged in to place an order.");
        return;
      }
  
      // Proceed to create the orders for each item in the cart
      const promises = cartItems.map((item) => {
        // Check if item.id exists
        if (!item.id) {
          console.error("Item ID is missing for:", item);
          alert("There was an issue with your cart items. Please try again.");
          return;
        }
  
        // Proceed to create the command object
        const command = {
          idClient: user.id.toString(),   // User's ID must be valid
          idProduct: item.id.toString(),  // Item's ID must be valid
          date: new Date().toISOString().split("T")[0],
        };
  
        return createCommand(command);  // Call the service to create the command
      });
  
      // Wait for all promises (commands) to resolve
      await Promise.all(promises);
  
      // Clear the cart and show a success message
      clearCart();
      alert("Order placed successfully!");
      navigate("/");
  
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
      </div>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="flex items-center">
              <img
                src={item.picture || "/api/placeholder/100/100"}
                alt={item.name}
              />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="total-section">
        <div className="total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button onClick={handleCheckout} className="checkout-btn">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
