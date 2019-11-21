import React, {useState} from 'react'
import Footer from '@components/Footer'
import Header from '@components/Header'
import ImagesList from '@components/ImagesList'
import SearchBar from '@components/SearchBar'

const App = () => {
  const [imagesData, setImagesData] = useState(null)
  return (
    <>
      <Header />
      <SearchBar setImagesData={setImagesData} />
      <ImagesList imagesData={imagesData} />
      <Footer />
    </>
  )
}

export default App
