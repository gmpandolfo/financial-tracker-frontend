import { getToken } from "../seguranca/Autenticacao";

export const getTransacoesAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/transacao`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const getTransacaoPorCodigoAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/transacao/${codigo}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const deleteTransacaoAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/transacao/${codigo}`,
        {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraTransacaoAPI = async (objeto, metodo) => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/transacao`,
        {
            method : metodo,
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            },
            body : JSON.stringify(objeto)
        });
    const data = await response.json();
    return data;
}