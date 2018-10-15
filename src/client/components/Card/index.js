import styled from 'styled-components'

import { media, card, cardLink, shadow } from '../../style/style-utils'

const OuterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;

  ${media.tabletMax`
    margin: 3rem .75rem;
  `}
`

const CardLink = styled.a`
  ${cardLink()}
`

const ShadowCard = styled.div`
  ${card()}
  ${shadow()}
`

const Title = styled.div`
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1.75rem;

  ${media.phoneMax`
    font-size: 1.5rem;
  `}
`

const Details = styled.div`
  color: #b21a27;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 1rem 0;

  ${media.phoneMax`
    margin: .75rem 0;
  `}
`

const Quote = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;

  ${media.phoneMax`
    text-align: justify;
  `}
`

export {
    CardLink,
    ShadowCard,
    Title,
    Details,
    Quote,
    OuterContainer
}