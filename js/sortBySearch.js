document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.querySelector('#search-input');
        
        //event listenner sur l'input des select-form
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
        
            //vérification taille recette
            if (inputRecipe.length < 3) {
                return [];
            }
        
            //initialisation des variables
            lowerInputRecipe = inputRecipe.toLowerCase();
        
            //parcours chaque recette
            for (let recette of recipes) {
                titreMatch = recette.titre.toLowerCase().includes(lowerInputRecipe);
                ingredientMatch = false;
                descriptionMatch = recette.description.toLowerCase().includes(lowerInputRecipe);
        
                //parcours chaque ingrédient
                for (let ingredient of recette.ingredients) {
                    if (ingredient.toLowerCase().includes(lowerInputRecipe)) {
                        ingredientMatch = true;
                        break;  // Sortir de la boucle si un ingrédient correspond
                    }
                }
        
                // Ajouter la recette au set si une correspondance est trouvée
                if (titreMatch || ingredientMatch || descriptionMatch) {
                    sortedRecipes.add(recette);
                }
            }
        
            // Retourner la liste des recettes filtrées
            return Array.from(sortedRecipes);
        }
        

});