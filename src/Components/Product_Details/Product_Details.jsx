import "./Product_Details.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Box, TextField } from '@mui/material';
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";


const Product_Details = () => {
  const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterCategory, setFilterCategory] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [cart, setCart] = useState([]);

    const fetchProducts = async () => {
        try {
          setLoading(true);

            let response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
            setFilteredProducts(response.data); // Set initially loaded products
        } catch (err) {
            console.log("Error while fetching the API ", err);
            setLoading(false);

          }
          setLoading(false)
    };

    // Fetch products once when component is mounted
    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter and sort products based on user input
    useEffect(() => {
        let filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filterCategory) {
            filtered = filtered.filter((product) => product.category === filterCategory);
        }

        // Price filter
        if (priceFilter === "under-50") {
            filtered = filtered.filter((product) => product.price < 50);
        } else if (priceFilter === "50-100") {
            filtered = filtered.filter((product) => product.price >= 50 && product.price <= 100);
        } else if (priceFilter === "100-500") {
            filtered = filtered.filter((product) => product.price > 100 && product.price <= 500);
        } else if (priceFilter === "above-500") {
            filtered = filtered.filter((product) => product.price > 500);
        }

        // Sort products
        if (sortOption === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'name-asc') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === 'name-desc') {
            filtered.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredProducts(filtered); // Update filtered products
    }, [products, searchQuery, sortOption, filterCategory, priceFilter]);

    // Add product to cart
    const addToCart = (product) => {
      const existingProduct = cart.find((item) => item.id === product.id);
      let updatedCart;
  
      if (existingProduct) {
          // If the product already exists, update its quantity
          updatedCart = cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
      } else {
          // Otherwise, add the new product to the cart
          updatedCart = [...cart, { ...product, quantity: 1 }];
      }
  
      // Update the cart state and save the updated cart to localStorage
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  
      toast.info(`Added ${product.title} to the cart`);
  };
  

    // Get the total number of products in the cart
    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    useEffect(() => {
        // Load cart from localStorage on component mount
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    return (
<>
{loading ? (<Loader/>): (


        <div className="Product_Details">
       
      
            <Box sx={{ flexGrow: 1 }}>
                <Navbar name="E-commerce site" cartItemCount={getCartItemCount()} />
                <div style={{ padding: '16px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 2,
                        }}
                    >
                        {/* Left-aligned Sort and Filter */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                            }}
                        >
                            {/* Sort Dropdown */}
                            <select className="dropdown" onChange={(e) => setSortOption(e.target.value)}>
                                <option value="">Sort by</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name-asc">Name: A-Z</option>
                                <option value="name-desc">Name: Z-A</option>
                            </select>

                            {/* Filter by category */}
                            <select className="dropdown" onChange={(e) => setFilterCategory(e.target.value)}>
                                <option value="">All Categories</option>
                                <option value="men's clothing">Men's Clothing</option>
                                <option value="women's clothing">Women's Clothing</option>
                                <option value="electronics">Electronics</option>
                                <option value="jewelery">Jewelery</option>
                            </select>

                            {/* Filter by price */}
                            <select className="dropdown" onChange={(e) => setPriceFilter(e.target.value)}>
                                <option value="">All Prices</option>
                                <option value="under-50">Under $50</option>
                                <option value="50-100">$50 - $100</option>
                                <option value="100-500">$100 - $500</option>
                                <option value="above-500">Above $500</option>
                            </select>
                        </Box>

                        {/* Right-aligned Search Input */}
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                                marginLeft: 'auto',
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label="Search for products"
                                variant="outlined"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </Box>
                    </Box>
                </div>
            </Box>

            <div className="product-list">
            {filteredProducts.map(product => (
             
                <div className="product-card">
                <Link to={`/SingleProduct/${product.id}`} key={product.id}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <h2 className="product-title">{product.title}</h2>
                  <p className="product-price">${product.price}</p>
                  <p className="product-description">
                    {product.description.length > 100
                      ? product.description.substring(0, 100) + "..."
                      : product.description}
                  </p> </Link>
                  <button className="add-to-cart" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
             
            ))}
          </div>
       
        </div>
      )}
        </>
    );
};

export default Product_Details;
