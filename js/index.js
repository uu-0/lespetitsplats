document.addEventListener('DOMContentLoaded', () => {
    //permet de limiter la longueur de la description d'une recette
    function hideDescription(description) {
        if (description.length > 178) {
            return description.substring(0, 178) + '...';
        } else {
            return description;
        }
    }

    //total des recettes
    const blocTotalRecettes = document.querySelector('.bloc-total-recettes');
    blocTotalRecettes.innerHTML = recipes.length + " recettes";

    const recettesContainer = document.querySelector('.cards-container');

    //affiche les recettes
    recipes.forEach(recipe => {

        const cheminImage = `assets/photos/Recette${recipe.id}.jpg`;

        //colonne d'une card recette
        const colRecetteCard = document.createElement('div');
        colRecetteCard.classList.add('col');

        //élément card div pour une recette
        const recetteCard = document.createElement('div');
        recetteCard.classList.add('card');

        //temps de préparation
        const recetteTime = document.createElement('div');
        recetteTime.classList.add('card-time');
        recetteTime.innerHTML = `${recipe.time}min`;
        recetteCard.appendChild(recetteTime);

        //image recette
        const recetteImage = document.createElement('img');
        recetteImage.setAttribute("src", cheminImage);
        recetteImage.setAttribute("alt", recipe.name);
        recetteImage.classList.add('card-img-top');
        recetteCard.appendChild(recetteImage);

        //recette card body
        const recetteCardBody = document.createElement('div');
        recetteCardBody.classList.add('card-body');
        recetteCard.appendChild(recetteCardBody);

        //nom recette
        const nameRecette = document.createElement('h2');
        nameRecette.textContent = recipe.name;
        recetteCardBody.appendChild(nameRecette);

        //description : titre
        const descriptionTitle = document.createElement('b');
        descriptionTitle.textContent = 'RECETTE';
        recetteCardBody.appendChild(descriptionTitle);

        //description recette : éléments
        const descriptionRecette = document.createElement('p');
        descriptionRecette.innerHTML =  hideDescription(recipe.description);
        recetteCardBody.appendChild(descriptionRecette);

        //liste des ingrédients : titre
        const ingredientsTitle = document.createElement('b');
        ingredientsTitle.textContent = 'INGRÉDIENTS';
        recetteCardBody.appendChild(ingredientsTitle);

        //liste des ingrédients: container
        const ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList.add('card-ingredients-group');
        recetteCardBody.appendChild(ingredientsContainer);

        //liste des ingrédients: éléments
        recipe.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('div');
            ingredientItem.classList.add('card-ingredient');

            const ingredientItemNom = document.createElement('p');
            ingredientItemNom.textContent = ingredient.ingredient;
            ingredientItem.appendChild(ingredientItemNom);

            const ingredientItemQuantite = document.createElement('span');
            ingredientItemQuantite.textContent = `${ingredient.quantity ? ` ${ingredient.quantity}` : ''} ${ingredient.unit || ''}`;
            ingredientItem.appendChild(ingredientItemQuantite);

            ingredientsContainer.appendChild(ingredientItem);
        });

        recetteCardBody.appendChild(ingredientsContainer);
        colRecetteCard.appendChild(recetteCard);
        recettesContainer.appendChild(colRecetteCard);
    });
});