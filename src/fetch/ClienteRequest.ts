import type ClienteDTO from "../dto/ClienteDTO";
const API_URL = import.meta.env.VITE_API_SERVER_URL || 'http://localhost:3333';

// Classe responsável por fazer requisições à API - Cliente
class ClienteRequests {
    private serverURL;
    private endpointCliente;

    constructor() {
        this.serverURL = API_URL.replace(/\/$/, '');
        this.endpointCliente = `/api/Clientes`;
    }

    async obterListaDeClientes(): Promise<ClienteDTO[]> {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCliente}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeClientes: ClienteDTO[] = await respostaAPI.json();
                return listaDeClientes;
            } else {
                throw new Error("Não foi possível listar os Clientes.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de Clientes. ${error}`);
            throw error;
        }
    }

    async obterClientePorId(id_Cliente: number): Promise<ClienteDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCliente}/${id_Cliente}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const Cliente: ClienteDTO = await respostaAPI.json();
                return Cliente;
            } else {
                throw new Error("Não foi possível buscar o Cliente.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de Cliente por ID. ${error}`);
            return;
        }
    }

    async enviarFormularioCliente(formCliente: ClienteDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCliente}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formCliente)
            });

            if(!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }

    async removerCliente(id_Cliente: number): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCliente}/${id_Cliente}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (!respostaAPI.ok) {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            throw error;
        }
    }

    async enviarFormularioAtualizacaoCliente(id_Cliente: number, formCliente: ClienteDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCliente}/${id_Cliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formCliente)
            });

            if (!respostaAPI.ok) {
                // Tenta extrair a mensagem de erro enviada pela API
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            // Relança o erro para que o componente (FormAtualizarCliente) possa capturá-lo e exibir no Toast
            throw error;
        }
    }
}

export default new ClienteRequests;