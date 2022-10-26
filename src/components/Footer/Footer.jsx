import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Chating from "../../assets/icons/chating.png"
import Dashboard from "../../assets/icons/dashboard.png"
import Home from "../../assets/icons/home.png"


const Footer = () =>{
    return(
        <FooterContainer>
            {/* <div onClick={()=>{navigate(-1)}}>
                <MainContainer>
                    <img src={Return} alt=""/>
                    <span>뒤로가기</span>
                </MainContainer>
            </div> */}
            <Link to="/board/taste">
                <MainContainer>
                    <img src={Dashboard} alt=""/>
                    <span>Board</span>
                </MainContainer>
            </Link>
            <Link to="/" >
                <MainContainer>
                    <img src={Home} alt=""/>
                    <span>Home</span>
                </MainContainer>
            </Link>
            <Link to="/chat" >
                <MainContainer>
                    <img src={Chating} alt=""/>
                    <span>Chat</span>
                </MainContainer>
            </Link>
        </FooterContainer>
    )
}

export default Footer;
//BF80BF
const FooterContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0px;
  background-color: white;
  border-top: 1px solid #9C7FCB;
  max-width: 428px;
  width: 100%;
  height: 50px;
  margin: auto;
  justify-content: space-evenly;
align-items:center;
  
  a:hover, a:active { text-decoration: none; }
  a { text-decoration: none;}
  a:visited { text-decoration: none; }
`

const MainContainer = styled.div `
    display: flex;
    flex-direction: column;
    width: 80px;
    justify-content: center;
    img{
        width: 30px;
        margin: auto;
        padding-top: 5px;
    }
    span{
        margin: 0 auto;
        color:#8077C6;
    }
`