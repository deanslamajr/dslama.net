import { css, Interpolation, RuleSet } from 'styled-components';
import { normalizeColor } from 'grommet/utils';

// styled-components types props as `object` when a rule set has none of its own.
// eslint-disable-next-line @typescript-eslint/ban-types
type NoProps = object;

// Used as a tagged template: ${breakpoints.phoneMax`padding: 0;`}
const maxWidth = (px: number) => (
  styles: Parameters<typeof css>[0],
  ...interpolations: Interpolation<NoProps>[]
): RuleSet<NoProps> => css`
  @media (max-width: ${px}px) {
    ${css(styles, ...interpolations)}
  }
`;

const tabletMax = maxWidth(899);
const phoneMax = maxWidth(599);

export const breakpoints = {
  tabletMax,
  phoneMax,
};

export const shadow = (): RuleSet<NoProps> => {
  return css`
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
  `;
};

export const card = (): RuleSet<NoProps> => {
  return css`
    background-color: ${props => normalizeColor('card', props.theme)};
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
