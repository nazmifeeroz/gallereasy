import React from 'react'
import styled from 'styled-components'

const Footer = () => (
  <StyledFooter>
    Gallereasy POC web app
    <a className="grey-text text-darken-1 right" href="#!">
      2359 Media
    </a>
  </StyledFooter>
)

const StyledFooter = styled.footer.attrs(() => ({
  className: 'page-footer grey lighten-3 grey-text text-darken-1',
}))`
  width: 100%;
  padding: 10px 50px;
  @media only screen and (min-width: 600px) {
    position: absolute;
    bottom: 0;
  }
`
export default Footer
