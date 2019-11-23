import React, {useContext} from 'react'
import styled from 'styled-components'
import ImagesList from '@components/ImagesList'
import AppContext from '@services/AppContext'

const FavoritesPage = () => {
  const {current} = useContext(AppContext)

  return (
    <StyledContainer>
      {current.context.tagged && (
        <ImagesList imagesData={current.context.tagged} />
      )}
    </StyledContainer>
  )
}

const StyledContainer = styled.div.attrs(() => ({
  className: 'container',
}))`
  margin-top: 15px;
`

export default FavoritesPage
