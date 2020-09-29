import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 1s linear;
  }
  a {
    color: ${({ theme }) => theme.text};
  }
  .wallpaper-block {
    border: 2px solid ${({ theme }) => theme.text};
  }
  .dropdown select {
    border: 2px solid ${({ theme }) => theme.text};
  }
  .button-container button {
    border: 1px solid ${({ theme }) => theme.text};
  }`;
