import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useCart } from "../contexts/CartContext";
import "../styles/Products.css"; // Import the CSS styles


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get("/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="products-container">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Product Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.picture || "/api/placeholder/300/200"}
              alt={product.name}
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                disabled={isInCart(product.id)}
                className="add-to-cart-btn"
              >
                {isInCart(product.id) ? "In Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
