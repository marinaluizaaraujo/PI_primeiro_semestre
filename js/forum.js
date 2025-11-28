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

// Contador e limite do conteúdo (contenteditable)
conteudo.addEventListener('input', () => {
    let textoSemTags = conteudo.innerText.trim();

    if (textoSemTags.length > limiteConteudo) {
        textoSemTags = textoSemTags.slice(0, limiteConteudo);
        conteudo.innerText = textoSemTags;
        colocarCursorNoFinal(conteudo);
    }

    contadorConteudo.textContent = `${textoSemTags.length}/${limiteConteudo}`;
});

// Impedir colagens acima do limite
conteudo.addEventListener('paste', (e) => {
    e.preventDefault();
    const textoColado = (e.clipboardData || window.clipboardData).getData('text');
    const textoAtual = conteudo.innerText.trim();
    const espacoDisponivel = limiteConteudo - textoAtual.length;

    if (espacoDisponivel > 0) {
        const textoPermitido = textoColado.slice(0, espacoDisponivel);
        document.execCommand('insertText', false, textoPermitido);
    }
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

// Função auxiliar: coloca o cursor no final do conteúdo
function colocarCursorNoFinal(elemento) {
    elemento.focus();
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(elemento);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}
