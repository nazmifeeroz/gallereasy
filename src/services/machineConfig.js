import {Machine, assign} from 'xstate'
import {search as searchGiphyAPI} from '@services/giphy'

const machineConfig = Machine(
  {
    id: 'app',
    initial: 'searchTab',
    states: {
      searchTab: {
        id: 'searchTab',
        initial: 'ready',
        on: {
          SELECT_FAVORITES: 'favoritesTab',
        },
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
              ADD_TAG: {actions: ['addTag', 'calcNumOfTags']},
              DELETE_TAG: {actions: ['deleteTag', 'calcNumOfTags']},
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
      favoritesTab: {
        id: 'favoritesTab',
        initial: 'ready',
        on: {
          SELECT_SEARCH: 'searchTab',
        },
        states: {
          ready: {},
        },
      },
    },
  },
  {
    services: {
      searchGiphyAPI,
    },
    actions: {
      calcNumOfTags: assign(ctx => ({
        numOfTags: ctx.tagged.length > 0 && ` (${ctx.tagged.length})`,
      })),
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
