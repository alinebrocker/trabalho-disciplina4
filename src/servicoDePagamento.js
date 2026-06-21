export default class servicoDePagamento {

    listaDePagamentos;

    constructor() {
        this.listaDePagamentos = [];
    }

    // Método 1: realizar pagamento
    realizarPagamento(codigoDeBarras, empresa, valor) {
        if (typeof valor !== 'number' || valor <= 0) {
            throw new Error('Valor inválido');
        }

        this.listaDePagamentos.push({
            codigoDeBarras,
            empresa,
            valor,
            categoria: valor > 100.00 ? 'cara' : 'padrão'
        });

        return 'Pagamento realizado!';
    }

    // Método 2: consultar o último pagamento
    consultarUltimoPagamento() {
        if (this.listaDePagamentos.length === 0) {
            throw new Error('Nenhum pagamento realizado!');
        }

        return this.listaDePagamentos[this.listaDePagamentos.length - 1];
    }
}
