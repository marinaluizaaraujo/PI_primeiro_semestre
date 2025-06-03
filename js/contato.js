const emailInput = document.getElementById('titulo-email');
const assuntoInput = document.getElementById('titulo-assunto');
const conteudoEditor = document.getElementById('conteudo');

// Atualiza contador de caracteres do email
emailInput.addEventListener('input', () => {
    document.getElementById('contador-email').textContent = `${emailInput.value.length}/50`;
});

// Atualiza contador de caracteres do assunto
assuntoInput.addEventListener('input', () => {
    document.getElementById('contador-assunto').textContent = `${assuntoInput.value.length}/50`;
});

// Atualiza e limita caracteres na descrição
conteudoEditor.addEventListener('input', () => {
    let plainText = conteudoEditor.innerText || conteudoEditor.textContent;

    if (plainText.length > 500) {
        plainText = plainText.slice(0, 500);
        conteudoEditor.innerText = plainText;
        placeCaretAtEnd(conteudoEditor); // Garante que o cursor fique no fim
    }

    document.getElementById('contador-conteudo').textContent = `${plainText.length}/500`;
});

// Impede colar textos maiores que o limite
conteudoEditor.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    const currentText = conteudoEditor.innerText || conteudoEditor.textContent;
    const maxLength = 500;
    const toPaste = text.slice(0, maxLength - currentText.length);
    document.execCommand("insertText", false, toPaste);
});

// Função que posiciona o cursor no fim do conteúdo editável
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

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

// Função auxiliar para executar comandos do editor
function comandoEditor(comando, valor = null) {
    document.execCommand(comando, false, valor);
}
