import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Auth/Login'
import AppLayout from './pages/Layouts/AppLayout'
import Categories from './pages/Categories/Categories'
import Product from './pages/Product/Product'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace/>}/>
          <Route path='/login' element={<Login/>}/>
          
          {/* Các trang nằm trong khung quản trị AppLayout */}
          <Route element={<AppLayout/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Product />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App