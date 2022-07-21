import { Routes, Route } from 'react-router-dom';
import AdminNavigation from './componentes/AdminNavigation';
import AdministracaoPratos from './paginas/AdministracaoPratos';
import FormularioPratos from './paginas/AdministracaoPratos/FormularioPratos';
import AdministracaoResutaurantes from './paginas/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/AdministracaoRestaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<AdminNavigation />}>
        <Route path="restaurantes" element={<AdministracaoResutaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPratos />} />
        <Route path="pratos/:id" element={<FormularioPratos />} />
      </Route>

    </Routes>
  );
}

export default App;
