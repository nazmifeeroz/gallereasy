import React from 'react'
import {useMachine} from '@xstate/react'
import AppContext from '@services/AppContext'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ImagesList from '@components/ImagesList'
import SearchBar from '@components/SearchBar'
import machineConfig from '@services/machineConfig'
import {Loader, Error} from '@components/partials'

const App = () => {
  const [current, send] = useMachine(
    machineConfig.withContext({
      error: null,
      imagesData: null,
      numOfTags: null,
      searchInput: '',
      tagged: [],
    })
  )

  return (
    <AppContext.Provider value={{current, send}}>
      <Header />
      {current.matches('searchTab') && <SearchBar />}
      {current.matches('searchTab.searching') && <Loader size="big" />}
      {current.matches('searchTab.error') && (
        <Error message={current.context.error} />
      )}
      {current.matches('searchTab.success') && <ImagesList />}
      {current.matches('favoritesTab.ready') && <div>favorites tab</div>}
      <Footer />
    </AppContext.Provider>
  )
}

export default App
