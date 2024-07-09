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
  &&::-webkit-color-swatch-wrapper {

  }
  &&::-webkit-color-swatch {
    border-radius: 20px;
  height: 15px;
}
`

export {ModalForm, BtnCriar, BtnSubTask, InputColor}
