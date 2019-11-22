import React, {useEffect} from 'react'
import styled from 'styled-components'
import 'whatwg-fetch'
import useDebounce from '@utils/useDebounce'

const SearchBar = ({current, send}) => {
  const debouncedSearch = useDebounce(current.context.searchInput, 200)

  useEffect(() => {
    if (debouncedSearch) send('SEARCH')
  }, [debouncedSearch])

  console.log('current.context', current)
  return (
    <div className="row">
      <SearchContainer>
        <SearchInput
          onChange={e => send('SET_SEARCH', {value: e.target.value})}
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
