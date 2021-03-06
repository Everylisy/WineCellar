import { Card, Image, Rate, Button } from "antd";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import * as Api from "../../../api";

import DeleteModal from "./DeleteModal";
import MyReviewEditForm from "./MyReviewEditForm";

const ReviewkItemContainer = styled(Card)`
  border: None;
  border-radius: 15px;
  background-color: #ffffff;

  width: 800px;
  height: auto;

  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 20px;
  box-shadow: 0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);

  @media screen and (max-width: 1024px) {
    display: relative;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    margin-left: 25px;
    width: 100%;
  }
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: row;

  position: relative;
`;

const ImgWrapper = styled.div`
  margin-right: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const InfoWrapper = styled.div`
  position: flex;
`;

const ReviewImg = styled(Image)`
  border-radius: 5px;
`;

const HeadSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const StyledRate = styled(Rate)`
  display: flex;
  justify-content: flex-end;

  position: absolute;
  right: 0;

  @media screen and (max-width: 1024px) {
    font-size: 16px;
    top: 30px;
  }
  @media screen and (max-width: 768px) {
    position: relative;
    font-size: 14px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ReviewTitle = styled.div`
  font-weight: 500;
  font-size: 15px;
  color: #1e1e1e;

  @media screen and (max-width: 1024px) {
    font-size: 13px;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Date = styled.div`
  color: #c4c4c4;
  font-size: 12px;
  padding-top: 3px;
  margin-left: 230px;

  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 0;

  @media screen and (max-width: 1024px) {
    font-size: 10px;
    top: 55px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const WineName = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  margin-top: 7px;
  margin-bottom: 10px;
  position: relative;

  color: #1e1e1e;
  @media screen and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;
const ContentWrapper = styled.div`
  margin-bottom: 40px;
  font-size: 13px;
  color: gray;
  width: 100%;
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  position: absolute;
  bottom: 0;
  right: 0;
`;

const MyReviewButton = styled(Button)`
  font-weight: 400;
  font-size: 12px;
  border-radius: 5px;
  margin-top: 20px;
  margin-right: 5px;

  padding-left: 8px;
  padding-right: 8px;
  padding-top: 1px;
  padding-bottom: 1px;
`;

function ReviewItem({
  reviewInfo,
  myReviewList,
  setMyReviewList,
  currentUserId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [wineName, setWineName] = useState("");
  const [wineImageURL, setWineImageURL] = useState("");

  const [Info, setInfo] = useState(reviewInfo);
  
  const getWineName = useCallback(async () => {
    const res = await Api.get(`wines/${reviewInfo.wine}`);
    setWineName(res.data.name);
    setWineImageURL(res.data.ImageURL)
    
  }, [reviewInfo.wine]);


  useEffect(() => {
    getWineName();
  }, [getWineName]);

  const showModal = () => {
    setIsModal(true);
  };

  return (
    <>
      <ReviewkItemContainer>
        <ReviewWrapper>
          <ImgWrapper>
            <ReviewImg
              width={150}
              src={"https://"+wineImageURL}
            />
          </ImgWrapper>
          {isEditing ? (
            <MyReviewEditForm
              reviewId={reviewInfo.id}
              setIsEditing={setIsEditing}
              Info={Info}
              setInfo={setInfo}
              setMyReviewList={setMyReviewList}
              currentUserId={currentUserId}
            />
          ) : (
            <InfoWrapper>
              <div className="review_wrapper">
                <HeadSection>
                  <WineName>{wineName}</WineName>
                  <StyledRate
                    defaultValue={reviewInfo.rating}
                    disabled={"true"}
                  />
                </HeadSection>
                <InfoSection>
                  <ReviewTitle>{reviewInfo.title}</ReviewTitle>
                  <Date className="diary_date">
                    {reviewInfo.createdAt.slice(0, 10)}
                  </Date>
                </InfoSection>
                <ContentWrapper>{reviewInfo.content}</ContentWrapper>
              </div>
              <BtnWrapper>
                <MyReviewButton
                  style={{ color: "#c365fd" }}
                  onClick={() => setIsEditing(true)}
                >
                  ??????
                </MyReviewButton>
                <MyReviewButton onClick={showModal} style={{ color: "red" }}>
                  ??????
                </MyReviewButton>
              </BtnWrapper>
              {isModal && (
                <DeleteModal
                  isModal={isModal}
                  setIsModal={setIsModal}
                  reviewId={reviewInfo.id}
                  myReviewList={myReviewList}
                  setMyReviewList={setMyReviewList}
                />
              )}
            </InfoWrapper>
          )}
        </ReviewWrapper>
      </ReviewkItemContainer>
    </>
  );
}

export default ReviewItem;
