const navItems = document.querySelectorAll('.linhasNav');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('ativo'));
        item.classList.add('ativo');
    });
});
