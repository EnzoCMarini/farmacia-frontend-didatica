import { type JSX } from "react";
import ListagemClientes from "../../../components/Listagens/ListagemClientes/ListagemClientes";

function PListagemCliente(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <ListagemClientes />
        </div>
    );
}

export default PListagemCliente;