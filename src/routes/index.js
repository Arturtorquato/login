import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Usuario from "../pages/Usuario";
import Professor from "../pages/Professor";
import Estudante from "../pages/Estudante";
import Profissional from "../pages/Profissional";
import Evento from "../pages/Eventos";
import Compromisso from "../pages/Compromissos";
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
            <Route exact path="/usuario" element={<Private Item={Usuario} />} />
            <Route exact path="/professor" element={<Private Item={Professor} />} />
            <Route exact path="/estudante" element={<Private Item={Estudante} />} />
            <Route exact path="/profissional" element={<Private Item={Profissional} />} />
            <Route exact path="/evento" element={<Private Item={Evento} />} />
            <Route exact path="/compromisso" element={<Private Item={Compromisso} />} />
            <Route path="/" element={<Signin />}/> 
            <Route path="*" element={<Signin />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    );
  };

  export default RoutesApp;