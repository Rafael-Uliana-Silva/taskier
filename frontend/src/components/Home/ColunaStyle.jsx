import styled from 'styled-components'
import IcnEngrenagem from '../../assets/icnGear.svg?react'

const ColunaContainer = styled.div`
  display: flex;
  z-index: 0;
`

const IcnGear = styled(IcnEngrenagem)`
  min-width: 20px;
  transition: 0.3s;
  cursor: pointer;
  margin-left: 15px;
  padding: 10px;
  &:hover {
    filter: drop-shadow(0 0 10px #707070);
  }
`


const ColunaContent = styled.div`
  margin-right: 50px;
  width: 300px;
  display: flex;
  flex-direction: column;
  h2 {
    color: #707070;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .circle {
    margin-right: 10px;
    height: 10px;
    min-width: 10px;
    background-color: #FF0000;
    border-radius: 50%;
    border: 1px solid #000;
  }
  .titleFlex {
    display: flex;
    justify-content: space-between;
  }
`

const TarefaContent = styled.div`
  width: ${'calc(100% - 20px)'};
  cursor: pointer;
  background: #323033;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-right: 30px;
  transition: 0.3s;
  span {
    color: #707070;
    font-size: 12px;
  }
  &&:hover {
    scale: 102%;
  }
`

export {ColunaContainer, ColunaContent, TarefaContent, IcnGear};
