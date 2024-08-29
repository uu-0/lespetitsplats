document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.querySelector('#search-input');
    const clearIcon = document.querySelector('.clear-icon-header');
    const alert = document.querySelector('.alert');
        
    //event listenner sur l'input #search-input
    searchInput.addEventListener('input', function() {
        //recette cherchée par l'user
        const inputRecipe = searchInput.value;

        //si l'input est vide, affiche les recettes non filtrées
        //trim() permet de supprimer les espaces blancs, donc même si l'user entre des espaces on affiche les recettes nn filtrées
        if (inputRecipe.trim() === '') {
            //cache l'icône de clear si l'input est vide
            clearIcon.style.display = 'none'; 
        }else if (inputRecipe.length <3){
            displayRecipes(recipes);
            updateTotalRecipes(recipes);
            //affiche l'alerte si moins de 3 caractères
            alert.classList.add('show');
            alert.classList.remove('fade');
            clearIcon.style.display = 'block';
        }else{
            const filteredRecipes = rechercher_recette_programmation_fonctionnelle(recipes, inputRecipe);
            displayRecipes(filteredRecipes);
            clearIcon.style.display = 'block'; // Afficher l'icône de clear s'il y a du texte
        }
    });

    clearIcon.addEventListener('click', function() {
        //affiche les recettes non filtrées + total quand on vide l'input
        displayRecipes(recipes); 
        updateTotalRecipes(recipes);
        //vide l'input
        searchInput.value = '';
        clearIcon.style.display = 'none';
        searchInput.focus();
    });

    function rechercher_recette_programmation_fonctionnelle(recipes, inputRecipe) {
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
                const ingredientMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInputRecipe));
                const descriptionMatch = recipe.description.toLowerCase().includes(lowerInputRecipe);

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
        //on vide le contenu actuel et on ajoute le nouveau total
        blocTotalRecettes.innerHTML = " ";
        blocTotalRecettes.innerHTML = nombreRecettes + " recettes";
    }

    displayRecipes(recipes);
    updateTotalRecipes(recipes);

});