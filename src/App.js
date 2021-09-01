import './App.css';
import {Footer} from "./components/Footer/Footer";
import {HeaderContainer} from './components/Header/HeaderContainer'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter/AppRouter'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <HeaderContainer/>
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
    </div>
  )
}

export default App
