document.addEventListener('DOMContentLoaded', () => {
    
    const searchInput = document.querySelector('#search-input');
        
    //event listenner sur l'input #search-input
    searchInput.addEventListener('input', function() {
        const inputRecipe = searchInput.value;
        const filteredRecipes = rechercher_recette_boucles_natives(recipes, inputRecipe);
        displayRecipes(filteredRecipes);
    });

    function rechercher_recette_boucles_natives(recipes, inputRecipe) {
        //déclaration variables
        let lowerInputRecipe;
        let sortedRecipes = new Set();
        let titreMatch, ingredientMatch, descriptionMatch;

        const alert = document.querySelector('.alert');
        
        //vérification taille recette
        if (inputRecipe.length >= 3) {
            //masque l'alerte si 4 caractères ou plus
            alert.classList.add('fade');
            alert.classList.remove('show');

            //initialisation des variables
            lowerInputRecipe = inputRecipe.toLowerCase();
        
            //parcours chaque recette
            for (let recipe of recipes) {
                titreMatch = recipe.name.toLowerCase().includes(lowerInputRecipe);
                ingredientMatch = false;
                descriptionMatch = recipe.description.toLowerCase().includes(lowerInputRecipe);
        
                //parcours chaque ingrédient
                for (let ingredient of recipe.ingredients) {
                    if (ingredient.ingredient.toLowerCase().includes(lowerInputRecipe)) {
                        ingredientMatch = true;
                        break; //sort de la boucle si un ingrédient correspond
                    }
                }
        
                //ajt recette au set si une correspondance est trouvée
                if (titreMatch || ingredientMatch || descriptionMatch) {
                    sortedRecipes.add(recipe);
                }
            }
            //met à jours le nombre de recette
            updateTotalRecipes(Array.from(sortedRecipes));
            //return la liste des recettes filtrées
            return Array.from(sortedRecipes);
            
        } else {
            updateTotalRecipes(Array.from(sortedRecipes));
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
