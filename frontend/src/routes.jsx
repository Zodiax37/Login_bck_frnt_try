// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";



import Login from './components/FormLogin';
import Home from './components/Home'; // página de inicio (puedes crearla)

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            
        <Route path="/" element={<Login />} />
        <Route path = "/home" element = {< Home />} /> 
        
        </>

    )
);