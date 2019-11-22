import React, {useContext} from 'react'
import styled, {css} from 'styled-components'
import AppContext from '@services/AppContext'

const Header = () => {
  const {current, send} = useContext(AppContext)
  return (
    <HeaderContainer>
      <Brand>
        Galler
        <span>easy</span>
      </Brand>
      <NavItemsContainer>
        <NavItem
          active={current.matches('searchTab')}
          onClick={() => send('SELECT_SEARCH')}
        >
          Search
        </NavItem>
        <NavItem
          active={current.matches('favoritesTab')}
          onClick={() => send('SELECT_FAVORITES')}
        >
          Favourites
          {current.context.numOfTags}
        </NavItem>
      </NavItemsContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #e0e0e0;
`

const Brand = styled.h5`
  margin: 15px;
  span {
    font-weight: bold;
  }
`

const NavItemsContainer = styled.div`
  display: flex;
  align-items: center;
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: #9e9e9e;
  margin: 10px 0;
  padding: 0 15px;
`

const NavItem = styled.a`
  ${props =>
    props.active &&
    css`
      font-weight: bold;
    `}
  align-items: center;
  color: black;
  cursor: pointer;
  display: flex;
  height: 100%;
  margin: 0 10px;
  padding: 5px;
`

export default Header
