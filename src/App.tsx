import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Categories from "./pages/Categories.tsx";
import {LanguageProvider} from "./context/LanguageContext.tsx";

function App() {

  return (
    <>
        <LanguageProvider>
            <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path={"/categories"} element={<Categories />} />
                    </Route>
            </Routes>
        </LanguageProvider>
    </>
  )
}

export default App
