import React from "react";
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header";
import ProfileInfo from "../components/Profile/ProfileInfo";
import image from "../assets/images/배경화면으로.jpg"
import styled from "styled-components";

const ProfileInfoPage = () => {
    return (
        <BackImage>
            <Container>
                <Header />
                <ProfileInfo />
                <Footer />
            </Container>
        </BackImage>


    )
}

export default ProfileInfoPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    overflow-x: hidden;
    margin:0 auto;
    @media all and (max-width : 390px) {
   max-width : 390px;
   }
`
const BackImage = styled.div`
background: url(${image});
background-size: cover;
height: 100vh;
`