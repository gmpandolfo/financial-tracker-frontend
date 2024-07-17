import { useContext } from "react";
import TransacaoContext from "./TransacaoContext";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import CampoCheckbox from "../../comuns/CampoCheckbox"; // Componente de checkbox personalizado

function Form() {
    const { objeto, handleChange, acaoCadastrar, alerta, listaCategorias } = useContext(TransacaoContext);

    // Função para lidar com a mudança de checkboxes de categorias
    const handleCategoriaChange = (categoria, isChecked) => {
        let categoriasSelecionadas = objeto.categorias || []; // Inicializa como array vazio se for nulo
        if (isChecked) {
            // Adiciona categoria se estiver marcada
            categoriasSelecionadas = [...categoriasSelecionadas, categoria];
        } else {
            // Remove categoria se estiver desmarcada
            categoriasSelecionadas = categoriasSelecionadas.filter(cat => cat !== categoria);
        }
        handleChange({
            target: {
                name: 'categorias',
                value: categoriasSelecionadas
            }
        });
    }

    return (
        <Dialogo id="modalEdicao" titulo="Transacao" idform="formulario" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />

            <CampoEntrada id="txtEspecificacao" label="Especificação" tipo="text"
                placeholder="Informe a especificacao" requerido="true"
                name="especificacao" value={objeto.especificacao} onchange={handleChange}
                msgvalido="Campo especificacao OK" msginvalido="Informe o especificacao"
                readonly={false} />
            <CampoEntrada id="txtValor" label="Valor" tipo="number"
                placeholder="Informe o valor" requerido="true"
                name="valor" value={objeto.valor}
                onchange={handleChange}
                msgvalido="Campo valor OK" msginvalido="Informe o valor"
                readonly={false} />
            <CampoEntrada id="txtDataTransacao" label="Data da Transação" tipo="date"
                placeholder="Informe a data de cadastro" requerido="true"
                name="data_transacao" value={objeto.data_transacao}
                onchange={handleChange}
                msgvalido="Campo data da transação OK" msginvalido="Informe a data da transação"
                readonly={false} />

            <label htmlFor="Categorias" className="form-label">Categorias</label>
            <div className="campo-checkboxes">
                {listaCategorias.map((cat) => (
                    <CampoCheckbox
                        key={cat.id_categoria}
                        label={cat.nome}
                        checked={objeto.categorias ? objeto.categorias.includes(cat.nome) : false}
                        onChange={(isChecked) => handleCategoriaChange(cat.nome, isChecked)}
                    />
                ))}
            </div>

        </Dialogo>
    )
}

export default Form;