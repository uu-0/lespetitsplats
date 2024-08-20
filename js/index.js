document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.querySelector('#search-input');
    const clearIcon = document.querySelector('.clear-icon-header');
        
    //event listenner sur l'input #search-input
    searchInput.addEventListener('input', function() {
        const inputRecipe = searchInput.value;
        const filteredRecipes = rechercher_recette_programmation_fonctionnelle(recipes, inputRecipe);
        displayRecipes(filteredRecipes);
        clearIcon.style.display = 'block';
    });

    clearIcon.addEventListener('click', function() {
        searchInput.value = '';
        clearIcon.style.display = 'none';
        searchInput.focus();
    });

    function rechercher_recette_programmation_fonctionnelle(recipes, inputRecipe) {
        const alert = document.querySelector('.alert');

        //vérifie la longueur de la recette recherchée
        if (inputRecipe.length >= 3) {
            //masque l'alerte si 4 caractères ou plus
            alert.classList.add('fade');
            alert.classList.remove('show');

            //converti la recette recherchée en minuscules
            let lowerInputRecipe = inputRecipe.toLowerCase();

            //filtre les recettes
            const filtredRecipes = recipes.filter(recipe => {
                const titreMatch = recipe.name.toLowerCase().includes(lowerInputRecipe);
                console.log(titreMatch);
                const ingredientMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInputRecipe));
                console.log(ingredientMatch);
                const descriptionMatch = recipe.description.toLowerCase().includes(lowerInputRecipe);
                console.log(descriptionMatch);
                return titreMatch || ingredientMatch || descriptionMatch;
            });
        
            //élimine les doublons en utilisant un ensemble (set)
            //JSON.stringify(recipe): on transforme chaque élément recipe du tableau en chaîne de caractères JSON
            const filtredRecipesSet = Array.from(new Set(filtredRecipes.map(recipe => JSON.stringify(recipe)))).map(recipeStr => JSON.parse(recipeStr));
            
            updateTotalRecipes(filtredRecipesSet);

            //return les recettes uniques
            return filtredRecipesSet;
        }else{
            //affiche l'alerte si moins de 3 caractères
            alert.classList.add('show');
            alert.classList.remove('fade');
        }
    }
    
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