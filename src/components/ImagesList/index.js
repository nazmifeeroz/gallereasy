import React, {useContext} from 'react'
import styled from 'styled-components'
import AppContext from '@services/AppContext'
import ImageItem from './ImageItem'

const ImagesList = ({imagesData}) => {
  const {current} = useContext(AppContext)
  const onFavoritesPage = current.matches('favoritesTab')

  return imagesData.length > 0 ? (
    <div className="container">
      {imagesData.map(imagesGroup => (
        <ImagesRow key={`image-${imagesGroup[0].id}`}>
          {imagesGroup.map(imageObj => (
            <ImageItem imageObj={imageObj} key={imageObj.id} />
          ))}
        </ImagesRow>
      ))}
    </div>
  ) : (
    <div className="center-align">
      <h5>
        {onFavoritesPage
          ? 'You have no favorites!'
          : 'Your search returns nothing!'}
      </h5>
    </div>
  )
}

const ImagesRow = styled.div.attrs(() => ({
  className: 'row',
}))`
  margin: 0;
`

export default ImagesList
