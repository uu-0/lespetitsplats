document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.querySelector('#search-input');
    const clearIcon = document.querySelector('.clear-icon-header');

    //event listenner sur l'input #search-input
    searchInput.addEventListener('input', function() {
        clearIcon.style.display = 'block';
    });

    clearIcon.addEventListener('click', function() {
        searchInput.value = '';
        clearIcon.style.display = 'none';
        searchInput.focus();
    });

    //total des recettes
    function updateTotalRecipes(recettes){
        const blocTotalRecettes = document.querySelector('.bloc-total-recettes');
        const nombreRecettes = recettes.length;

        blocTotalRecettes.innerHTML = " ";
        blocTotalRecettes.innerHTML = nombreRecettes + " recettes";
    }

    displayRecipes(recipes);
    updateTotalRecipes(recipes);

});