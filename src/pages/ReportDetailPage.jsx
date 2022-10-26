import React from "react";
import styled from "styled-components";
import ReportDetail from "../components/Information/ReportDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"
import image from "../assets/images/배경화면으로.jpg"

const ReportDetailPage = () => {
    return (
        <BackImage>
            <Container>
                <Header />
                <ReportDetail />
                <Footer />
            </Container>
        </BackImage>
    )
}

export default ReportDetailPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    /* height: 100vh/; */
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