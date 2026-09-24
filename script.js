document.addEventListener('DOMContentLoaded', () => {
  // Gerenciamento do Menu Responsivo (Mobile)
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
      // Alterna visibilidade e estado do ARIA
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
    });

    // Fecha o menu mobile ao clicar em um link
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navList.classList.contains('active')) {
          navList.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
});