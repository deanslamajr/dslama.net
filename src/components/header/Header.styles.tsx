import styled from 'styled-components';

export const Container = styled.h1`
  margin: 3rem 2rem 2rem;
  font-size: 1.1rem;
  font-weight: normal;
  font-family: ${props => props.theme.global?.font?.family};
  text-align: center;
`;
