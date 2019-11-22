import React from 'react'
import {useMachine} from '@xstate/react'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ImagesList from '@components/ImagesList'
import SearchBar from '@components/SearchBar'
import {Loader, Error} from '@components/partials'
import machineConfig from '@services/machineConfig'

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
    <>
      <Header />
      <SearchBar current={current} send={send} />
      {current.matches('searching') && <Loader size="big" />}
      {current.matches('error') && <Error message={current.context.error} />}
      {current.matches('success') && (
        <ImagesList current={current} send={send} />
      )}
      <Footer />
    </>
  )
}

export default App
