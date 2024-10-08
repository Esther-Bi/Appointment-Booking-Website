import React from 'react'
import Header from '../components/Header'
import TypeMenu from '../components/TypeMenu'
import TopServices from '../components/TopServices'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <TypeMenu/>
      <TopServices/>
      <Banner/>
    </div>
  )
}

export default Home