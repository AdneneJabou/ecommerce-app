import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import "../styles/NavBar.css"; // Ensure this path is correct

const Navbar = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <nav className="navbar-container">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="branding">
              E-Commerce
            </Link>
          </div>

          <div className="navbar-items">
            {isAuthenticated ? (
              <>
                <span className="text-gray-600">Welcome, {user.firstName}</span>
                <Link to="/cart" className="cart-icon">
                  🛒
                  {cartItems.length > 0 && (
                    <span className="cart-badge">{cartItems.length}</span>
                  )}
                </Link>
                <button onClick={handleSignOut} className="sign-out-btn">
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-x-4">
                <Link to="/signin" className="navbar-items">
                  Sign In
                </Link>
                <Link to="/signup" className="navbar-items">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
