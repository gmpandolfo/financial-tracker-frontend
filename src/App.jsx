import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import MenuPublico from "./componentes/MenuPublico";
import MenuPrivado from "./componentes/MenuPrivado";
import Home from './componentes/telas/Home'
import Categoria from "./componentes/telas/categoria/Categoria";
import Transacao from "./componentes/telas/transacao/Transacao";
import Login from "./componentes/telas/login/Login"

const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "login",
        element : <Login/>
      }
    ]
  },
  {
    path : "/privado",
    element : <MenuPrivado/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "categorias",
        element : <Categoria/>
      }
      ,
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
