import React, {useContext} from 'react'
import styled from 'styled-components'
import AppContext from '@services/AppContext'
import chunk from '@utils/chunk'
import ImageItem from './ImageItem'

const ImagesList = ({imagesData}) => {
  const {current} = useContext(AppContext)
  const onFavoritesPage = current.matches('favoritesTab')
  const formattedImagesData = imagesData.map(img => ({
    id: img.id,
    url: (img.images && img.images.fixed_height.url) || img.url,
  }))
  const chunkedData = chunk(formattedImagesData, 4)

  return chunkedData.length > 0 ? (
    <div className="container">
      {chunkedData.map(imagesGroup => (
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
