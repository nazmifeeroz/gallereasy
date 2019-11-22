import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Loader from './Loader'

const ImageLoader = ({src}) => {
  const [loadState, setLoadState] = useState({
    src,
    loaded: false,
  })

  useEffect(() => {
    const img = new Image()
    img.onload = () => setLoadState({...loadState, loaded: true})
    img.src = src
    return () => {
      img.onload = () => {}
    }
  }, [])

  return (
    <LoaderWrapper>
      {!loadState.loaded ? (
        <Loader size="small" />
      ) : (
        <LoadableImage src={loadState.src} loaded={loadState.loaded} />
      )}
    </LoaderWrapper>
  )
}

const LoadableImage = styled.div`
  width: 150px;
  height: 120px;
  transition: opacity ease-in 1000ms;
  filter: ${props => (props.loaded ? 'unset' : 'blur(5px)')};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: 50% 50%;
  background-origin: border-box;
`

const LoaderWrapper = styled.div`
  width: 150px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ImageLoader
