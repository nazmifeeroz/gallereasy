import React from 'react'
import styled from 'styled-components'
// import mockData from './mock-data.json'

const ImagesList = ({imagesData}) => {
  return (
    <ImagesContainer>
      {imagesData &&
        imagesData.data.map((data, i) => (
          <StyledImg
            alt={`giphy-${i}`}
            key={data.id}
            src={data.images.fixed_height.url}
          />
        ))}
    </ImagesContainer>
  )
}
const ImagesContainer = styled.div.attrs(() => ({
  className: 'container',
}))`
  text-align: center;
`

const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 10px;
`

export default ImagesList
