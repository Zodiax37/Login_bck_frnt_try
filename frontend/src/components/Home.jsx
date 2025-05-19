// src/components/Home.jsx
import React from 'react';
import { BodyHome } from "./BodyHome.jsx"

function Home() {
    return (
        <div className="container mt-5">
            <h1>Bienvenido Bienvenida</h1>
            <p>Has iniciado sesión correctamente.</p>
            <BodyHome />
        </div>
    );
}

export default Home;
