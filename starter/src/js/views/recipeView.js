import {elements} from './base'
import {Fraction} from 'fractional'

export const recipe_data = (recipe) =>{
    console.log(recipe.title);
    recipe.ingredients.forEach((element,index) => {
        console.log(`${index+1}: ${element}`);
    });
}

// const formatCount = count => {
//     if(count){

//         count = Math.round(count*1000)/1000;
//         const [int, dec] = count.toString().split('.').map(el => parseInt(el));

//         if(!dec){
//             return count
//         }

//         if(int === 0){
//             const fr = new Fraction(count);
//             return `${fr.numerator}/${fr.denominator}`;
//         }else{
//             const fr = new Fraction(count-int)
//             return `${int} ${fr.numerator}/${fr.denominator}`
//         }
        
//     }
//     return '?'
// }
export const reset_recipe = () =>{
    elements.recipe.innerHTML = '';
}
export const render_recipe = (recipe,isLiked) => {
    let list_html = ``;
    recipe.ingredients.forEach(el => {
        let temp_html = recipe_ingredients(el);
        if (list_html){
            list_html+=temp_html;
        }
        else{
            list_html = temp_html;
        }
    });
    let html_tag = `
        <figure class="recipe__fig">
            <img src="${recipe.recipe_img}" alt="Tomato" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">45</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings.toString()}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love recipe__love--add">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${(isLiked) ? '': '-outlined'}"></use>
            </svg>
        </button>
    </div>
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${list_html}
        </ul>
        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
            </p>
        <a class="btn-small recipe__btn" href="${recipe.src_url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>


    `;

    let total_html = html_tag;
    elements.recipe.insertAdjacentHTML('afterbegin',total_html);
}

const recipe_ingredients = (ingredient) => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count"></div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.count} ${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

export const clearFields = () =>{
    elements.recipe.innerHTML = '';
}