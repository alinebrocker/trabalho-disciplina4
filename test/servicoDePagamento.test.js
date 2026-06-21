import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Classe de Servico de Pagamento', () => {
    it('Teste 1: Validar que o pagamento é registrado na lista de pagamentos', function () {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const registro = ['0987-7656-3475', 'Samar', 156.87, 'cara'];

        // Act
        const resultado = servicoDePagamento.realizarPagamento(
            '0987-7656-3475',
            'Samar',
            156.87
        );

        //Assert            
        assert.equal(resultado, 'Pagamento realizado!');
    })

    it('Teste 2: Validar consulta do último pagamento registrado com categoria /cara/', () => {

        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        const resultado = servicoDePagamento.realizarPagamento(
            '0987-7656-3475',
            'Samar',
            156.87
        );
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        //Assert            
        assert.equal(ultimoPagamento.codigoDeBarras, '0987-7656-3475');
        assert.equal(ultimoPagamento.empresa, 'Samar');
        assert.equal(ultimoPagamento.valor, 156.87);
        assert.equal(ultimoPagamento.categoria, 'cara');
    });

    it('Teste 3: Validar consulta do último pagamento registrado com categoria /padrão/', () => {

        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        const resultado = servicoDePagamento.realizarPagamento(
            '1234-5678-9000',
            'Samar',
            99.99
        );
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        //Assert            
        assert.equal(ultimoPagamento.codigoDeBarras, '1234-5678-9000');
        assert.equal(ultimoPagamento.empresa, 'Samar');
        assert.equal(ultimoPagamento.valor, 99.99);
        assert.equal(ultimoPagamento.categoria, 'padrão');
    });

    it('Teste 4: Validar que a lista de pagamentos permite salvar mais de um único registro', () => {

        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        const pagamentoUm = servicoDePagamento.realizarPagamento(
            '1111-2222-3333',
            'TesteEmpresa1',
            99.99
        );
        const pagamentoDois = servicoDePagamento.realizarPagamento(
            '4444-5555-6666',
            'TesteEmpresa2',
            50.50
        );
        const pagamentoTres = servicoDePagamento.realizarPagamento(
            '7777-8888-9999',
            'TesteEmpresa3',
            66.66
        );

        const qtdRegistrosDaLista = servicoDePagamento.listaDePagamentos.length;

        //Assert       
        assert.equal(qtdRegistrosDaLista, 3);
    });
    it('Teste 5: Validar o retorno do último registro da lista de pagamentos (a qual contém mais de um registro)', () => {

        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        const pagamentoUm = servicoDePagamento.realizarPagamento(
            '1111-2222-3333',
            'TesteEmpresa1',
            99.99
        );
        const pagamentoDois = servicoDePagamento.realizarPagamento(
            '4444-5555-6666',
            'TesteEmpresa2',
            50.50
        );
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        //Assert            
        assert.equal(ultimoPagamento.codigoDeBarras, '4444-5555-6666');
        assert.equal(ultimoPagamento.empresa, 'TesteEmpresa2');
        assert.equal(ultimoPagamento.valor, 50.50);
        assert.equal(ultimoPagamento.categoria, 'padrão');
    });

    it('Teste 6: Validar msg de erro ao consultar lista de pagamentos que não possui registros', () => {

        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act        
        const ultimoPagamento = () => {
            servicoDePagamento.consultarUltimoPagamento();
        };

        //Assert            
        assert.throws(ultimoPagamento,
            {
                message: 'Nenhum pagamento realizado!'
            }
        );
    });

    it('Teste 7: Validar msg de erro ao realizar pagamento inválido (valor igual a zero)', () => {

        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act        
        const pagamentoComValorZero = () => {
            servicoDePagamento.realizarPagamento(
                '1111-2222-3333',
                'TesteEmpresa1',
                0.0
            );
        };

        //Assert            
        assert.throws(pagamentoComValorZero,
            {
                message: 'Valor inválido'
            }
        );
    });
});
