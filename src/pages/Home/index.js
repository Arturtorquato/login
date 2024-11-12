import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import Header from "../../components/Header/indes";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
   <Header />
  );
};

export default Home;