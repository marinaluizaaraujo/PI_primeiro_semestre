function mostrarAlerta(msg) {
    const alerta = document.getElementById('alertaCustom');
    alerta.textContent = msg;
    alerta.style.display = 'block';

    setTimeout(() => {
        alerta.style.display = 'none';
    }, 3000);
}
let draggedItem = null;

document.querySelectorAll('.colorCaixa').forEach(item => {
    item.addEventListener('dragstart', (e) => {
        draggedItem = item;
    });
});

document.querySelectorAll('.caixa').forEach(caixa => {
    caixa.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    caixa.addEventListener('drop', (e) => {
        e.preventDefault();

        if (!draggedItem) return;

        const draggedRect = draggedItem.getBoundingClientRect();
        const caixaRect = caixa.getBoundingClientRect();

        const draggedWidth = draggedRect.width;
        const draggedHeight = draggedRect.height;

        const caixaWidth = caixaRect.width;
        const caixaHeight = caixaRect.height;

        const podeSoltar = draggedWidth <= caixaWidth && draggedHeight <= caixaHeight;

        if (podeSoltar) {
            caixa.appendChild(draggedItem);
        } else {
            mostrarAlerta('A peça é maior do que a caixa!');
        }

        draggedItem = null;
    });
});