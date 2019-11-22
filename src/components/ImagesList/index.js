import React from 'react'
import styled, {css} from 'styled-components'
// import mockData from './mock-data.json'

const ImagesList = ({imagesData}) => {
  const [tagged, setTagged] = React.useState([])
  const handleTagged = id => {
    if (tagged.includes(id)) return setTagged(tagged.filter(tag => tag !== id))
    tagged.push(id)
    return setTagged([...tagged])
  }

  return (
    imagesData && (
      <ImagesContainer>
        {imagesData.map(imagesGroup => (
          <ImagesRow key={`image-${imagesGroup[0].id}`}>
            {imagesGroup.map((imageObj, ig) => (
              <ImageCol key={imageObj.id}>
                <ImageThumbnail tagged={tagged.includes(imageObj.id)}>
                  <StyledImg
                    alt={`giphy-${ig}`}
                    src={imageObj.images.fixed_height.url}
                  />
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
    )
  )
}
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

const StyledImg = styled.img`
  width: 150px;
  height: 120px;
  object-fit: cover;
  margin: 5px;
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
