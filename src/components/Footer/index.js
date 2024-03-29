import React from 'react'
import styled from 'styled-components'

const Footer = () => (
  <StyledFooter>
    Nazmi Giphy App
    <a className="grey-text text-darken-1 right" href="#!">
      Built with Love
    </a>
  </StyledFooter>
)

const StyledFooter = styled.footer.attrs(() => ({
  className: 'page-footer grey lighten-3 grey-text text-darken-1',
}))`
  width: 100%;
  padding: 10px 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
`
export default Footer
