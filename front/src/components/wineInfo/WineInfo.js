import { useEffect, useState } from "react";
import * as Api from "../../api";
import { Steps, Button } from "antd";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentAtom, isLoadedAtom, resultAtom } from "../../atoms";
import Result from "./Result";
import StpesBtn from "./StepsAction";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  width: 100%;
  padding: 0 48px;
  max-width: calc(1200px + 48px + 48px);
  margin: 0 auto;
`;

const BoxWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

const StepWrapper = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const StepBox = styled.div`
  /* display: flex; */
  width: 900px;
  height: 560px;
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(196, 196, 196, 0.5);
  border-radius: 20px;
`;

const ResultWrapper = styled.div`
  padding: 64px 0 64px 48px;
  max-width: calc(1200px + 48px + 48px);
  margin: 0 auto;
`;

const BgContainer = styled.div`
  background-color: #f8f9fa;
  ${ResultWrapper} {
    width: 100%;
    background-color: none;
  }
`;

const { Step } = Steps;

const StyledStep = styled(Steps)`
  display: flex;
  .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
    background: #c365fd;
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #fff;
    border-color: #c365fd;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #fff;
    border-color: #c365fd;
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: #c365fd;
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #c365fd;
  }
`;

function WineInfo() {
  const navigate = useNavigate();
  const current = useRecoilValue(currentAtom);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedAtom);
  const result = useRecoilValue(resultAtom);
  const [bookmarkList, setBookmarkList] = useState([]);
  const steps = [
    {
      title: "?????????",
      description: "????????? ??????????????????.",
    },
    {
      title: "?????? ?????? ????????????",
      description: "?????? ????????? ????????? ??????????????????????",
    },
    {
      title: "??? ????????????",
      description: "?????? ?????? ???????????????????",
    },
  ];

  useEffect(() => {
    Api.get("bookmarklist").then((res) => {
      const data = res.data.bookmark;
      setBookmarkList(data);
    });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>?????? ?????? ????????????</title>
        </Helmet>
      </HelmetProvider>

      <BgContainer>
        {!isLoaded ? (
          <>
            <MainContainer>
              <BoxWrapper>
                <StepBox>
                  <StpesBtn />
                </StepBox>
              </BoxWrapper>
              <StepWrapper>
                <StyledStep direction="vertical" size="small" current={current}>
                  {steps.map((item) => (
                    <Step
                      key={item.title}
                      title={item.title}
                      description={item.description}
                    />
                  ))}
                </StyledStep>
              </StepWrapper>
            </MainContainer>
          </>
        ) : (
          <ResultWrapper key={result.id} title={result.name}>
            <Button
              onClick={() => window.location.reload()}
              style={{ margin: "20px 0 20px 0 " }}
            >
              ????????????
            </Button>
            {result.map((result) =>
              bookmarkList.some(
                (bookmark) => bookmark.wineInfo.id === result.id
              ) ? (
                <Result
                  key={result.id}
                  wineId={result.id}
                  title={result.name}
                  type={result.type}
                  nation={result.nation}
                  local={result.local}
                  price={result.price}
                  ImageURL={result.ImageURL}
                  abv={result.abv}
                  varieties={result.varieties}
                  sweet={result.sweet}
                  acidity={result.acidity}
                  body={result.body}
                  tannin={result.tannin}
                  bookmarked={true}
                  bookmarkList={bookmarkList}
                  setBookmarkList={setBookmarkList}
                />
              ) : (
                <Result
                  key={result.id}
                  wineId={result.id}
                  title={result.name}
                  type={result.type}
                  nation={result.nation}
                  local={result.local}
                  price={result.price}
                  ImageURL={result.ImageURL}
                  abv={result.abv}
                  varieties={result.varieties}
                  sweet={result.sweet}
                  acidity={result.acidity}
                  body={result.body}
                  tannin={result.tannin}
                  bookmarked={false}
                  bookmarkList={bookmarkList}
                  setBookmarkList={setBookmarkList}
                />
              )
            )}
          </ResultWrapper>
        )}
      </BgContainer>
    </>
  );
}

export default WineInfo;
