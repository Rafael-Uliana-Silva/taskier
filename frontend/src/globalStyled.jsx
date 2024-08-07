import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
  :root {
    --background: ${({ theme }) => theme.background1};
    --background: ${({ theme }) => theme.background2};
    --text-color-alt: ${({ theme }) => theme.colorAlt};
    --text-color: ${({ theme }) => theme.color};
  }

  html {
    background-color: var(--background);
  }

  p, h1, h2, h3, a, span, li {
    color: var(--text-color);
    font-family: Asap;
  }
  
  label, input, textarea, select{
    color: var(--text-color-alt);
    font-family: Asap;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 16px;
    color: var(--text-color);
  }

  p {
    font-size: 16px;
  }

  .btn {
    background: rgb(116,53,168);
    background: linear-gradient(-135deg, rgba(116,53,168,1) 0%, rgba(166,67,136,1) 100%);
    border-radius: 20px;
    border-style:none;
    padding: 10px 30px;
    color: #fff;
    cursor: pointer;
    font-family: Asap;
    transition: 0.3s;
  }

  .btn-delete {
    background: rgb(168,53,53);
    background: linear-gradient(-135deg, rgba(168,53,53,1) 0%, rgba(166,67,67,1) 100%);
    &&:hover {
      box-shadow: 0 0 8px rgba(166,67,67,0.4), 0 0 16px rgba(166,67,67,0.3), 0 0 24px rgba(166,67,67,0.2);
    }
    }

  .btn p {
    color: #fff;
  }

  .alt {
    background: #fff;
  }

  .alt p {
    color: #A64388;
  }

  .btn:hover {
    box-shadow: 0 0 8px rgba(166,67,136,0.4), 0 0 16px rgba(166,67,136,0.3), 0 0 24px rgba(166,67,136,0.2);
  }

  .alt:hover {
    box-shadow: 0 0 8px rgba(255,255,255, 0.4), 0 0 16px rgba(255,255,255, 0.3), 0 0 24px rgba(255,255,255, 0.2)
  }

  input, textarea, select {
    border: 1px solid #707070;
    border-radius: 10px;
    padding: 10px;
    background: none;
    outline: none;
    margin-bottom: 30px;
    margin-top: 10px;
  }

  textarea {
    resize: vertical;
  }
`

export default globalStyle;
