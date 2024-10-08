import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Single_Product.css";
import Navbar from '../Navbar/Navbar';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import Loader from '../Loader/Loader';


const Single_Product = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate(); 
    // Fetch product details from the API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                let response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.log("Error fetching product details", err);
            }
        };
        fetchProduct();
    }, [id]);

    // Function to increase quantity
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Function to decrease quantity
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

useEffect(() => {
  getCartCount()
}, [])


 const getCartCount = () => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  setCart(storedCart);
 }

    const getCartItemCount = () => {
      return cart.reduce((count, item) => count + item.quantity, 0);
  };
    // Function to add product to cart and save to localStorage
    const addToCart = () => {
        const newCartItem = { ...product, quantity };

        // Get existing cart from localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const existingProduct = existingCart.find(item => item.id === product.id);
        let updatedCart;

        if (existingProduct) {
            // Update quantity if the product already exists
            updatedCart = existingCart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            // Add the new product to the cart
            updatedCart = [...existingCart, newCartItem];
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        getCartCount()
        toast.info(`Added ${quantity} of ${product.title} to the cart`);
    };

    if (!product) return  <Loader/>; // Show loading state if product is not fetched yet

    return (
        <>
            <Navbar name="Product Details" cartItemCount={getCartItemCount()}/>
            <div className="product-detail-container">
                {/* Product Image Section */}
                <div className="product-image-section">
                    <img src={product.image} alt={product.title} className="product-detail-image" />
                </div>

                {/* Product Details Section */}
                <div className="product-details-section">
                    <h2>{product.title}</h2>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-description">{product.description}</p>
                    <p className="product-category">Category: {product.category}</p>

                    {/* Quantity Selection */}
                    <div className="quantity-selection">
                        <button onClick={decreaseQuantity} className="quantity-button">-</button>
                        <span className="quantity-number">{quantity}</span>
                        <button onClick={increaseQuantity} className="quantity-button">+</button>
                    </div>

                    {/* Add to Cart button */}
                    <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
                
                    <button className="back-button" onClick={() => navigate('/')}>
                    Back to Products
                </button>
                    </div>
            </div>
        </>
    );
};

export default Single_Product;
