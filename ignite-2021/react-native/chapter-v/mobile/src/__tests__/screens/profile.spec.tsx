import React from 'react';

import { render } from '@testing-library/react-native';
import { Profile } from '../../screens/Profile';

describe('########################## \n  ##### Profile Screen ##### \n  ##########################', () => {
  it('should have placeholder correctly in user name input ', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();
  });

  it('should be loaded user data', () => {
    const { getByTestId } = render(<Profile />);
    const inputName = getByTestId('input-name');
    const inputSurName = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Augusto');
    expect(inputSurName.props.value).toEqual('Monteiro');
  });

  it('should exist title correctly', () => {
    const { getByTestId } = render(<Profile />);
    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Profile');
  });
});
