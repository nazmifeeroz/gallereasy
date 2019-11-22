import {Machine, assign} from 'xstate'
import {search as searchGiphyAPI} from '@services/giphy'

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
          ADD_TAG: {actions: 'addTag'},
          DELETE_TAG: {actions: 'deleteTag'},
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
      setError: assign((_ctx, log) => ({
        error: log.data.message.includes('NetworkError')
          ? 'You have no internet connection!'
          : 'Please insert your GIPHY API key!',
      })),
      setImagesData: assign((_ctx, {data}) => ({imagesData: data})),
      addTag: assign(({tagged}, e) => {
        tagged.push(e.id)
        return {tagged}
      }),
      deleteTag: assign((ctx, e) => ({
        tagged: ctx.tagged.filter(t => t !== e.id),
      })),
    },
  }
)

export default machineConfig
