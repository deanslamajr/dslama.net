import styled from 'styled-components';

export const ProjectLink = styled.a`
  text-decoration: none;
  padding-right: 0.5rem;
  color: inherit;
`;

export const SourceLink = styled.a`
  text-decoration: none;
  font-size: 1rem;
  padding-left: 0.5rem;
  color: ${props => props.theme.colors.red};
`;

export const Description = styled.div`
  font-family: ${props => props.theme.fonts};
  font-size: 1.1rem;
  margin: 1rem 0;
`;
