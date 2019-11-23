import React, {useContext} from 'react'
import styled from 'styled-components'
import ImagesList from '@components/ImagesList'
import AppContext from '@services/AppContext'
import chunk from '@utils/chunk'

const FavoritesPage = () => {
  const {current} = useContext(AppContext)
  const chunkedTags = chunk(current.context.tagged, 4)

  return (
    <StyledContainer>
      <ImagesList imagesData={chunkedTags} />
    </StyledContainer>
  )
}

const StyledContainer = styled.div.attrs(() => ({
  className: 'container',
}))`
  margin-top: 15px;
`

export default FavoritesPage
