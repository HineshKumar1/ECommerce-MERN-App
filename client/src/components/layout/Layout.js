import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout(porps) {
  return (
    <div>
        <Header></Header>
        <h1>Layout</h1>
        <main style={{minHeight:"80vh"}}>
        {porps.children}
        </main>
       
        <Footer></Footer>
    </div>
  )
}

export default Layout