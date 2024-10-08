import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Product_Details from './Components/Product_Details/Product_Details';
import Cart from './Components/Cart/Cart';
import Error from './Components/Error/Error';
import Single_Product from './Components/Single_Product/Single_Product';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <ToastContainer />
    <Routes>
    <Route path="/" element={<Product_Details/>} />
    <Route path="/Single_Product/:id" element={<Single_Product/>} />
    <Route path="/Cart" element={<Cart/>} />
    <Route path="/*" element={<Error/>} />

    
    </Routes>

    </BrowserRouter>  
    </div>
  );
}

export default App;
