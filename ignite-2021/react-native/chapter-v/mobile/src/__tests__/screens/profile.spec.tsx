import React from 'react';

import { render } from '@testing-library/react-native';
import { Profile } from '../../screens/Profile';

describe('###################### \n  #### Test Profile #### \n  ######################', () => {
  it('ckeck if show correctly user input name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();
  });

  it('check if user data has been loaded', () => {
    const { getByTestId } = render(<Profile />);
    const inputName = getByTestId('input-name');
    const inputSurName = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Augusto');
    expect(inputSurName.props.value).toEqual('Monteiro');
  });

  it('check if title render correctly', () => {
    const { getByTestId } = render(<Profile />);
    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Profile');
  });
});
