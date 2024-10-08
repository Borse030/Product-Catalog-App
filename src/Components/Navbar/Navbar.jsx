import React from 'react';
import "./Navbar.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Import useLocation

const Navbar = ({ name }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Determine if the current path is the Cart page
  const isCartPage = location.pathname === '/cart';
  // Function to get the total quantity of items in the cart from localStorage
  const getCartQuantity = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const totalQuantity = getCartQuantity();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          {name}
        </Typography>

        {/* Cart Icon with Badge */}


        {!isCartPage && (
        <IconButton color="inherit" onClick={() => navigate('/cart')}>
          <Badge badgeContent={totalQuantity} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
