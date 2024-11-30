import React from 'react';
import { Container } from './styles';

const SidebarItem = ({ Text, onClick }) => {
  return (
    <Container onClick={onClick}> 
      {Text}
    </Container>
  );
};

export default SidebarItem;
