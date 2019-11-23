import chunk from '@utils/chunk'

const search = ctx =>
  new Promise((resolve, reject) => {
    window
      .fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${ctx.searchInput}&limit=8`
      )
      .then(response => response.json())
      .then(({data}) => {
        const formattedData = data.map(d => ({
          id: d.id,
          url: d.images.fixed_height.url,
        }))
        resolve(chunk(formattedData, 4))
      })
      .catch(err => reject(err))
  })

export default () => {}

export {search}
