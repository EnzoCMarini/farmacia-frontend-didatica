export default interface ProdutoDTO {
    idProduto?: number;
    descricao: string;
    validade?: Date;
    preco: number;
    qtdEstoque: number;
    qtdMinEstoque: number;
}