import Layout from './components/layout'
import {Routes, Route} from 'react-router-dom'
import {useEffect} from "react";
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound'
import {Bill, BillContext} from "./store";
import './App.css'
import Record from "./pages/Record/Record";

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
                        <Route path={"/record"} element={<Record/>}/>
                        <Route path={"/*"} element={<NotFound/>}/>
                    </Routes>
                </Layout>
            </BillContext.Provider>
        </div>
    )
}

export default App
