import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.primary800};
    color: ${({ theme }) => theme.colors.primary100};
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }
  /*MEDIA SCREEN*/
  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: ${({ theme }) => theme.fonts.title};
  }
  body,
  input,
  textarea,
  select,
  button {
    font: 400 1rem ${({ theme }) => theme.fonts.text} , sans-serif;
  }

  button {
    cursor: pointer;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.8);
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: filter 0.2s;
    &:hover {
     filter: brightness(0.7)
    }
  }
`;
