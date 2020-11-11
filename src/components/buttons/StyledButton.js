import React, { Component } from 'react';
import styled from 'styled-components';


const StyledButton = ({handleSubmit}) => {
  return (
    <Button type="submit" onClick={handleSubmit}>
      Submit
    </Button>
  );
}

export default StyledButton; 

const Button = styled.button`
  margin-top: 10px; 
  height: 50px; 
  border-radius: 4px; 
  background-color: #42aaf5;
  color: white; 
  display: flex; 
  align-items: center;
  justify-content: center;
  cursor: pointer; 
  transition: .4s ease all; 
  max-width: 250px;
  font-size: 20px; 
  outline: 0; 
  border: 0;
  width: 70vw;

  :hover {
    background-color: #4290f5;
  }
`