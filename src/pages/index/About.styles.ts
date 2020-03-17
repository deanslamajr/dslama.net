import styled from 'styled-components';

import { breakpoints, shadow, card } from '../../components/layouts';

export const Container = styled.div`
  font-family: ${props => props.theme.fonts};
`;

export const LogoContainer = styled.div`
  ${shadow()}
  height: 15rem;
  margin: 0 1.5rem;

  ${breakpoints.tabletMax`
    height: 14rem;
  `}
  ${breakpoints.phoneMax`
    margin: 0 .75rem;
  `}
`;

export interface BackgroundImageProps {
  imageUrl: string;
}

export const BackgroundImage = styled.div<BackgroundImageProps>`
  background-image: url("${props => props.imageUrl}"),
    url("${props => props.imageUrl}");
  background-repeat: no-repeat,no-repeat;
  background-color: #e7eeed;
  background-blend-mode: color-burn, color-burn;
  height: 100%;
  width: 100%;
  background-position-x: 24rem, -3rem;
  background-position-y: -20rem, -5rem;
  background-size: 70rem, 30rem;
  ${breakpoints.tabletMax`
    background-position-x: 16rem, -3rem;
    background-position-y: -11rem, 0rem;
    background-size: 45rem, 22rem;
  `}
  ${breakpoints.phoneMax`
    background-blend-mode: color-burn, lighten;
    background-position-x: 0rem;
    background-position-y: 50%;
    background-size: 125%;
  `}
`;

export const LinksContainer = styled.div`
  font-size: 1.25rem;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${breakpoints.tabletMax`
    margin-top: 2rem;
  `}
  ${breakpoints.phoneMax`
    justify-content: space-around;
  `}
`;

export const LinkItem = styled.li`
  display: inline;
  margin: 2rem;
  ${breakpoints.tabletMax`
    margin: 0 1.5rem;
  `}
  ${breakpoints.phoneMax`
    margin: .5rem;
  `}
`;

export const LinkAnchor = styled.a`
  color: black;
  :link {
    color: black;
  }
  :visited {
    color: black;
  }
`;

export const BioCard = styled.div`
  ${shadow()}
  ${card()}
  font-family: ${props => props.theme.fonts};
  text-align: justify;
  font-size: 1.15rem;
  ${breakpoints.tabletMax`
    margin: 2rem 1.5rem;
  `}
  ${breakpoints.phoneMax`
    margin: 2rem .75rem;
  `}
`;
