import React from 'react';
import styled from 'styled-components';

type HeaderProps = {
  summary: string;
};

const Container = styled.div`
  margin: 3rem 2rem 2rem;
  font-size: 1.1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  text-align: center;
`;

export const Header: React.FC<HeaderProps> = ({ summary }) => (
  <Container>{summary}</Container>
);
