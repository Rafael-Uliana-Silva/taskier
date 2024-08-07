import styled from "styled-components"

const HomeContainer = styled.div`
  margin-top: 60px;
  display: flex;
  overflow-y: auto;
  padding: 30px 30px 30px 50px;
  margin-left: ${({ $recolherSide }) => $recolherSide ? '100px' : '250px'};
  transition: margin-left 0.5s;
  position: relative;
`

const NovaColuna = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background1};
  padding: 30px;
  height: 600px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 30px;
  transition: 0.3s;
  h2 {
    color: ${({ theme }) => theme.color};
    width: 200px;
    text-align: center;
  }
  &&:hover{
    scale: 102%;
  }
`

export { HomeContainer, NovaColuna };
