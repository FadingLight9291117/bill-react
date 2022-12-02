import Layout from './components/layout'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound'
import { Bill, BillContext } from "./store";
import './App.css'
import Record from "./pages/Record/Record";

function App() {
    const billStore = new Bill()

    return (
        <div className="App">
            <BillContext.Provider value={billStore}>
                <Layout home>
                    <Routes>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/home"} element={<Home />} />
                        <Route path={"/record"} element={<Record />} />
                        <Route path={"/*"} element={<NotFound />} />
                    </Routes>
                </Layout>
            </BillContext.Provider>
        </div>
    )
}

export default App
