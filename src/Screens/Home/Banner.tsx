import styled from "styled-components";
import { makeImagePath } from "../../utils";
import { IGetMoviesResult } from "../../api";

const Container = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(p) => p.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const OverView = styled.p`
  font-size: 36px;
  width: 50%;
  line-height: 1.4;
`;

interface IBannerProps {
  data?: IGetMoviesResult;
}

const Banner = ({ data }: IBannerProps) => {
  return (
    <Container bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
      <Title>{data?.results[0].title}</Title>
      <OverView>{data?.results[0].overview}</OverView>
    </Container>
  );
};

export default Banner;
