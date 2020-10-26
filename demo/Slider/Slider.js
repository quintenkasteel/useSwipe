import React, { useState, useEffect } from "react";
import { StyledSliderItem, StyledSliderContainer } from "./styles.js";
import useSwipe from "../../src/index.js";
import useWindowSize from '../Resize.js'

const Slider = ({ children }) => {
  const [state, setState] = useState({
    index: 0,
    translate: 0,
  });
  const swipe = useSwipe();
  const windowSize = useWindowSize();
  const windowWidth = windowSize.screenWidth;
  const isMobile = windowWidth < 768;

  const swipeDistance =
    (swipe.direction === "LEFT" || swipe.direction === "RIGHT") &&
    swipe.distance && swipe.distance || 0;

  useEffect(() => {
    // const newIndex =
    //     state.index >= 0 && state.index + 1 <= 5 && swipeDistance < -25 && state.index + 1
    //     || state.index >= 0 && state.index - 1 >= 0 && swipeDistance > 25 && state.index - 1

    //    const translate = state.translate + (swipe.isSwiping && swipeDistance || state.index)

    //    if (swipe.isSwiping) {
    //        console.log(swipeDistance, state.translate, translate)
    //        return
    //     }
    if (!windowWidth) return
    setState((state) => ({
      ...state,
      //   index: newIndex ? newIndex : state.index,
      translate: state.translate + (swipeDistance / windowWidth),
    }));
  }, [swipe, windowSize.screenWidth]);

  return (
    <StyledSliderContainer
      translate={state.translate}
      isMobile={isMobile}
      isSwiping={swipe.isSwiping}
      index={state.index}
      velocity={1.1}
      distance={swipeDistance}
      className="slider"
    >
      {children &&
        children.map((child, i) => {
          return (
            <StyledSliderItem
              key={i}
              className="slide-item"
              background={i % 2 === 0 ? "red" : "green"}
            >
              {child}
            </StyledSliderItem>
          );
        })}
    </StyledSliderContainer>
  );
};

export default Slider;
