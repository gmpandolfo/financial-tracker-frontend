import { useContext } from "react";
import CategoriaContext from "./CategoriaContext";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(CategoriaContext);

    return (
        <Dialogo id="modalEdicao" titulo="Categoria"
            idform="formulario" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            {/* <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                placeholder="" requerido="false"
                name="codigo" value={objeto.id_categoria} onchange={handleChange}
                msgvalido="" msginvalido=""
                readonly={true} /> */}
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                placeholder="Informe o nome" requerido="true"
                name="nome" value={objeto.nome} onchange={handleChange}
                msgvalido="Campo nome OK" msginvalido="Informe o nome"
                readonly={false} />
        </Dialogo>
    )
}

export default Form;