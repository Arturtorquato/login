import styled from 'styled-components';

export const Container = styled.div`
  background-color: #171923;
  position: fixed;
  height: 100%;
  top: 0;
  left: ${props => (props.sidebar ? '0' : '-100%')}; 
  width: 300px;
  transition: left 0.4s ease; 
  z-index: 999; 

  > svg {
    position: absolute;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  margin-top: 80px; 
  display: flex;
  flex-direction: column; 
  padding: 0 10px; 
`;
