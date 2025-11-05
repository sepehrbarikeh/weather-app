import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react'


function App() {

  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  const navigation = useNavigate()

  useEffect(()=>{
    navigation('/login')
  },[])

  return (
    <>
      <Routes >
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
