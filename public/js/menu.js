function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    const isMenuVisible = menu.style.display === 'block';

    if (isMenuVisible) {
        menu.style.display = 'none';
        document.removeEventListener('click', handleClickOutside);
    } else {
        menu.style.display = 'block';
        document.addEventListener('click', handleClickOutside);
    }
}

function handleClickOutside(event) {
    const menu = document.getElementById('dropdownMenu');
    const menuIcon = document.querySelector('.menu-icon');

    // Verifica si el clic fue fuera del menú y del icono del menú
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        menu.style.display = 'none';
        document.removeEventListener('click', handleClickOutside);
    }
}
