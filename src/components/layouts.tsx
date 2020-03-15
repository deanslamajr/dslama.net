import styled, {
  css,
  createGlobalStyle,
  CSSObject,
  SimpleInterpolation,
} from 'styled-components';

export const breakpoints = {
  tabletMax: (
    cssRules: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (max-width: 899px) {
      ${css(cssRules, ...interpolations)}
    }
  `,
  phoneMax: (
    cssRules: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (max-width: 599px) {
      ${css(cssRules, ...interpolations)}
    }
  `,
};

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
    }

    pre {
      white-space: pre-wrap;       /* css-3 */
      white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
      white-space: -pre-wrap;      /* Opera 4-6 */
      white-space: -o-pre-wrap;    /* Opera 7 */
      word-wrap: break-word;       /* Internet Explorer 5.5+ */
    }
`;

export const OuterContainer = styled.div`
  padding: 0 1.5%;
  background-color: ${props => props.theme.colors.background};
  position: absolute;
  min-height: 100%;
  left: 12%;
  right: 12%;

  ${breakpoints.tabletMax`
    padding: 0;
    left: 0;
    right: 0;
  `}
`;
