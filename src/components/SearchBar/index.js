import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import 'whatwg-fetch'
import useDebounce from '@utils/useDebounce'

const chunk = (arr, size) =>
  Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

const handleSearch = (searchInput, setImagesData) => {
  window
    .fetch(
      `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchInput}&limit=8`
    )
    .then(response => response.json())
    .then(({data}) => setImagesData(chunk(data, 4)))
}

const SearchBar = ({setImagesData}) => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    if (debouncedSearch) handleSearch(search, setImagesData)
  }, [debouncedSearch])

  return (
    <div className="row">
      <SearchContainer>
        <SearchInput
          onChange={e => setSearch(e.target.value)}
          placeholder="Start searching for images!"
          autoFocus
        />
      </SearchContainer>
    </div>
  )
}

const SearchContainer = styled.div.attrs(() => ({
  className: 'input-field col m8 s12 offset-m2',
}))``

const SearchInput = styled.input.attrs(() => ({
  type: 'text',
}))`
  font-size: 25px !important;
`

export default SearchBar
