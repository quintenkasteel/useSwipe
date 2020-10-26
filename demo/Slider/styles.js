import styled from 'styled-components';

export const StyledSliderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  transition: all ease-in-out 50ms;
  transform: translateX(${props => props.translate && `${props.translate * props.velocity || 1}%`});
` 

export const StyledSliderItem = styled.div`
  background: ${props => props.background};
  min-height: 400px;
  /* flex: 1 0 100%; */
  display: flex;
  min-width: 100%;
` 