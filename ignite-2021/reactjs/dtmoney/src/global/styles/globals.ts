import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media(max-width: 1080px) {
      font-size: 93.75%;      
    }

    @media(max-width: 720px) {
      font-size: 87.5%;      
    }
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: ${({ theme }) => theme.fonts.text};
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: ${({ theme }) => theme.fonts.title};
    font-weight: 600;
  }

  button {
    cursor: pointer;
    transition: filter 0.3s;
    &:hover {
      filter: brightness(0.9);
    }
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0,0,0 , 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-modal-content {
    
    width: 100%;
    max-width: 576px;
    background: ${({ theme }) => theme.colors.background};
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;
    &:hover {
     filter : brightness(0.6);
    }
  }

`;
