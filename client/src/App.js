import './App.css';
import {Route,Routes} from "react-router-dom"
import About from './pages/About';
import Contact from './pages/Contact';
import HomePage from './pages/HomePage';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import SignUp from './pages/SignUp';

function App() {
  return(
    <>
      <Routes>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/policy' element={<Policy/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/*' element={<PageNotFound/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
    </>
  );
}

export default App;
