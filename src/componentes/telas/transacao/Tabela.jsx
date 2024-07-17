import { useContext } from "react";
import TransacaoContext from "./TransacaoContext";
import Alerta from "../../comuns/Alerta";

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } =
        useContext(TransacaoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Transações</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#modalEdicao"
            onClick={ () =>  novoObjeto()}>
                Nova <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 &&
                <h1>Nenhum registro encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Código</th> 
                                <th scope="col">Especificação</th>
                                <th scope="col">Valor (R$)</th>
                                <th scope="col">Data</th>
                                <th scope="col">Categorias</th>
                                <th scope="col" style={{
                                    textAlign: 'center'
                                }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(objeto => (
                                    <tr key={objeto.id_transacao}>
                                        <th scope="row">{objeto.id_transacao}</th>
                                        <td>{objeto.especificacao}</td>
                                        <td>{objeto.valor}</td>
                                        <td>{objeto.data_transacao}</td>

                                        <td>{objeto.categorias.join(", ")}</td>


                                        <td align="center">
                                            <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#modalEdicao"
                                            onClick={ () =>  editarObjeto(objeto.id_transacao)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-danger" title="Remover"
                                                onClick={() => { remover(objeto.id_transacao) }}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )

}

export default Tabela;