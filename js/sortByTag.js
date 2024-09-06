document.addEventListener("DOMContentLoaded", function () {
    //filtre les options d'un select-form
     function filterOptions(inputElement, selectElement) {
        const filterValue = inputElement.value.toLowerCase();
        const options = selectElement.querySelectorAll('option');

        if (filterValue === '') {
            //si le champ est vide on affiche toutes les options
            options.forEach(option => {
                option.style.display = '';
            });
        } else {
            //sinon on applique le filtre
            options.forEach(option => {
                const optionText = option.textContent.toLowerCase();
                if (optionText.includes(filterValue)) {
                    option.style.display = ''; 
                } else {
                    option.style.display = 'none';
                }
            });
        }
    }

     //contrôle la valeur entrée dans l'input
     function isValidInput(input) {
        const pattern = /^[a-zA-Z0-9 ]+$/;
        return pattern.test(input);
    }
    
    //template pour afficher la liste des éléments dans un select-form, en fonction de l'id du select-form
    function displayOptionsInSelectForm(items, selectId) {
        //seuls les éléments uniques sont ajoutés au select + on les tri par ordre alphabétique
        const uniqueItems = [...new Set(items)].sort((a, b) => a.localeCompare(b));
        //on séléctionne l'élément ayant l'id renseigné 
        const selectElement = document.querySelector(`#${selectId}`);
        //on select le formulaire ouvert
        const openFormSelect = selectElement.querySelector('.open-form-select');

        //on utilise un ensemble pour stocker les tags séléctionnés
        const addedTags = new Set();

        //pr chaque élément unique, une option est créée et ajoutée à la liste déroulante appropriée
        uniqueItems.forEach(function(item, index) {
            //on select les option du form-select
            const optionElement = document.createElement('option');
            const optionName = item.charAt(0).toUpperCase() + item.slice(1);
            
            //on ajoute la valeur d'une option en l'incrémentant à chaque tour de boucle
            optionElement.setAttribute('value', index + 1);
            //on ajoute le nom de l'élément
            optionElement.innerHTML = optionName;

            //ajt un écouteur d'événement sur le clic 
            optionElement.addEventListener('click', function() {
                //si l'ensemble de tag contient déjà l'option qui est cliquée
                if (addedTags.has(optionName)) {
                    //on retire l'option du container
                    removeTag(optionName);
                    //on retire l'option de l'ensemble
                    addedTags.delete(optionName);
                    //on retire la class clicked à l'option
                    optionElement.classList.remove('option-clicked');
                } else {
                    //si non, on ajt l'option au container (avec optionElement pr que l'option ne soit plus séléctionnée dabns la liste)
                    addTag(optionName, optionElement);
                    //on ajt l'option à l'ensemble
                    addedTags.add(optionName);
                    //on ajt la class clicked à l'option
                    optionElement.classList.add('option-clicked');
                }
            });

            //on ajoute les éléments créés à l'élément parent
            openFormSelect.appendChild(optionElement);
            selectElement.appendChild(openFormSelect);
        });
        
        //récupère l'input
        const input = selectElement.querySelector('.search-input');
        const clearIcon = selectElement.querySelector('.clear-icon');

        input.addEventListener('input', function() {
            //input vide
            if (input.value.trim() === '') {
                clearIcon.style.display = 'none';
                openFormSelect.style.height = '285px';
                filterOptions(input, openFormSelect);
                return;
            }
            //caractère non conforme
            if (!isValidInput(input.value)) {
                clearIcon.style.display = 'block';
                openFormSelect.style.height = '285px';
                filterOptions(input, openFormSelect);
                return;
            }
        
            //filtre les options normalement si l'input est valide
            filterOptions(input, openFormSelect);
            clearIcon.style.display = 'block';
            openFormSelect.style.height = 'fit-content';
        });
        
        
        //vide l'input
        clearIcon.addEventListener('click', function() {
            input.value = '';
            clearIcon.style.display = 'none';
            input.focus();
        });
    }

    function filterRecipes() {
        const selectedTags = Array.from(document.querySelectorAll('.tag-container-search-options .tag'))
                                .map(tag => tag.getAttribute('data-tag-name').toLowerCase());
    
        const filteredRecipes = filteredByInputRecipes.filter(recipe => { // Utilise les recettes filtrées par l'input
            const recipeIngredients = recipe.ingredients.map(ing => ing.ingredient.toLowerCase());
            const recipeAppliance = recipe.appliance.toLowerCase();
            const recipeUstensils = recipe.ustensils.map(ust => ust.toLowerCase());
    
            return selectedTags.every(tag => 
                recipeIngredients.includes(tag) ||
                recipeAppliance === tag ||
                recipeUstensils.includes(tag)
            );
        });
    
        displayRecipes(filteredRecipes);
        updateNbRecipes();
    }
    

    function updateNbRecipes(){
        const recettesContainer = document.querySelector('.cards-container');
        const nbRecipes = recettesContainer.childElementCount;

        const blocTotalRecettes = document.querySelector('.bloc-total-recettes');
        
        if (nbRecipes === 0){
        blocTotalRecettes.innerHTML = " ";
        blocTotalRecettes.innerHTML = 0 + " recettes";
        }

        //on vide le contenu actuel et on ajoute le nouveau total
        blocTotalRecettes.innerHTML = " ";
        blocTotalRecettes.innerHTML = nbRecipes + " recettes";
    }

    /**
     * ajoute un tag(option) au container de tags
     * créer un bouton "X" pour retirer le tag du container de tag
     * prend optionElement de displayOptionsInSelectForm() pour désélctionner l'option dans la liste, lorsque le tag est retiré
     * @param {string} value 
     * @param {string} optionElement 
     */
    function addTag(value, optionElement) {
        //container de tags
        const tagContainer = document.querySelector('.tag-container-search-options');

        //tag créé avec l'option
        const tagElement = document.createElement('div');

        //ajt class tag
        tagElement.className = 'tag';
        //on ajt un attribut pour séléctionner le tag afin de la supp
        tagElement.setAttribute('data-tag-name', value);
        //ajt titre nom de l'option
        tagElement.innerHTML = value;

        //on ajoute le'élément créé à l'élément parent
        tagContainer.appendChild(tagElement);
        
        //ajt d'un bouton pour retirer le tag
        const removeButton = document.createElement('span');

        //on ajt la class remove-tag
        removeButton.className = 'remove-tag';
        removeButton.innerHTML = '&times;'; //x

        //ajt d'un ecouteur d'évenement sur la croix pr retirer le tag du container
        removeButton.addEventListener('click', function() {
            tagContainer.removeChild(tagElement);
            optionElement.click(); //lorsque l'on clique sur le removeButton d'une div option, on active le clic sur cette même option l'option pour qu'elle ne soit plus séléctionnée dabns la liste
        });

        //on ajoute l'élément créé à l'élément parent
        tagElement.appendChild(removeButton);
        tagContainer.appendChild(tagElement);

        filterRecipes();
        updateNbRecipes();
    }

    /**
     * retire un tag(option) du container de tags
     * @param {string} value 
     */
    function removeTag(value) {
        //container de tag
        const tagContainer = document.querySelector('.tag-container-search-options');
        //tag ayant la value donnée, créé avec l'option
        const tagElement = tagContainer.querySelector(`[data-tag-name="${value}"]`);
        //si l'attribut data-tag-name contenu dans tagElement a été créé avec addTag (donc qu'il existe)
        if (tagElement) {
            //on le retire du container de tag
            tagContainer.removeChild(tagElement);
        }

        filterRecipes();
        updateNbRecipes();
    }

    //affiche la liste des ingrédients dans la liste d'option #ingredient-select
    const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
    displayOptionsInSelectForm(ingredients, 'ingredient-select');

    //affiche la liste des appareils dans la liste d'option #appliance-select
    const appliances = recipes.map(recipe => recipe.appliance);
    displayOptionsInSelectForm(appliances, 'appliance-select');

    //affiche la liste des appareils dans la liste d'option #ustensil-select
    const ustensils = recipes.flatMap(recipe => recipe.ustensils);
    displayOptionsInSelectForm(ustensils, 'ustensil-select');
    
    //séléctionne les titres des listes d'option (pour ingrédients, appareils et ustensibles)
    const selectFormTitles = document.querySelectorAll('.select-form-title');

    //ajoute un event listener sur le click de chacun des selectFormTitles
    selectFormTitles.forEach(function(selectFormTitle) {
        //closest = pr chaque élément selectFormTitle, on cherche l'élément parent le plus proche ayant la classe select-form
        const selectForm = selectFormTitle.closest('.select-form');
        const openSelectForm = selectForm.querySelector('.open-form-select');
        const selectFormIcon = selectForm.querySelector('.select-form-icon');
  
        selectFormTitle.addEventListener('click', function(event) {
            //empêche la propagation de l'event click pour éviter de le capturer dans le gestionnaire global
            event.stopPropagation();

            //permet de modifier le sens de la flèche des select-form
            if (openSelectForm.classList.contains('active')) {
                selectFormIcon.classList.remove('fa-chevron-up');
                selectFormIcon.classList.add('fa-chevron-down');
            } else {
                selectFormIcon.classList.remove('fa-chevron-down');
                selectFormIcon.classList.add('fa-chevron-up');
            }
            selectForm.classList.toggle('active');
            openSelectForm.classList.toggle('active');
        });
        
    });

    //écouteur d'événement global pour détecter les clics en dehors de .open-form-select
    document.addEventListener('click', function(event) {
        const openSelectForms = document.querySelectorAll('.open-form-select.active');

        openSelectForms.forEach(function(openSelectForm) {
            if (!openSelectForm.contains(event.target)) {
                //si le clic est en dehors de .open-form-select, on retire la classe active
                openSelectForm.classList.remove('active');
                
                //trouve le parent select-form pour retirer la classe active
                const selectForm = openSelectForm.closest('.select-form');
                selectForm.classList.remove('active');
                
                //mise à jour de l'icône
                const selectFormIcon = selectForm.querySelector('.select-form-icon');
                selectFormIcon.classList.remove('fa-chevron-up');
                selectFormIcon.classList.add('fa-chevron-down');
            }
        });
    });
});
