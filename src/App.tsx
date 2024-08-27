import './App.css'
import Header from "@components/Header";
import {Toaster} from "./components/ui/sonner"
import {Provider} from 'react-redux'
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Outlet} from "react-router-dom";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Header/>
                <Outlet/>
                <Toaster/>
            </PersistGate>
        </Provider>

    )
}

export default App