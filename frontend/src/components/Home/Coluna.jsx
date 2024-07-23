import React from 'react'
import styled from 'styled-components'


const ColunaContainer = styled.div`
  display: flex;
`

const ColunaContent = styled.div`
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
    width: 10px;
    background-color: #FF0000;
    border-radius: 50%;
    border: 1px solid #000;
  }
`

const TarefaContent = styled.div`
  cursor: pointer;
  background: #323033;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-right: 30px;
  span {
    color: #707070;
    font-size: 12px;
  }
`

const Coluna = () => {
  return (
     <ColunaContent>
       <h2><span className='circle'></span>Tag 1 (4)</h2>
       <TarefaContent>
         <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
         <p><span>0 de 3 subtarefas</span></p>
       </TarefaContent>
     </ColunaContent>
  )
}

export {ColunaContainer, ColunaContent, TarefaContent, Coluna};
