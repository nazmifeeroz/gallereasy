import React, {useContext} from 'react'
import styled from 'styled-components'
import AppContext from '@services/AppContext'
import {Loader} from '@components/partials'

const FetchMoreButton = () => {
  const {current, send} = useContext(AppContext)
  const handleFetchMore = () => send('FETCH_MORE')
  const isFetchingMore = current.matches('searchTab.fetchMore')

  return (
    <StyledContainer>
      {isFetchingMore ? (
        <Loader size="large" />
      ) : (
        <button
          type="button"
          onClick={handleFetchMore}
          className="waves-effect waves-light btn btn-large"
        >
          Fetch More
        </button>
      )}
    </StyledContainer>
  )
}

const StyledContainer = styled.div.attrs(() => ({
  className: 'center-align',
}))`
  margin-top: 20px;
`

export default FetchMoreButton
