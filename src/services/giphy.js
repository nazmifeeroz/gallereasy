const chunk = (arr, size) =>
  Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

const search = ctx =>
  new Promise((resolve, reject) => {
    window
      .fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${ctx.searchInput}&limit=8`
      )
      .then(response => response.json())
      .then(({data}) => resolve(chunk(data, 4)))
      .catch(err => reject(err))
  })

export default () => {}

export {search}
