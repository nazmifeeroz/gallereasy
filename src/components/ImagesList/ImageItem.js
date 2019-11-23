import React, {useEffect, useContext, useState} from 'react'
import styled, {css} from 'styled-components'
import AppContext from '@services/AppContext'
import {ImageLazyLoader} from '@components/partials'

const ImageItem = ({imageObj}) => {
  const {
    current: {
      context: {tagged},
    },
    send,
  } = useContext(AppContext)

  const [loadState, setLoadState] = useState({
    src: imageObj.url,
    loaded: false,
  })

  useEffect(() => {
    const img = new Image()
    img.onload = () => setLoadState({...loadState, loaded: true})
    img.src = loadState.src
    return () => {
      img.onload = () => {}
    }
  }, [])

  const isTagged = tagged.find(t => t.id === imageObj.id)
  const handleToggleTag = () =>
    send(isTagged ? 'DELETE_TAG' : 'ADD_TAG', {
      image: {
        id: imageObj.id,
        url: imageObj.url,
      },
    })

  return (
    <div className="col s6 m3">
      <ImageThumbnail isNotTagged={!isTagged}>
        <ImageLazyLoader loadState={loadState} />
        {loadState.loaded && (
          <FavoriteTag onClick={handleToggleTag} tagged={isTagged}>
            <FavouriteIcon>favorite</FavouriteIcon>
          </FavoriteTag>
        )}
      </ImageThumbnail>
    </div>
  )
}

const ImageThumbnail = styled.div`
  position: relative;
  width: 160px;
  height: 130px;
  margin: 0 auto;
  ${props =>
    props.isNotTagged &&
    css`
      :hover a {
        opacity: 0.3;
      }
    `}
`

const FavoriteTag = styled.a.attrs(() => ({}))`
  cursor: pointer;
  position: absolute;
  bottom: 15px;
  right: 15px;
  ${props =>
    !props.tagged &&
    css`
      opacity: 0;
      @media only screen and (max-width: 600px) {
        opacity: 0.3;
      }
    `}
`

const FavouriteIcon = styled.i.attrs(() => ({
  className: 'material-icons',
}))`
  font-size: 2rem !important;
  color: red;
`

export default ImageItem
