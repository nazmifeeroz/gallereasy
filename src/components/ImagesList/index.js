import React from 'react'
import styled, {css} from 'styled-components'
import {ImageLoader} from '@components/partials'

const ImagesList = ({current, send}) => {
  const {imagesData, tagged} = current.context

  return imagesData.length > 0 ? (
    <div className="container">
      {imagesData.map(imagesGroup => (
        <ImagesRow key={`image-${imagesGroup[0].id}`}>
          {imagesGroup.map(imageObj => (
            <div className="col s6 m3" key={imageObj.id}>
              <ImageThumbnail tagged={tagged.includes(imageObj.id)}>
                <ImageLoader src={imageObj.images.fixed_height.url} />
                <FavoriteTag
                  onClick={() =>
                    send(
                      tagged.includes(imageObj.id) ? 'DELETE_TAG' : 'ADD_TAG',
                      {id: imageObj.id}
                    )}
                  tagged={tagged.includes(imageObj.id)}
                >
                  <FavouriteIcon>favorite</FavouriteIcon>
                </FavoriteTag>
              </ImageThumbnail>
            </div>
          ))}
        </ImagesRow>
      ))}
    </div>
  ) : (
    <div className="center-align">
      <h4>Your search returns nothing!</h4>
    </div>
  )
}

const ImagesRow = styled.div.attrs(() => ({
  className: 'row',
}))`
  margin: 0;
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
