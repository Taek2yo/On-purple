import React, { useState,useEffect } from "react";
import styled from "styled-components"
import axios from "axios";
import { useParams } from "react-router";
import CommentList from "./CommentList";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/modules/comment";
import writecomment from "../../assets/icons/writecomment.png"
const AddComment = (detail) => {
  /* console.log(detail) */
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState({
    comment: "",
  })

  const openModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  const { postId } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target
    setComment({ ...comment, [name]: value });
  };

  const addHandler = async (comment) => {
    if(comment.trim()===""){
      return alert("댓글을 입력해주세요")
    }
    let data = await axios.post(`${process.env.REACT_APP_HOST}/comment/${postId}`,
      { postId: postId, comment: comment },
      {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
          "RefreshToken": localStorage.getItem("RefreshToken")
        }
      },)
     .then((response)=>{
        dispatch(createComment(response?.data?.data));
    })
    setComment("")
  };

  return (
    <>
      <Container style={{ zIndex:"1" ,height: modalOpen ? "500px" : "50px" }}>
      <More onClick={openModal}><img src={writecomment} alt=""/></More>
        <div style={{ display: "flex", gap:"10px", marginLeft:"30px" }}>
          <Text
            type="text"
            name="comment"
            placeholder="댓글 달기.."
            onChange={inputHandler}
            value={comment.comment || ""}
          />
          <AddButton onClick={() => { addHandler(comment.comment) }}>게시</AddButton>
        </div>
        <CommentList />
      </Container>
    </>
  )
}

export default AddComment;

const Container = styled.div`
    max-height: 100vh;
    max-width: 100vw;
    position: fixed;
    transition: all 1000ms;
    bottom: 0;
    background-color: white;
`
const AddButton = styled.button`
    width: 15vw;
    height: 4.5vh;
    border: none;
    background-color: #DEBAF3;
    border-radius: 80px;
    font-weight: bold;
    color: white;
`

const Text = styled.input`
    width: 350px;
    height: 4.5vh;
    font-size: 15px;
    border: none;
    
    &:focus{
      outline: none;
      border-bottom: 1px solid black;
    }
`
const More = styled.div`
    width: 100%;
    height: 50px;
    text-align: center;
    img {
      object-fit: cover;
      width: 50px;
      height: 100%;
     }
`