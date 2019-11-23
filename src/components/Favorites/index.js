import React, {useContext} from 'react'
import ImagesList from '@components/ImagesList'
import AppContext from '@services/AppContext'
import chunk from '@utils/chunk'

const FavoritesPage = () => {
  const {current} = useContext(AppContext)
  const chunkedTags = chunk(current.context.tagged, 4)

  return (
    <div className="container">
      <ImagesList imagesData={chunkedTags} />
    </div>
  )
}

export default FavoritesPage
