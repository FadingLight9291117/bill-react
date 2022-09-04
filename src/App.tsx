import Layout from './components/layout'
import {Routes, Route} from 'react-router-dom'
import {useEffect} from "react";
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Chat from './components/chat'
import {MdEditor} from './components/editor'
import NotFound from './pages/NotFound'
import {Bill, BillContext} from "./store";
import './App.css'

function App() {
    const billStore = new Bill()
    const now = new Date()

    useEffect(() => {
        billStore.fetch(now.getFullYear(), now.getMonth() + 1)
            .then()
            .catch(console.dir)
    }, [])

    return (
        <div className="App">
            <BillContext.Provider value={billStore}>
                <Layout home>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/home"} element={<Home/>}/>
                        <Route path={"/chat"} element={<Chat/>}/>
                        <Route path={"/editor"} element={<MdEditor/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/*'} element={<NotFound/>}/>
                    </Routes>
                </Layout>
            </BillContext.Provider>
        </div>
    )
}

export default App
