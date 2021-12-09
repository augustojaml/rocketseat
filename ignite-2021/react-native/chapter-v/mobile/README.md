# Chapter V - Testes

- [Documentation](https://github.com/callstack/react-native-testing-library)

- Install

```bash
yarn add --dev @testing-library/react-native \
yarn add --dev @testing-library/jest-native \
yarn add @types/jest -D
```

- Add pakage.json

```json
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
  }
```

- Correções
  [Documentation](https://docs.expo.dev/guides/testing-with-jest/)

- Create Folder `./src/__tests__`
