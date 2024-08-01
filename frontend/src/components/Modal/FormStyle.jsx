import styled from "styled-components";

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    width: 540px;
  }
  .desc {
    color: #707070;
    margin: 30px 0 15px 0;
    max-width: 550px;
  }
  .desc span {
    font-weight: 700;
  }
`

const BtnCriar = styled.button`

`

const BtnDeletar = styled.button`
  margin-top: 30px;
  background: rgb(168,53,53);
  background: linear-gradient(-135deg, rgba(168,53,53,1) 0%, rgba(166,67,67,1) 100%);
  &&:hover {
    box-shadow: 0 0 8px rgba(166,67,67,0.4), 0 0 16px rgba(166,67,67,0.3), 0 0 24px rgba(166,67,67,0.2);
  }
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

const CheckBox = styled.div`
  display: flex;
  width: 540px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  background: #292829;
  padding: 10px;
  margin: 10px 0px;
  input[type="checkbox"] {
    margin-bottom: 10px;
    width: 30px;
    padding: 0px;
    margin-right: 10px;
  }
  label {
    max-width : 95%;
    white-space: normal;
    word-wrap: break-word; 
    word-break: break-word; 
  }
  input[type="checkbox"]:checked + label {
   color: #707070;
   text-decoration: line-through;
  }
`

export {ModalForm, BtnCriar, BtnDeletar, BtnSubTask, InputColor, SubTask, InputColunas, CheckBox}
