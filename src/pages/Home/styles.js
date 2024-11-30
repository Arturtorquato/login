import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  text-align: center;

  p {
    font-size: 1.5rem; /* Aumenta o texto do parágrafo */
    line-height: 1.8; /* Melhora o espaçamento entre linhas */
  }
`;

export const Title = styled.h2`
  font-size: 3rem; /* Aumenta o tamanho do título */
  font-weight: bold;
`;
