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
        const filteredRecipes = rechercher_recette_boucles_natives(recipes, inputRecipe);
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

    function rechercher_recette_boucles_natives(recipes, inputRecipe) {
        //déclaration variables
        let lowerInputRecipe;
        let sortedRecipes = new Set();
        let titreMatch, ingredientMatch, descriptionMatch;

        const alert = document.querySelector('.alert');
        
        //vérification taille recette
        if (inputRecipe.length >= 3) {
            //masque l'alerte si 4 caractères ou plus
            hideAlert()

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
            showAlert("Veuillez entrer au moins 3 caractères");
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
