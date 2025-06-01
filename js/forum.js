const titulo = document.getElementById('titulo');
const conteudo = document.getElementById('conteudo');
const contadorTitulo = document.getElementById('contador-titulo');
const contadorConteudo = document.getElementById('contador-conteudo');

// Limites
const limiteTitulo = 50;
const limiteConteudo = 500;

// Contador do título
titulo.addEventListener('input', () => {
    if (titulo.value.length > limiteTitulo) {
        titulo.value = titulo.value.slice(0, limiteTitulo);
    }
    contadorTitulo.textContent = `${titulo.value.length}/${limiteTitulo}`;
});

// Contador do conteúdo com contenteditable
conteudo.addEventListener('input', () => {
    const textoSemTags = conteudo.innerText.trim();

    if (textoSemTags.length > limiteConteudo) {
        const textoLimitado = textoSemTags.slice(0, limiteConteudo);
        conteudo.innerText = textoLimitado;

        // Mantém o cursor no final após limitar
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(conteudo);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    contadorConteudo.textContent = `${textoSemTags.length}/${limiteConteudo}`;
});

// Função para comandos do editor
function comandoEditor(comando, valor = null) {
    document.execCommand(comando, false, valor);
}

// Botões de formatação
document.getElementById('botao-bold').addEventListener('click', () => {
    comandoEditor('bold');
});

document.getElementById('botao-italic').addEventListener('click', () => {
    comandoEditor('italic');
});

document.getElementById('botao-underline').addEventListener('click', () => {
    comandoEditor('underline');
});

document.getElementById('botao-strike').addEventListener('click', () => {
    comandoEditor('strikeThrough');
});

document.getElementById('botao-link').addEventListener('click', () => {
    const url = prompt('Digite a URL completa (https://...)');
    if (url) {
        comandoEditor('createLink', url);
    }
});

document.getElementById('botao-clear').addEventListener('click', () => {
    comandoEditor('removeFormat');
    comandoEditor('unlink');
});
