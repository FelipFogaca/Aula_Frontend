// 1° Banco de dados na memória - VETOR
const pets = [];

// 2° Pega os elementos HTML - DOM

//              - document.querySelector('');
const tbodyPets = document.getElementById('pets');
const counter = document.getElementById('counter');

const formCadastro = document.getElementById('formCadastro');
const btnLimparLista = document.getElementById('btnLimparLista');

const editBox = document.getElementById('editBox');
const btnFecharEdicao = document.getElementById('btnFecharEdicao');
const formEdit = document.getElementById('formEdit');

const inputNome = document.getElementById('pet');
const inputTutor = document.getElementById('tutor');
const inputIdade = document.getElementById('idade');

const editNome = document.getElementById('editNome');
const editIdade = document.getElementById('editIdade');
const editTutor = document.getElementById('editTutor');

// 3° Guardar qual item esta sendo editado
let indiceEdicao = null;

// Eventos

formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = inputNome.value.trim();
    const tutor = inputTutor.value.trim();
    const idade = Number(inputIdade.value);

    //Validação dos campos
    if (!nome || !tutor || Number.isNaN(idade)) {
        alert('Preencha os campos nome, idade e tutor corretamente!');
        return;
    }

    pets.push({
        nome,
        idade,
        tutor
    });
    renderizarTabela();
});

function atualizarContador() {
    const total = pets.length;
    counter.textContent = total === 0 ? "Nenhum Pet cadastrado." : `${total} ${total === 1 ? "Pet" : "Pets"}`;
}

function renderizarTabela() {
    tbodyPets.innerHTML = ""; // Limpa a tabela

    pets.forEach((pet, index) => {

        const tr = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.textContent = pet.nome;

        const tdIdade = document.createElement('td');
        tdIdade.textContent = pet.idade;

        const tdTutor = document.createElement('td');
        tdTutor.textContent = pet.tutor;

        const tdAcoes = document.createElement('td');
        tdAcoes.className = "acoes";

        const btnEditar = document.createElement('button');
        btnEditar.type = 'button';
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener('click', () => abrirEdicao(index));


        const btnExcluir = document.createElement('button');
        btnExcluir.type = 'button';
        btnExcluir.textContent = "Excluir";
        btnExcluir.addEventListener('click', () => excluir(index));

        tdAcoes.append(btnEditar, btnExcluir);
        tr.append(
            tdNome,
            tdIdade,
            tdTutor,
            tdAcoes
        );

        tbodyPets.appendChild(tr);
    })
}

function abrirEdicao(index) {
    indiceEmEdicao = index;

    editNome.vale = pets[index].nome;
    editIdade.vale = pets[index].idade;
    editTutor.vale = pets[index].tutor;

    editBox.style.display = "block";
    editBox.setAttribute("aria-hidden", "false");
    editNome.focus();
}


// Guarda qual o item que está sendo editado
let indiceEmEdicao = null;

formEdit.addEventListener('submit', (event) => {
    event.preventDefault();

    if (indiceEmEdicao === null) return;

    const nome = editNome.value.trim();
    const tutor = editTutor.value.trim();
    const idade = Number(editIdade.value);

    if (!nome || !tutor || Number.isNaN(idade)) {
        alert('Preencha os dados de edição corretamente!');
        return;
    }

    pets[indiceEmEdicao] = { nome, idade, tutor };
    renderizarTabela();
    atualizarContador();
    fecharEdicao();
})

function excluir(index) {
    pets.splice(index, 1);
    renderizarTabela();
    atualizarContador();
    limparCampos();
}

function limparCampos() {
    inputNome.value = "";
    inputIdade.value = "";
    inputTutor.value = "";
    inputNome.focus();
}

btnLimparLista.addEventListener('click', () => {
    pets.length = 0;
    renderizarTabela();
    atualizarContador();
    limparCampos();
})

function fecharEdicao() {
    indiceEdicao = null;
    editBox.style.display = "none";
    editBox.setAttribute("aria-hidden", true);
}

btnFecharEdicao.addEventListener('click', () => {
    fecharEdicao()
});