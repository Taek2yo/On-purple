import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { __getPostsDetail } from "../../redux/modules/board";
import AddComment from "./AddComment"
import { __deletePosts,__likePost } from "../../redux/modules/board";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import delete2 from "../../assets/icons/delete2.png"
import edit from "../../assets/icons/edit.png"

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper";
import Swal from "sweetalert2";


const Detail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { isLoading, error, detail } = useSelector((state) => state?.post);
    const { postId } = useParams();
    /* console.log(detail) */

    useEffect(() => {
        dispatch(__getPostsDetail(postId));
    }, [])

    if (isLoading) return "😴로딩중이에요..😴"

    if (error) {
        return <>{error.message}</>
    }

    const goEdit = () => {
        navigate(`/edit/${postId}`)
    }
    
    const onLike = (event) => {
        event.preventDefault();
        dispatch(__likePost(postId));
    };
    
    // 혹시모를 URL 입력해서 들어오는 경우 로그인 유무 판단 후 2초뒤 로그인 페이지로 보냄
    const getNickname = localStorage.getItem("nickname")
    if (getNickname === null) {
            Swal.fire({title: '로그인이 필요합니다.😢'
                        , icon: 'error'})
            setTimeout(() => {
                (navigate('/login'))
            }, 2000);   
    }
    return (
        <>
            <Title>{detail?.title}</Title>

            <DateButtonWrapper>
                {getNickname === detail?.nickname ?
                    (
                     <div style={{gap:"10px", marginRight:"10px"}}>
                        <EditButton onClick={goEdit}><img src={edit} alt=""/></EditButton>
                        <DeleteButton onClick={() => { setShow(true) }}><img src={delete2} alt=""/></DeleteButton>
                     </div>
                    ) :
                    null}
            </DateButtonWrapper>
            <Date>{detail?.createdAt[0]}-{detail?.createdAt[1]}-{detail?.createdAt[2]}</Date>
            
            <View>
                <div>View : {detail?.view}</div>
            </View>
            
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper" >
                {detail?.imgList?.map((image, id) => (
                    <SwiperSlide key={id}>
                        <ImgBox>
                            <img src={image} alt="" />
                        </ImgBox>
                    </SwiperSlide>
                ))}
            </Swiper>

            <NameLikeWrap>
                <div style={{fontSize:"1.2rem", marginLeft:"22px", fontWeight:"bold"}}>{detail?.nickname}</div>
                <div style={{fontSize:"1rem", display:"flex"}}><span onClick={onLike}>💜</span> {detail?.likes}개</div>
            </NameLikeWrap>
            
            <Content><p>{detail?.content}</p></Content>
            <div style={{ marginTop: "10px" }}>
                <AddComment detail={detail} />
            </div>

            {/* Modal */}
            <Dialog open={show}>
                <DialogContent style={{ position: "relative" }}>
                    <IconButton
                        style={{ position: "absolute", top: "0", right: "0" }}
                        onClick={() => setShow(false)}
                    >
                        <DisabledByDefaultOutlinedIcon />
                    </IconButton>
                    <div className="modal">
                        <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
                        <div className="modal-button">
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={async () => {
                                    setShow(false);
                                    // 모달의 예 버튼 클릭시 게시물 삭제
                                    dispatch(__deletePosts(postId))
                                    alert("게시물이 삭제되었습니다😎");
                                    navigate("/board/taste");
                                }}
                            >
                                예
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    setShow(false)
                                }}
                            >
                                아니오
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default Detail;

const Title = styled.h1`
    text-align: center;
`

const Date = styled.div`
    font-size: 1rem;
    margin-left: 12px;
`
const DateButtonWrapper = styled.div`
    align-items: center;
    display: flex;
    float: right;
    gap: 10px;
`

const Content = styled.div`
    margin: 0 auto;
    margin-top: 12px;
    width: 90%;
    height: 45vh;
    border-top: 1px solid #9E87BA;
    font-size: 20px;
`

const ImgBox = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 3vw;
`

const View = styled.div`
    display: flex; 
    align-items: center;
    justify-content: space-between;
    margin-top:20px;
    padding-left: 10px;
    padding-right: 10px;
`

const NameLikeWrap = styled.div`
    display: flex;
    align-items: center;
    gap:10px;
    margin-top:10px
`
const EditButton = styled.button`
    width: 40px;
    height: 30px;
    border: none;
    margin: 0 0 auto 0;
    margin-top: 5px;
    background-color: white;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const DeleteButton = styled.button`
width: 40px;
    height: 30px;
    border: none;
    margin: 0 0 auto 0;
    margin-top: 5px;
    background-color: white;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`