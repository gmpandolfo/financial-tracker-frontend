import { useContext } from "react";
import CategoriaContext from "./CategoriaContext";
import Alerta from "../../comuns/Alerta";

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } =
        useContext(CategoriaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Categorias</h1>
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
                                <th scope="col">Nome</th>
                                <th scope="col" style={{
                                    textAlign: 'center'
                                }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(objeto => (
                                    <tr key={objeto.codigo}>
                                        
                                        <th scope="row">{objeto.id_categoria}</th>
                                        <td>{objeto.nome}</td>
                                        <td align="center">
                                            <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#modalEdicao"
                                            onClick={ () =>  editarObjeto(objeto.id_categoria)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-danger" title="Remover"
                                                onClick={() => { remover(objeto.id_categoria) }}>
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