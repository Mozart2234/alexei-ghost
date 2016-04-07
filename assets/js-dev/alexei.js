// Menu mobile
var ButtonShowMenu = document.getElementById('js-ShowMenu'),
    ButtonHiddenMenu = document.getElementById('js-HiddenMenu'),
    menu = document.getElementById('js-Menu');

var showMenu = function(){
  menu.classList.add('menu-active');
  ButtonHiddenMenu.style.display = 'block';

  console.log('click')
}
var hiddenMenu = function(){
  console.log('click')
  menu.classList.remove('menu-active');
  ButtonShowMenu.style.display = 'block';
  ButtonHiddenMenu.style.display = 'none';
}

ButtonShowMenu.addEventListener('click', showMenu);

ButtonHiddenMenu.addEventListener('click', hiddenMenu);
