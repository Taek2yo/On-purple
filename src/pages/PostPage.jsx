import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import TextArea from "../components/Board/TextArea/TextArea";
import { Button } from "@mui/material";
import axios from "axios";
import default_Img from "../assets/images/default-image.jpg";
import Delete from "../assets/icons/delete.png"
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper";

const PostPage = () => {
  let inputRef;
  const navigate = useNavigate();
  const [formData] = useState(new FormData())
  
  // 게시판 제목, 내용, 사진
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImage] = useState([]);

  //이미지 업로드 핸들
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...imageUrl];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
      window.URL.revokeObjectURL(imageLists[i]);
      formData.append("imageUrl", imageLists[i]);
    }
    // 이미지 최대 5개 까지만
    if (imageUrlLists.length > 5) {
      window.alert("이미지는 최대 5개까지만 가능합니다😭")
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setImage(imageUrlLists);
  };
 
  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setImage(imageUrl.filter((_, index) => index !== id));
  };

  // 이미지, 제목, 내용 모두 작성해야 등록 가능
  const canSubmit = () => {
    return imageUrl.length !== 0 && content !== "" && title !== "";
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    let req = {
      title: title,
      content: content,
    };

    let json = JSON.stringify(req);

    try {
      const title = new Blob([json], { type: "application/json" });
      formData.append("data", title);

      const content = new Blob([json], { type: "application/json" });
      formData.append("data", content);
      
      await axios.post("http://3.37.88.29:8080/post", formData, {
        headers: {
          "content-type": "multipart/form-data",
          "Authorization": localStorage.getItem("Authorization"), //accesstoken 
          "RefreshToken": localStorage.getItem("RefreshToken"),
        },
      });
      window.alert("😎등록이 완료되었습니다😎");
      navigate("/board");
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      window.alert("오류발생!" + "😭");
    }

  }, [canSubmit]);
  
  
  return (
    <div>
      <AddHeader>
        💖여러분의 후기를 남겨주세요💖
      </AddHeader>
      <SubmitBtn>
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            등록하기😃
          </Button>
        ) : (
          <Button
            className="disable-button"
            variant="outlined"
            size="large"
          >
            사진과 내용을 모두 입력하세요😭
          </Button>
        )}
      </SubmitBtn>
      <AddBody>
        <UploaderWrapper>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            multiple
            onChange={handleAddImages}
            ref={(refParam) => (inputRef = refParam)}
            style={{ display: "none" }}
          />        
          {/* 미리보기 조건부 렌더링 */}        
          {imageUrl.length == 0 ? 
            /* 이미지가 없으면 default 이미지 출력 */
            <DefaultImage />  
            : 
            /* 있으면 슬라이드 출력 */
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
              {imageUrl.map((image, id) => (
                <SwiperSlide key={id}>
                  <ImgBox>                
                    <DeleteBtn onClick={() => handleDeleteImage(id)}><img src={Delete} alt="X" /></DeleteBtn>
                    <img src={image} alt="" />
                  </ImgBox>
                </SwiperSlide>
              ))}
           </Swiper> 

           }
     
          <Btn>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => inputRef.click()}
            >
              😎사진 고르기😎
            </Button>

          </Btn>
        </UploaderWrapper>
        <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content} />
      </AddBody>
    </div>
  );
}

export default PostPage;



const AddHeader = styled.div`
    text-align: center;
    font-size: 32px;
    font-weight: 15px;
    margin: 20px 0;
`

const SubmitBtn = styled.div`
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    button{ }
    .disable-button{
      font-size: 1.1rem;
      cursor: not-allowed;
    }
    .success-button{
      font-size: 1.1rem;
    }
`

const AddBody = styled.div`
    display: flex;
    margin: 20px 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: 50px;

`

const UploaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Btn = styled.div`
    margin-top: 30px;
    button {
        margin: 10px 5px;
        font-size: 1.1rem;
      }
`

const DeleteBtn = styled.div`
  margin-bottom: 10px;
  margin-left: 95%;
  width: 20px;
  height: 20px;
  
`
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  height: 100%;
`

const DefaultImage = styled.div`
  margin-top: 10px;
  width: 400px;
  height: 400px;
  background-image: url(${default_Img});
  background-repeat: no-repeat;
  background-position: center;

`