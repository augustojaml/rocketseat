# Rentx

### Create you snippet

- Go to file -> preferences -> User Snippets -> New Global Snippets file -> enter the name of the snippets

  ```json
  {
    "Basic React Native Interface": {
      "prefix": "rnfc",
      "body": [
        "import React from 'react';",
        "",
        "import { Container } from './styled';",
        "",
        "export function Home() {",
        " return (",
        "   <>",
        "     <Container />",
        "   </>",
        " );",
        "}"
      ],
      "description": "Basic React Native Interface with Styled Component"
    },
    "Basic React Native Styled Component": {
      "prefix": "rnsc",
      "body": [
        "import styled from 'styled-components/native';",
        "",
        "export const Container = styled.View`",
        " flex: 1;",
        "`;"
      ],
      "description": "Basic Styled Component for React Native"
    }
  }
  ```

### Check file in folder `src/@types` for types

### Fonts

- [Documentation](https://docs.expo.dev/guides/using-custom-fonts/)
- Install
  ```bash
  expo install expo-font @expo-google-fonts/inter @expo-google-fonts/archivo
  ```

### AppLoading

- [Documentation](https://docs.expo.dev/versions/latest/sdk/app-loading/)
- Install
  ```bash
  expo install expo-app-loading
  ```

### SVG

- [Documentation](https://docs.expo.dev/versions/latest/sdk/svg/)
- Install
  ```bash
  expo install react-native-svg
  ```
- [Documentation](https://github.com/react-native-svg/react-native-svg)
- Install

  ```bash
  yarn add react-native-svg
  ```

- [Documentation](https://github.com/kristerkari/react-native-svg-transformer)
- Install
  ```bash
  yarn add react-native-svg-transformer
  ```
- Update file

  ```js
  // Learn more https://docs.expo.io/guides/customizing-metro
  const { getDefaultConfig } = require('expo/metro-config');

  module.exports = (async () => {
    const {
      resolver: { sourceExts, assetExts },
    } = await getDefaultConfig(__dirname);
    return {
      transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
      },
      resolver: {
        assetExts: assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
      },
    };
  })();
  ```

### React Native Responsive Font Size

- [Documentation](https://www.npmjs.com/package/react-native-responsive-fontsize)
- Install
  ```bash
  yarn add react-native-responsive-fontsize
  ```