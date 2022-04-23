import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult } from "../../api";
import { makeImagePath } from "../../utils";
import MovieModal from "./MovieModal";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const Container = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 66px;
  background-image: url(${(p) => p.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(p) => p.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
    color: white;
  }
`;

const Btn = styled.button<{ right?: boolean }>`
  position: absolute;
  top: 75px;
  right: ${(p) => p.right && 0};
  padding: 0;
  margin: 0;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.05);
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth - 9,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 9,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: { delay: 0.5, duration: 0.2, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    transition: { delay: 0.5, duration: 0.2, type: "tween" },
    opacity: 1,
  },
};

interface ISliderProps {
  data?: IGetMoviesResult;
}

const offset = 6;

const Slider = ({ data }: ISliderProps) => {
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  return (
    <>
      <Container>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + ""}
                  key={movie.id}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  onClick={() => onBoxClicked(movie.id)}
                  bgphoto={makeImagePath(movie.backdrop_path)}
                  transition={{ type: "tween" }}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <Btn onClick={decreaseIndex}>
          <MdChevronLeft size={50} />
        </Btn>
        <Btn right onClick={increaseIndex}>
          <MdChevronRight size={50} />
        </Btn>
      </Container>
      <MovieModal data={data} />
    </>
  );
};

export default Slider;
