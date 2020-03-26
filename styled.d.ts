// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: string;
    colors: {
      text: string;
      background: string;
      red: string;
    };
  }
}
