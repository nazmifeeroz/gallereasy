import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import 'whatwg-fetch'
import useDebounce from '@utils/useDebounce'
import AppContext from '@services/AppContext'

const SearchBar = () => {
  const {current, send} = useContext(AppContext)
  const debouncedSearch = useDebounce(current.context.searchInput, 200)

  useEffect(() => {
    if (debouncedSearch) send('SEARCH')
  }, [debouncedSearch])

  return (
    <div className="row">
      <SearchContainer>
        <SearchInput
          value={current.context.searchInput}
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
