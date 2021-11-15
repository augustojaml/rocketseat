import { AppProps } from 'next/app';
import { GlobalComponent } from '../global/GlobalComponent';

import { CustomThemeProvider } from '../global/useCustomTheme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomThemeProvider>
        <GlobalComponent>
          <Component {...pageProps} />
        </GlobalComponent>
      </CustomThemeProvider>
    </>
  );
}

export default MyApp;
