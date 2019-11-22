import React from 'react'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ImagesList from '@components/ImagesList'
import SearchBar from '@components/SearchBar'
import {Machine, assign} from 'xstate'
import {useMachine} from '@xstate/react'

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
            target: 'ready',
          },
          onError: {
            target: 'error',
            actions: 'setError',
          },
        },
      },
      error: {
        on: {
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

  return (
    <>
      <Header />
      <SearchBar current={current} send={send} />
      {current.matches('searching') && <Loader />}
      {current.matches('error') && <Error message={current.context.error} />}
      {/* <ImagesList imagesData={imagesData} /> */}
      <Footer />
    </>
  )
}

const Error = ({message}) => (
  <div className="center-align">
    <p>
      Error:
      {message.includes('NetworkError')
        ? ' Network Error!'
        : ' Giphy API KEY is invalid!'}
    </p>
  </div>
)

const Loader = () => (
  <div className="center-align">
    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  </div>
)

export default App
