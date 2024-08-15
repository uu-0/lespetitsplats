document.addEventListener("DOMContentLoaded", function () {
    /**
     * template pour afficher la liste des éléments dans un select-form, en fonction de l'id du select-form
     * prend une liste d'éléments (items) et l'ID du select HTML (selectId)
     * @param {Array} items 
     * @param {string} selectId 
     */
    function displayOptionsInSelectForm(items, selectId) {
    //seuls les éléments uniques sont ajoutés au select
        const uniqueItems = [...new Set(items)];
        //pr chaque élément unique, une option est créée et ajoutée à la liste déroulante appropriée
        uniqueItems.forEach(function(item, index) {
            //on séléctionne l'élément ayant l'id renseigné 
            const selectElement = document.querySelector(`#${selectId}`);
            //on select le formulaire ouvert
            const openFormSelect = selectElement.querySelector('.open-form-select');
            //on select les option du form-select
            const optionElement = document.createElement('option');
            
            //on ajoute la valeur d'une option en l'incrémentant à chaque tour de boucle
            optionElement.setAttribute('value', index + 1);
            //on ajoute le nom de l'élément
            optionElement.innerHTML = item;

            //on ajoute les éléments créés à l'élément parent
            openFormSelect.appendChild(optionElement);
            selectElement.appendChild(openFormSelect);
        });
    }

    //affiche la liste des ingrédients dans #ingredient-select
    const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
    displayOptionsInSelectForm(ingredients, 'ingredient-select');

    //affiche la liste des appareils dans #appliance-select
    const appliances = recipes.map(recipe => recipe.appliance);
    displayOptionsInSelectForm(appliances, 'appliance-select');

    //affiche la liste des appareils dans #ustensil-select
    const ustensils = recipes.flatMap(recipe => recipe.ustensils);
    displayOptionsInSelectForm(ustensils, 'ustensil-select');


    
    const selectFormTitles = document.querySelectorAll('.select-form-title');

    //ajoute un event listener click sur chacun des select-form
    selectFormTitles.forEach(function(selectFormTitle) {
        const selectForm = selectFormTitle.closest('.select-form');
        const openSelectForm = selectForm.querySelector('.open-form-select');
        const selectFormIcon = selectForm.querySelector('.select-form-icon');
        const input = selectForm.querySelector('.search-input');
        const clearIcon = selectForm.querySelector('.clear-icon');
  
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
        
        //event listenner sur l'input des select-form
        input.addEventListener('input', function() {
            if (input.value.length > 0) {
                clearIcon.style.display = 'block';
            } else {
                clearIcon.style.display = 'none';
            }
        });
  
        clearIcon.addEventListener('click', function() {
            input.value = '';
            clearIcon.style.display = 'none';
            input.focus();
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
