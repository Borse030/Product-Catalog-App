import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './Cart.css'; // Make sure to import your CSS file
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch the cart from localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    // Function to handle quantity update
    const updateQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map((item) => {
            if (item.id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update cart in localStorage
    };

    // Function to remove a product from the cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.info("Product removed successfully") // Update cart in localStorage
    };

    // Function to calculate total price of the cart
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };



    const handleBackClick = () => {
      navigate("/"); // Navigate back to the home/product details page
  };

    return (
        <>
            <Navbar name={cart.length > 0 ? "Your Shopping Cart" : "Cart"} showCartIcon={false} />
            <div className="cart-page">

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Your cart is empty</h2>
                    </div>
                ) : (
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.title}</h3>
                                    <p>Price: ${item.price}</p>
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            +
                                        </button>
                                    </div>
                                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-button">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="cart-total">
                        <h3>Cart Total: ${calculateTotalPrice()}</h3>
                    </div>
                )}
                <button className="back-button" onClick={handleBackClick}>Go Back to Products</button>

            </div>
        </>
    );
};

export default Cart;
