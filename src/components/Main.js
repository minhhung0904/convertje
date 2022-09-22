import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

const Main = () => {

  const [state, setstate] = useState({data:""})

  const changeState = () => {  
    setstate({data:'userValue'}); 
   }; 

  let userValue
  const getInputValue = (event)=>{
      userValue = event.target.value;
      console.log(userValue)
  };


  return (
    <MainContainer>
      <Label htmlFor="Url">Url</Label>
      <Input type="text" id="Url" onChange={getInputValue} />
      <JoinButton onClick={changeState}>
      <Link
        to={{
          pathname: "/jsontoexcel",
          state: { url: userValue }
        }}
      > GET </Link>
      </JoinButton>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;


const Label = styled.label`
`;


const Input = styled.input`
  width: 500px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;



const JoinButton = styled.button`
  height: 40px;
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 25px;
  font-weight: 500;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;

export default Main;
