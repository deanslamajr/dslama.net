import React from 'react';

import { Container } from './Header.styles';

type HeaderProps = {
  summary: string;
};

export const Header: React.FC<HeaderProps> = ({ summary }) => (
  <Container>{summary}</Container>
);
