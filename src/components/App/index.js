import React from 'react'
import {Machine, assign} from 'xstate'
import {useMachine} from '@xstate/react'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ImagesList from '@components/ImagesList'
import SearchBar from '@components/SearchBar'
import {Loader, Error} from '@components/partials'

const chunk = (arr, size) =>
  Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

const searchGiphyAPI = ctx =>
  new Promise((resolve, reject) => {
    window
      .fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${ctx.searchInput}&limit=8`
      )
      .then(response => response.json())
      .then(({data}) => resolve(chunk(data, 4)))
      .catch(err => reject(err))
  })

const machineConfig = Machine(
  {
    id: 'app',
    initial: 'ready',
    states: {
      ready: {
        on: {
          SET_SEARCH: {actions: 'setSearchInput'},
          SEARCH: 'searching',
        },
      },
      searching: {
        invoke: {
          src: 'searchGiphyAPI',
          onDone: {
            target: 'success',
            actions: 'setImagesData',
          },
          onError: {
            target: 'error',
            actions: 'setError',
          },
        },
      },
      success: {
        on: {
          SET_SEARCH: {actions: 'setSearchInput'},
          SEARCH: 'searching',
        },
      },
      error: {
        on: {
          SET_SEARCH: {actions: 'setSearchInput'},
          SEARCH: 'searching',
        },
      },
    },
  },
  {
    services: {
      searchGiphyAPI,
    },
    actions: {
      setSearchInput: assign((_ctx, {value}) => ({searchInput: value})),
      setError: assign((_ctx, log) => ({error: log.data.message})),
      setImagesData: assign((_ctx, {data}) => ({imagesData: data})),
    },
  }
)

const App = () => {
  const [current, send] = useMachine(
    machineConfig.withContext({
      imagesData: null,
      searchInput: '',
      error: null,
    })
  )

  const errorMsg = () =>
    current.context.error.includes('NetworkError')
      ? 'You have no internet connection!'
      : 'Please insert your GIPHY API key!'

  return (
    <>
      <Header />
      <SearchBar current={current} send={send} />
      {current.matches('searching') && <Loader size="big" />}
      {current.matches('error') && <Error message={errorMsg()} />}
      {current.matches('success') && (
        <ImagesList imagesData={current.context.imagesData} />
      )}
      <Footer />
    </>
  )
}

export default App
