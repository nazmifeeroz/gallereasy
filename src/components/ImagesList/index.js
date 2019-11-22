import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {Loader} from '@components/partials'

const ImagesList = ({imagesData}) => {
  const [tagged, setTagged] = React.useState([])
  const handleTagged = id => {
    if (tagged.includes(id)) return setTagged(tagged.filter(tag => tag !== id))
    tagged.push(id)
    return setTagged([...tagged])
  }

  return imagesData.length > 0 ? (
    <ImagesContainer>
      {imagesData.map(imagesGroup => (
        <ImagesRow key={`image-${imagesGroup[0].id}`}>
          {imagesGroup.map(imageObj => (
            <ImageCol key={imageObj.id}>
              <ImageThumbnail tagged={tagged.includes(imageObj.id)}>
                <BlurImageLoader src={imageObj.images.fixed_height.url} />
                <FavoriteTag
                  onClick={() => handleTagged(imageObj.id)}
                  tagged={tagged.includes(imageObj.id)}
                >
                  <FavouriteIcon>favorite</FavouriteIcon>
                </FavoriteTag>
              </ImageThumbnail>
            </ImageCol>
          ))}
        </ImagesRow>
      ))}
    </ImagesContainer>
  ) : (
    <div className="center-align">
      <h4>Your search returns nothing!</h4>
    </div>
  )
}

const BlurImageLoader = ({src}) => {
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
        <StyledLoader size="small" />
      ) : (
        <LoadableImage src={loadState.src} loaded={loadState.loaded} />
      )}
    </LoaderWrapper>
  )
}

const StyledLoader = styled(Loader)``

const ImagesContainer = styled.div.attrs(() => ({
  className: 'container',
}))``

const ImagesRow = styled.div.attrs(() => ({
  className: 'row',
}))`
  margin: 0;
`

const ImageCol = styled.div.attrs(() => ({
  className: 'col s6 m3',
}))``

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

const ImageThumbnail = styled.div`
  position: relative;
  width: 160px;
  height: 130px;
  margin: 0 auto;
  ${props =>
    !props.tagged &&
    css`
      :hover a {
        opacity: 0.3;
      }
    `}
`

const FavoriteTag = styled.a.attrs(() => ({}))`
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
  ${props =>
    !props.tagged &&
    css`
      opacity: 0;
      @media only screen and (max-width: 600px) {
        opacity: 0.3;
      }
    `}
`

const FavouriteIcon = styled.i.attrs(() => ({
  className: 'material-icons',
}))`
  font-size: 2rem !important;
  color: red;
`

export default ImagesList
