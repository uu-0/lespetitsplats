document.addEventListener('DOMContentLoaded', () => {
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