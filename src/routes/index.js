import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import useAuth from "../hooks/useAuth"

const Private = ({ Item }) => {
    const { signed } = useAuth(); //substitua o true po useAuth() para ligar o login
  
    return signed > 0 ? <Item /> : <Signin />;  
  };

  // Signin

const RoutesApp = () => {
    return (
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route exact path="/home" element={<Private Item={Home} />} />
            <Route path="/" element={<Signin />}/> 
            <Route path="*" element={<Signin />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    );
  };

  export default RoutesApp;