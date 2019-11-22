import React from 'react'
import {useMachine} from '@xstate/react'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ImagesList from '@components/ImagesList'
import SearchBar from '@components/SearchBar'
import {Loader, Error} from '@components/partials'
import machineConfig from '@services/machineConfig'
import AppContext from '@services/AppContext'

const App = () => {
  const [current, send] = useMachine(
    machineConfig.withContext({
      imagesData: null,
      searchInput: '',
      error: null,
      tagged: [],
    })
  )

  return (
    <AppContext.Provider value={{current, send}}>
      <Header />
      <SearchBar />
      {current.matches('searching') && <Loader size="big" />}
      {current.matches('error') && <Error message={current.context.error} />}
      {current.matches('success') && <ImagesList />}
      <Footer />
    </AppContext.Provider>
  )
}

export default App
