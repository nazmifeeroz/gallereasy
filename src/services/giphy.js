import 'whatwg-fetch'

const search = ctx =>
  new Promise((resolve, reject) => {
    window
      .fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${ctx.searchInput}&limit=8&offset=${ctx.pagination.offset}`
      )
      .then(response => response.json())
      .then(({data, pagination}) => resolve({data, pagination}))
      .catch(err => reject(err))
  })

export default () => {}

export {search}
