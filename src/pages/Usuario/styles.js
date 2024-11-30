import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  min-height: 100vh;  
  padding: 20px;  
  box-sizing: border-box;  
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  overflow-y: auto;  
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #676767;
`;

export const LabelSignup = styled.label`
  font-size: 16px;
  color: #676767;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;

export const TopLeftButton = styled.div`
  position: absolute;
  top: 35px;
  left: 30px; 
  font-size: 1.8rem;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;
