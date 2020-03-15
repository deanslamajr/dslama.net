import styled from 'styled-components';

// ${ media.tabletMax`
//     padding: 0;
//     left: 0;
//     right: 0;
//   ` }

export const OuterContainer = styled.div`
  padding: 0 1.5%;
  background-color: ${props => props.theme.colors.primary};
  position: absolute;
  min-height: 100%;
  left: 12%;
  right: 12%;
`;
