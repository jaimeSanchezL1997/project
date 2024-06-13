import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Info from "./components/Info"
import InfoExtend from "./components/InfoExtend"

function App() {
    return(
        asjdjshfsdfhkskfdsfsd
        <Router>
            <Routes>
                <Route exact path="/">
                    <Route exact path='' element={<> <Info/> </>} />
                </Route>
            </Routes>
        </Router>
    );
}
export default App
