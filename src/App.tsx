import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PListagemCliente from './pages/PListagem/PListagemCliente/PListagemCliente'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PListagemCliente/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
