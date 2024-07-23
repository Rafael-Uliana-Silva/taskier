import styled from "styled-components";

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    width: 540px;
  }
`

const BtnCriar = styled.button`

`

const BtnSubTask = styled.button`
  margin-top: 15px;
  margin-bottom: 45px;
  
`

const InputColor = styled.input`
	-webkit-appearance: none;
  appearance: none;
  padding-bottom: 25px;
  &&::-webkit-color-swatch {
    border-radius: 20px;
    height: 15px;
  }
`

const InputColunas = styled.select`
  color: #707070;
`

const SubTask = styled.span`
  input {
    width: 92%;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  span {
    font-size: 20px;
    color: #707070;
    font-weight: 700;
    transition: 0.3s;
    cursor: pointer;
  }
  && span:hover {
      text-shadow: 0px 0px 6px #707070;
    }
`

export {ModalForm, BtnCriar, BtnSubTask, InputColor, SubTask, InputColunas}
