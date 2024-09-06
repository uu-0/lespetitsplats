document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.querySelector('#search-input');
    const clearIcon = document.querySelector('.clear-icon-header');
    const alert = document.querySelector('.alert');
        
    //event listenner sur l'input #search-input
    searchInput.addEventListener('input', inputChangeGestion);

    //gère les changements de l'input
    function inputChangeGestion() {
        const inputRecipe = searchInput.value.trim();
        
        //input vide
        if (inputRecipe === '') {
            hideClearIcon();
            hideAlert();
            filteredByInputRecipes = recipes;
            return;
        }

        //caractères non conformes dans l'input
        if (!isValidInput(inputRecipe)) {
            showAlert("Seuls les lettres, chiffres et espaces sont autorisés");
            return;
        }

        //moins de 3 caractères dans l'input
        if (inputRecipe.length < 3) {
            displayRecipes(recipes);
            updateTotalRecipes(recipes);
            showAlert("Veuillez entrer au moins 3 caractères");
            showClearIcon();
            return;
        }

        //si les conditions sont respectées, on tri les recettes
        const filteredRecipes = rechercher_recette_programmation_fonctionnelle(recipes, inputRecipe);
        //mise à jour de la variable avec les recettes filtrées
        filteredByInputRecipes = filteredRecipes;
        displayRecipes(filteredRecipes);
        showClearIcon();
    }

    //contrôle la valeur entrée dans l'input
    function isValidInput(input) {
        const pattern = /^[a-zA-Z0-9 ]+$/;
        return pattern.test(input);
    }
    
    //gestion des alertes: affiche l'alerte
    function showAlert(message) {
        alert.classList.add('show');
        alert.classList.remove('fade');
        alert.textContent = message;
    }
    
    //gestion des alertes: cache l'alerte
    function hideAlert() {
        alert.classList.remove('show');
        alert.classList.add('fade');
    }
    
    //gestion clearIcon: affiche l'icône
    function showClearIcon() {
        clearIcon.style.display = 'block';
    }
    
    //gestion clearIcon: cache l'icône
    function hideClearIcon() {
        clearIcon.style.display = 'none';
    }

    //event listener sur la clearIcon de l'input 
    //affiche les recettes non filtrées + maj total de recette quand on vide l'input + vide la liste des recettes filtrées
    clearIcon.addEventListener('click', function() {
        displayRecipes(recipes); 
        updateTotalRecipes(recipes);

        searchInput.value = '';
        filteredByInputRecipes = recipes;
        hideClearIcon();
        searchInput.focus();
    });

    //fonction pour rechercher une recette
    function rechercher_recette_programmation_fonctionnelle(recipes, inputRecipe) {
        //vérifie la longueur de la recette recherchée
        if (inputRecipe.length >= 3) {
            //masque l'alerte si 4 caractères ou plus
            hideAlert()

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
            showAlert("Veuillez entrer au moins 3 caractères");
        }
    }
    
    //fonction pour maj le total des recettes
    function updateTotalRecipes(recettes){
        const blocTotalRecettes = document.querySelector('.bloc-total-recettes');
        const nombreRecettes = recettes.length;
        //on vide le contenu actuel et on ajoute le nouveau total
        blocTotalRecettes.innerHTML = " ";
        blocTotalRecettes.innerHTML = nombreRecettes + " recettes";
    }

    //appel des fonctions pour afficher les recettes et maj le nb de recette
    displayRecipes(recipes);
    updateTotalRecipes(recipes);

});