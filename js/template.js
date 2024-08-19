//permet de limiter la longueur de la description d'une recette
function hideDescription(description) {
    if (description.length > 178) {
        return description.substring(0, 178) + '...';
    } else {
        return description;
    }
}

//affiche les recettes
function displayRecipes(recipes) {
    //sélectionne le conteneur des recettes
    const recettesContainer = document.querySelector('.cards-container');
 
    //vide le conteneur avant d'ajouter de nouvelles recettes
    recettesContainer.innerHTML = '';
 
     //parcours chaque recette pour les afficher
     recipes.forEach(recipe => {
         const cheminImage = `assets/photos/Recette${recipe.id}.jpg`;
 
         //création colonne pour la card de la recette
         const colRecetteCard = document.createElement('div');
         colRecetteCard.classList.add('col');
 
         //création élément card pour la recette
         const recetteCard = document.createElement('div');
         recetteCard.classList.add('card');
 
         //ajt temps de préparation
         const recetteTime = document.createElement('div');
         recetteTime.classList.add('card-time');
         recetteTime.innerHTML = `${recipe.time}min`;
         recetteCard.appendChild(recetteTime);
 
         //ajt image de la recette
         const recetteImage = document.createElement('img');
         recetteImage.setAttribute("src", cheminImage);
         recetteImage.setAttribute("alt", recipe.name);
         recetteImage.classList.add('card-img-top');
         recetteCard.appendChild(recetteImage);
 
         //création corps de la card
         const recetteCardBody = document.createElement('div');
         recetteCardBody.classList.add('card-body');
         recetteCard.appendChild(recetteCardBody);
 
         //ajt le nom de la recette
         const nameRecette = document.createElement('h2');
         nameRecette.textContent = recipe.name;
         recetteCardBody.appendChild(nameRecette);
 
         //ajt le titre "RECETTE"
         const descriptionTitle = document.createElement('b');
         descriptionTitle.textContent = 'RECETTE';
         recetteCardBody.appendChild(descriptionTitle);
 
         //ajt description de la recette
         const descriptionRecette = document.createElement('p');
         descriptionRecette.innerHTML = hideDescription(recipe.description);
         recetteCardBody.appendChild(descriptionRecette);
 
         //ajt titre "INGRÉDIENTS"
         const ingredientsTitle = document.createElement('b');
         ingredientsTitle.textContent = 'INGRÉDIENTS';
         recetteCardBody.appendChild(ingredientsTitle);
 
         //création conteneur pour les ingrédients
         const ingredientsContainer = document.createElement('div');
         ingredientsContainer.classList.add('card-ingredients-group');
         recetteCardBody.appendChild(ingredientsContainer);
 
         //ajt chaque ingrédient à la liste
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
 
         //ajt la card complète à la colonne
         colRecetteCard.appendChild(recetteCard);
 
         //ajt la colonne au conteneur des recettes
         recettesContainer.appendChild(colRecetteCard);
     });
 }