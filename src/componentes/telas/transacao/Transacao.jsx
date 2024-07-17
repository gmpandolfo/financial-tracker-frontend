import { useState, useEffect } from "react";
import TransacaoContext from "./TransacaoContext";
import { getCategoriasAPI } from "../../../servicos/CategoriaServico";
import {
    getTransacoesAPI, getTransacaoPorCodigoAPI,
    deleteTransacaoAPI, cadastraTransacaoAPI
} from "../../../servicos/TransacaoServico";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function Transacao() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", especificacao: "",
        valor: "", data_transacao: new Date().toISOString().slice(0, 10), 
        categorias: []
    });

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "", especificacao: "",
            valor: "", data_transacao: new Date().toISOString().slice(0, 10),
            categorias: []
        });
    }

    const editarObjeto = async codigo => {
        setObjeto(await getTransacaoPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraTransacaoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaTransacoes();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const [carregando, setCarregando] = useState(false);

    const recuperaTransacoes = async () => {
        setCarregando(true);
        setListaObjetos(await getTransacoesAPI());
        setCarregando(false);
    }

    const recuperaCategorias = async () => {
        setListaCategorias(await getCategoriasAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteTransacaoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaTransacoes();
        }
    }

    useEffect(() => {
        recuperaTransacoes();
        recuperaCategorias();
    }, []);

    return (
        <TransacaoContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, acaoCadastrar, handleChange, novoObjeto, editarObjeto,
            listaCategorias
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </TransacaoContext.Provider>
    )



}

export default Transacao;