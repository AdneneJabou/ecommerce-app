import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getCommandsByUser } from "../services/commandService"; // Import the service

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await getCommandsByUser(user.id);
        setOrders(userOrders);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div>Order ID: {order.id}</div>
            <div>Date: {order.date}</div>
            {/* Add more order details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
