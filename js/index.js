document.addEventListener('DOMContentLoaded', () => {
    //total des recettes
    const blocTotalRecettes = document.querySelector('.bloc-total-recettes');
    blocTotalRecettes.innerHTML = recipes.length + " recettes";

    displayRecipes(recipes);

    
    
});