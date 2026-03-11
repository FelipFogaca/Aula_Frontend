// Recupera o histórico salvo no navegador (localStorage) Caso não exista nada salvo, cria um array vazio
let historico = JSON.parse(localStorage.getItem("historico")) || [];

// Captura os campos do formulário pelo ID
const inputCep = document.getElementById('cep');
const inputEndereco = document.getElementById('endereco');
const inputBairro = document.getElementById('bairro');
const inputCidade = document.getElementById('cidade');
const inputEstado = document.getElementById('estado');

// Captura o corpo da tabela onde será mostrado o histórico
const tbodyHistorico = document.getElementById("historico");

// Coloca o cursor automaticamente no campo CEP quando a página terminar de carregar
window.addEventListener('DOMContentLoaded', function () {
    inputCep.focus();
    renderizarTabela();
});

function limparFormulario() {
    inputCep.value = '';
    inputEndereco.value = '';
    inputBairro.value = '';
    inputCidade.value = '';
    inputEstado.value = '';
    inputCep.focus();
}

// Limpa apenas os campos de endereço
function limparCamposEndereco() {

    inputEndereco.value = '';
    inputBairro.value = '';
    inputCidade.value = '';
    inputEstado.value = '';
}

// Preenche os campos com os dados retornados da API
function preencherFormulario(endereco) {
    inputEndereco.value = endereco.logradouro;
    inputBairro.value = endereco.bairro;
    inputCidade.value = endereco.localidade;
    inputEstado.value = endereco.uf;
}

// Função para pesquisar o CEP na API ViaCEP
async function pesquisarCep() {

    const cep = inputCep.value.replace('-', '').trim(); // Remove traço do CEP e espaços

    limparCamposEndereco(); // Limpa os campos antes da nova consulta

    // Verifica se o CEP possui 8 caracteres
    if (cep.length !== 8) {
        inputEndereco.value = "CEP inválido";
        return;
    }

    const url = "https://viacep.com.br/ws/" + cep + "/json/";

    try {


        const dados = await fetch(url); // Consulta a API

        const endereco = await dados.json(); // Converte resposta para JSON

        // Verifica se o CEP não existe
        if (endereco.erro) {

            inputEndereco.value = "CEP não encontrado";

        }
        else {
            preencherFormulario(endereco);// Preenche os campos com os dados
        }

    } catch (erro) {
        inputEndereco.value = "Erro ao consultar CEP";// Caso ocorra erro de conexão
    }
}

document.getElementById("btnBuscar").addEventListener("click", async function (event) {

    event.preventDefault(); // Impede o formulário de recarregar a página

    await pesquisarCep(); // Executa a busca do CEP

    // Captura os dados do formulário
    const cep = inputCep.value;
    const endereco = inputEndereco.value;
    const bairro = inputBairro.value;
    const cidade = inputCidade.value;
    const estado = inputEstado.value;

    // Se CEP estiver vazio, interrompe
    if (!cep) {
        return;
    }

    // Verifica manualmente se o CEP já existe no histórico
    let cepExistente = false;

    for (let i = 0; i < historico.length; i++) {

        if (historico[i].cep === cep) {
            cepExistente = true;
            break;
        }
    }

    // Se já existir no histórico, não adiciona novamente
    if (cepExistente) {
        return;
    }

    // Adiciona novo registro no histórico
    historico.push({
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado
    });

    // Salva novamente no localStorage
    localStorage.setItem("historico", JSON.stringify(historico));
    renderizarTabela();
});

document.getElementById("btnLimpar").addEventListener("click", function () {
    limparFormulario();
});

function renderizarTabela() {

    // Limpa a tabela antes de recriar
    tbodyHistorico.innerHTML = "";

    // Percorre todo o histórico
    for (let i = 0; i < historico.length; i++) {

        const item = historico[i];

        const tr = document.createElement("tr"); // Cria linha da tabela

        // Cria as colunas
        const tdCep = document.createElement("td");
        tdCep.textContent = item.cep;

        const tdEndereco = document.createElement("td");
        tdEndereco.textContent = item.endereco;

        const tdBairro = document.createElement("td");
        tdBairro.textContent = item.bairro;

        const tdCidade = document.createElement("td");
        tdCidade.textContent = item.cidade;

        const tdEstado = document.createElement("td");
        tdEstado.textContent = item.estado;

        const tdExcluir = document.createElement("td");

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", function (index) {

            return function () {

                // Remove o item do histórico
                historico.splice(index, 1);

                localStorage.setItem("historico", JSON.stringify(historico));// Atualiza localStorage
                renderizarTabela();
            };
        }(i));

        tdExcluir.appendChild(btnExcluir); // Adiciona botão dentro da coluna

        // Adiciona colunas na linha
        tr.appendChild(tdCep);
        tr.appendChild(tdEndereco);
        tr.appendChild(tdBairro);
        tr.appendChild(tdCidade);
        tr.appendChild(tdEstado);
        tr.appendChild(tdExcluir);
       
        tbodyHistorico.appendChild(tr); // Adiciona linha na tabela
    }
}