import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


export ProtectedRout = () => {
    // 1. Išsitraukiame iš konteksto reikšmingas reikšmes
        const { isAuthenticated, isloading } = useContext(AuthContext);
        //2. Jeigu dar neužkrauta, tai darome loading
        if (isloading) {
            return <div>Kraunama...</div>;
        }

        if (isAuthenticated) {
            // Outlet - reiškia, kad bus rodomi children toliau (pateks į reikalingą Route, nes yra autentifikuotas)
            return <Outlet />; // leidžiame pasiekti vidinį komponentą
        } else {
            // Jeigu neautentifikuotas, tai nukreipiame į prisijungimo puslapį
            return <Navigate to="/login" />; // nukreipiame į prisijungimo puslapį
        }
}