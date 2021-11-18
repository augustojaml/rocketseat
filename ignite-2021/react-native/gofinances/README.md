### Install and Config

```bash
npm install -g expo-cli
```

- Create project

  ```
  expo init project_name
  ```

- Select

  ```bash
  ----- Bare workflow -----
      minimal             bare and minimal, just the essentials to get you started
  ```

- Add typescript
  [documentation](https://docs.expo.dev/guides/typescript/)

  - Create `tsconfig.json` in root project
  - Execute
    ```bash
    expo start
    ```
  - Select yes in

  ```bash
  It looks like you're trying to use TypeScript but don't have the required dependencies installed. Would you like to install typescript,
  @types/react, @types/react-native? › (Y/n)
  ```

  - Update file `tsconfig.json`

    ```json
    {
      "compilerOptions": {
        "strict": true
      },
      "extends": "expo/tsconfig.base"
    }
    ```

- Update `App.js for App.tsx`

- Configurar o eslint, prettier
  - [Documentation](https://www.notion.so/Padr-es-de-projeto-com-ESLint-Prettier-e-EditorConfig-f3134cb649fc4a16b0f7c2bc6e3a0489)

### Styled Components

- [Documentation](https://styled-components.com/)

- Install
  ```bash
  yarn add styled-components && yarn add @types/styled-components-react-native -D
  ```

### Layout

- [Figma - Gofinance](https://www.figma.com/file/EwGtJv3Tc0x3Qt5q1OPxzU/Chapter-II---GoFinances-Ignite?node-id=0%3A1)

### Typing theme global

- Create `src/@types/theme/styled.d.ts`

  ```bash
  import 'styled-components';
  import { theme } from '../../global/styles/theme';

  declare module 'styled-components' {
    type ThemeType = typeof theme;
    export interface DefaultTheme extends ThemeType {}
  }
  ```

### Custom fonts

- [Documentation](https://docs.expo.dev/guides/using-custom-fonts/#using-a-google-font)

- install

  ```bash
  expo install expo-font @expo-google-fonts/poppins expo-app-loading
  ```

- Usage

  ```tsx
  import React from 'react';
  import { ThemeProvider } from 'styled-components';
  import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  } from '@expo-google-fonts/poppins';
  import AppLoading from 'expo-app-loading';
  import { theme } from './src/global/styles/theme';
  import { Dashboard } from './src/screens/Dashboard';

  export default function App() {
    const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_700Bold,
    });

    if (!fontsLoaded) {
      return <AppLoading />;
    }

    return (
      <>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </>
    );
  }
  ```

### React Native Responsive Font Size

- [Documentation](https://www.npmjs.com/package/react-native-responsive-fontsize)

- install
  ```bash
  yarn add react-native-responsive-fontsize
  ```

### Expo Vector Icon

- [Documentation](https://icons.expo.fyi/)

### React Native Iphone X Helper

- [Documentation](react-native-iphone-x-helper)

- Install
  ```bash
  yarn add react-native-iphone-x-helper
  ```

### Validate form

- [Documentation](https://reactnative.dev/docs/textinput)

- Insall react-hook-forms

  - [Documentation](https://react-hook-form.com/)
  - [Documentation for validate](https://react-hook-form.com/get-started#SchemaValidation)

- autoCapitalize
- autoCorrect
- for close keyboard
  ```ts
  <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}
  ></TouchableWithoutFeedback>
  ```

### React Navigation

[Documentation](https://reactnavigation.org/)

### Async Storage

- [Documentation](https://docs.expo.dev/versions/latest/sdk/async-storage/)

- Install
  ```bash
  expo install @react-native-async-storage/async-storage
  ```

### React Native UUID

- [Documentation](https://github.com/eugenehp/react-native-uuid#readme)

- install
  ```bash
  yarn add react-native-uuid
  ```

### Vitory

- [Documentation](https://formidable.com/open-source/victory/docs/victory-pie)

- Install
  ```bash
   yarn add victory-native
  ```

### SVG

- [Documentation](https://github.com/kristerkari/react-native-svg-transformer)

- Install

  ```bash
   yarn add react-native-svg-transformer
  ```

- update file `metro.config.js`;

  ```js
  module.exports = (async () => {
    const {
      resolver: { sourceExts, assetExts },
    } = await getDefaultConfig(__dirname);
    return {
      transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
      },
      resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
      },
    };
  })();
  ```

### Expo Authentication

- [Documentation](https://docs.expo.dev/guides/authentication/)
- [Documentation](https://developers.google.com/identity/protocols/oauth2/openid-connect)

### Babel Plugin Inline Dotenv

- [Documentation](https://www.npmjs.com/package/babel-plugin-inline-dotenv)
