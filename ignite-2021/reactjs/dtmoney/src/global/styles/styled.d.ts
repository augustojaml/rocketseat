import 'styled-components';
import { themeDark, themeLight } from './theme';

declare module 'styled-components' {
  const Types = themeDark || themeLight;
  type ThemeType = typeof Types;
  export interface DefaultTheme extends ThemeType {}
}
