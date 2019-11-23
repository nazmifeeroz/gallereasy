# Gallereasy (2359 Media)

## Requirements

- [x] User should be able to search by keyword for images
- [x] Images should be shown in a grid with consistent width and height
- [x] Default maximum of 8 images shown per search
- [x] The user shoud be abel to add and remove a tag from images to mark and unmark them as a favourite image
- [x] different app states should ideally be accounted for with UI feedback to the user
- [x] Add a "Fetch More" button displayed below the results

## Built with

- [Parcel JS](https://parceljs.org)
- [MaterializeCSS](https://materializecss.com)
- [XState](https://xstate.js.org/)
- [styled-components](https://www.styled-components.com/)

## Features

- Lazy loading when image is not loaded
- On mobile, favorite button can be seen less transparent (On desktop, less transparent on hover)
- On Favorites page, favorite gif can be un-favorited
- On error (Network error or Giphy API not found), shows error message

## Code Wise

- Project is built from scratch with ParcelJS
- Components are imported with `@<FOLDER>` relative path for easier imports. See `.babelrc`
- App wrapped with context provider to provide data on most times (no deep props drilling)
- States and logic are handled by a single state machine

## To run app

- Create a  `.env` file and copy variable from `.env.sample`. Paste your Giphy api key.
- Run `yarn && yarn start`

---
Built with :heart: by Nazmi
