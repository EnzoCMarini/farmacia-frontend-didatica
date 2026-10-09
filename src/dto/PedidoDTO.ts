export default interface PedidoDTO {
    idVenda?: number;
    idCliente: number;
    dataVenda?: Date;
    idProduto: number;
    qtdProduto: number;
    precoUnit: number;
}