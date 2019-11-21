import React from 'react'
import styled from 'styled-components'

const Header = () => (
  <HeaderContainer>
    <Brand>
      Galler
      <span>easy</span>
    </Brand>
    <NavItemsContainer>
      <NavItem>Search</NavItem>
      <NavItem>Favourites</NavItem>
    </NavItemsContainer>
  </HeaderContainer>
)

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

const NavItem = styled.h6`
  margin: 0 10px;
`

export default Header
