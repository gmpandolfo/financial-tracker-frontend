import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './componentes/Menu'
import Home from './componentes/telas/Home'
import Categoria from "./componentes/telas/categoria/Categoria";
import Transacao from "./componentes/telas/transacao/Transacao";

const router = createBrowserRouter([
  {
    path : "/",
    element : <Menu/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "Categorias",
        element : <Categoria/>
      },
      {
        path : "transacoes",
        element : <Transacao/>
      }
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
