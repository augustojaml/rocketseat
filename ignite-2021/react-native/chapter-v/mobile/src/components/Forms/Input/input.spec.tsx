import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { Input } from '.';
import { theme } from '../../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Component Form | Input', () => {
  it('should be able to set specific border color when active', () => {
    const { getByTestId, debug } = render(
      <>
        <Input
          testID="input-email"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCorrect={false}
          active
        />
      </>,
      {
        wrapper: Providers,
      },
    );
    // debug();
    const inputComponent = getByTestId('input-email');
    expect(inputComponent.props.style[0].borderColor).toEqual(
      theme.colors.attention,
    );

    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
