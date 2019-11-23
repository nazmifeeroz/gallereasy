import React from 'react'
import {useMachine} from '@xstate/react'
import styled from 'styled-components'
import AppContext from '@services/AppContext'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ImagesList from '@components/ImagesList'
import machineConfig from '@services/machineConfig'
import {Loader, Error} from '@components/partials'
import FavoritesPage from '@components/Favorites'

const App = () => {
  const [current, send] = useMachine(
    machineConfig.withContext({
      error: null,
      imagesData: null,
      numOfTags: null,
      pagination: {
        offset: 0,
      },
      searchInput: '',
      tagged: [],
    })
  )

  return (
    <AppContext.Provider value={{current, send}}>
      <Header />
      <StyledBody>
        {current.matches('searchTab') && <SearchPage current={current} />}
        {current.matches('favoritesTab.ready') && <FavoritesPage />}
      </StyledBody>
      <Footer />
    </AppContext.Provider>
  )
}

const SearchPage = ({current}) => (
  <StyledContainer>
    {current.matches('searchTab.searching') && <Loader size="big" />}
    {current.matches('searchTab.error') && (
      <Error message={current.context.error} />
    )}
    {current.context.imagesData &&
      (current.matches('searchTab.fetchMore') ||
        current.matches('searchTab.success')) && (
        <ImagesList imagesData={current.context.imagesData} />
      )}
  </StyledContainer>
)

const StyledContainer = styled.div`
  margin-top: 110px;
`

const StyledBody = styled.div`
  padding: 60px 0;
`

export default App
