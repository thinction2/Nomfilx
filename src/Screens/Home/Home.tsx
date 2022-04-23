import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../../api";
import styled from "styled-components";
import Banner from "./Banner";
import Slider from "./Slider";

const Container = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={data} />
          <Slider data={data} />
        </>
      )}
    </Container>
  );
};

export default Home;
