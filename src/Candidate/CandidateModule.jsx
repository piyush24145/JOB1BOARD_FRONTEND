import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function CandidateModule() {
  return (
  <>
 <Navbar/>
  <Outlet/>
  <Footer/>
  </>
  )
}

export default CandidateModule
