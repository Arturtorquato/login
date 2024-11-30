import React, { useContext } from 'react'; // Certifique-se de incluir useContext
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { Container, Content } from './styles';
import SidebarItem from '../SidebarItem';
import { AuthContext } from '../../contexts/auth'; // Caminho corrigido

const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  
  const closeSidebar = () => {
    active(false);
  };
  
  const { signout } = useContext(AuthContext);

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar(); // Fechar a sidebar após a navegação
  };

  const handleSignout = () => {
    signout(); // Executa o logout
    handleNavigation('/'); // Redireciona para a página inicial
  };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
      <SidebarItem Text="Home" onClick={() => handleNavigation('/home')} />
        <SidebarItem Text="Usuario" onClick={() => handleNavigation('/usuario')} />
        <SidebarItem Text="Professores" onClick={() => handleNavigation('/professor')} />
        <SidebarItem Text="Estudantes" onClick={() => handleNavigation('/estudante')} />
        <SidebarItem Text="Profissionais" onClick={() => handleNavigation('/profissional')} />
        <SidebarItem Text="Eventos" onClick={() => handleNavigation('/evento')} />
        <SidebarItem Text="Compromisso" onClick={() => handleNavigation('/compromisso')} />
        <SidebarItem Text="Sair" onClick={handleSignout} />
      </Content>
    </Container>
  );
};

export default Sidebar;
