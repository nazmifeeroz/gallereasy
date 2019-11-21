import React from 'react'
import styled from 'styled-components'
import 'whatwg-fetch'

const handleSearch = event => {
  console.log('event', event)
  // window.fetch(
  //   `http://api.giphy.com/v1/stickers/search%09?api_key=${process.env.GIPHY_API_KEY}&q=${input}&limit=8`
  // )
}

const SearchBar = () => (
  <div className="row">
    <SearchContainer>
      <SearchInput
        onChange={handleSearch}
        placeholder="Start searching for images!"
      />
    </SearchContainer>
  </div>
)

const SearchContainer = styled.div.attrs(() => ({
  className: 'input-field col m8 s12 offset-m2',
}))``

const SearchInput = styled.input.attrs(() => ({
  type: 'text',
}))`
  font-size: 25px !important;
`

export default SearchBar
