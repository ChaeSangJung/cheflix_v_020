import React from 'react';
import styled, { keyframes } from 'styled-components';

const boxSpin = keyframes`
    from   {  -webkit-transform: rotate(0deg); }
    to   {  -webkit-transform: rotate(360deg); }
`
const WrapCircle = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    margin-top: 80px;
    text-align: center;
    box-sizing: border-box;
`
const Circle = styled.div`
    display: inline-block;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    border: dashed 5px #fff;    
    animation: ${boxSpin} 5s infinite linear;
`;
const Loader = () => {
    return (
        <WrapCircle>
            <Circle></Circle>
        </WrapCircle>
    );
};
export default Loader;