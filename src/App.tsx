import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import { Restaurantes as AdministracaoRestaurante } from './paginas/Administracao/Restaurantes';
import { FormularioRestaurante } from './paginas/Administracao/FormularioRestaurante';
import { NavBarAdmin } from './paginas/Administracao/NavBarAdmin';
import { Pratos as AdministracaoPratos } from './paginas/Administracao/Pratos';
import { FormularioPrato } from './paginas/Administracao/FormularioPratos';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurantes" element={<VitrineRestaurantes />} />
            <Route path='/admin' element={<NavBarAdmin />} >
                <Route path="restaurantes" element={<AdministracaoRestaurante />} />
                <Route path='restaurantes/novo' element={<FormularioRestaurante />} />
                <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
                <Route path='pratos' element={<AdministracaoPratos />} />
                <Route path='pratos/novo' element={<FormularioPrato />} />
                <Route path='prato/:id' element={<FormularioPrato />} />
            </Route>
        </Routes>
    );
}