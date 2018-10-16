import styled, { css } from 'styled-components'

export const media = {
  tabletMax: (...args) => css`
    @media (max-width: 899px) {
      ${ css(...args) }
    }
  `,
  phoneMax: (...args) => css`
    @media (max-width: 599px) {
      ${ css(...args) }
    }
  `
}

export function card () {
  return css`
    background-color: white;
    padding: 1.25rem;
    border-radius: 2px;
    font-size: 1.3rem;
    margin: auto 1.5rem;
    
    ${media.phoneMax`
      padding: .5rem;
      margin: 0;
      font-size: 1.2rem;
    `}
  `
}

export function shadow () {
  return css`
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16);
  `
}