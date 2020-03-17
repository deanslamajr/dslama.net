import styled, {
  css,
  createGlobalStyle,
  CSSObject,
  DefaultTheme,
  Interpolation,
  InterpolationFunction,
  SimpleInterpolation,
  ThemeProps,
  ThemedStyledProps,
  FlattenInterpolation,
} from 'styled-components';

const tabletMax = <T extends {}>(
  cssRules:
    | CSSObject
    | TemplateStringsArray
    | InterpolationFunction<ThemedStyledProps<T, {}>>,
  ...interpolations:
    | SimpleInterpolation[]
    | Array<Interpolation<ThemedStyledProps<T, {}>>>
) => css`
  @media (max-width: 899px) {
    ${css(cssRules, ...interpolations)}
  }
`;

const phoneMax = <T extends {}>(
  cssRules:
    | CSSObject
    | TemplateStringsArray
    | InterpolationFunction<ThemedStyledProps<T, {}>>,
  ...interpolations:
    | SimpleInterpolation[]
    | Array<Interpolation<ThemedStyledProps<T, {}>>>
) => css`
  @media (max-width: 599px) {
    ${css(cssRules, ...interpolations)}
  }
`;

export const breakpoints = {
  tabletMax,
  phoneMax,
};

export const shadow: () => SimpleInterpolation = () => {
  return css`
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
  `;
};

export const card: () => FlattenInterpolation<
  ThemeProps<DefaultTheme>
> = () => {
  return css`
    background-color: white;
    padding: 1.25rem;
    border-radius: 2px;
    font-size: 1.3rem;
    margin: auto 1.5rem;

    ${breakpoints.phoneMax`
      padding: .5rem;
      margin: 0;
      font-size: 1.2rem;
    `}
  `;
};

export const GlobalStyles = createGlobalStyle`
    body {
      margin: 0;
      overflow-y: overlay;
      overflow-x: hidden;
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
