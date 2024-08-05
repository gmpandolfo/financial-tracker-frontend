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
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Transacao() {

    let navigate = useNavigate();

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
        try {
            setObjeto(await getTransacaoPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });

        }
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
            window.location.reload();
            navigate("login", { replace: true });
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
        try {
            setCarregando(true);
            setListaObjetos(await getTransacoesAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }
    }

    const recuperaCategorias = async () => {
        try {
            setListaCategorias(await getCategoriasAPI());
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteTransacaoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaTransacoes();
            } catch (err) {
                window.location.reload();
                navigate("login", { replace: true });
            }
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

export default WithAuth(Transacao);