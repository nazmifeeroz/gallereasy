import React from 'react'
import styled, {css} from 'styled-components'

const ImageLazyLoader = ({loadState}) => {
  return <LoadableImage src={loadState.src} loaded={loadState.loaded} />
}

const LoadableImage = styled.div`
  width: 150px;
  height: 120px;
  transition: opacity ease-in 1000ms;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: 50% 50%;
  background-origin: border-box;

  ${props =>
    !props.loaded &&
    css`
      width: 150px;
      height: 120px;
      position: relative;
      background-color: #e2e2e2;
      overflow: hidden;
      filter: blur(2px);

      :after {
        display: block;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        animation: loading 1.5s infinite;
        @keyframes loading {
          100% {
            transform: translateX(100%);
          }
        }
      }
    `}
`

export default ImageLazyLoader
