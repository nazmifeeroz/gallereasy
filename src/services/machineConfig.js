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
              SEARCH: {
                target: 'searching',
                actions: 'resetOffset',
              },
              FETCH_MORE: {target: 'fetchMore', actions: 'updateOffset'},
            },
          },
          error: {
            on: {
              SET_SEARCH: {actions: 'setSearchInput'},
              SEARCH: 'searching',
            },
          },
          fetchMore: {
            invoke: {
              src: 'searchGiphyAPI',
              onDone: {
                target: 'success',
                actions: 'updateImagesData',
              },
            },
          },
        },
      },
      favoritesTab: {
        id: 'favoritesTab',
        initial: 'ready',
        on: {
          SELECT_SEARCH: 'searchTab.success',
        },
        states: {
          ready: {
            on: {
              DELETE_TAG: {actions: ['deleteTag', 'calcNumOfTags']},
            },
          },
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
      setImagesData: assign((_ctx, {data: {data, pagination}}) => ({
        imagesData: data,
        pagination,
      })),
      addTag: assign(({tagged}, e) => {
        tagged.push(e.image)
        return {tagged}
      }),
      deleteTag: assign((ctx, e) => ({
        tagged: ctx.tagged.filter(t => t.id !== e.image.id),
      })),
      resetOffset: assign(ctx => ({
        pagination: {...ctx.pagination, offset: 0},
      })),
      updateOffset: assign(ctx => ({
        pagination: {...ctx.pagination, offset: ctx.imagesData.length + 1},
      })),
      updateImagesData: assign((ctx, {data: {data, pagination}}) => ({
        imagesData: [...ctx.imagesData, ...data],
        pagination,
      })),
    },
  }
)

export default machineConfig
