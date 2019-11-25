import Search from './models/Search'
import * as searchView from './views/searchView'
import {elements, renderSpinner,clearSpinner} from './views/base'
import Recipe from './models/Recipe'
import * as recipeVIew from './views/recipeView'
import shopping_list from './models/Shopping_list'
import * as shop_list from './views/shoppinglistViews'
import Likes from './models/Likelist'
import * as like_views from './views/likelistView'
/**Global state for the app
 * - Search object
 * - Curent recipe object
 * - Shopping list object
 * -  Liked recipes
 */
const state= {};
window.state = state;
const displayquery = async () => {

    // 1) recive the query from the search bar 
    let query = searchView.getInput();
    console.log(query);


    if(query){
        // 2) search and display result
        state.search_query = new Search(query)
        //3) Prepare UI fro changes
        try{
            searchView.clearInput();
            searchView.clearResult();
            renderSpinner(elements.search_res);
            
            //4) Search for the given qeury
            await state.search_query.getResult();
            //5) Render the query search into the UI
            console.log(state.search_query.recipes);
            clearSpinner();
            searchView.renderResult(state.search_query.recipes);
        }catch(err){
            console.log(`Error : ${err}`);
        }
    }
} 

window.addEventListener('load',e =>{
    e.preventDefault();
    displayquery('pizza');
})

window.addEventListener('load',e=> {
    state.likelist = new Likes();
    state.likelist.readData();
    state.likelist.likes.forEach(el => {
        like_views.addlike_list(el);
    })
    like_views.togglelikemenu(state.likelist.getnumlikes());

})

const displayRecipe = async () => {

    const id = window.location.hash.replace('#','');
    console.log(id);
    if(id){
        recipeVIew.clearFields();
        renderSpinner(elements.recipe);

        if (state.search_query) searchView.highlightselected(id);

        state.recipe = new Recipe(id);
        try{
            await state.recipe.getRecipe_details_api();
            console.log(state.recipe);
            // recipeVIew.recipe_data(state.recipe);
            clearSpinner();
            shop_list.reset_list();
            recipeVIew.render_recipe(state.recipe,state.likelist.isliked(id));
        }catch(err){
            console.log(`Error : ${err}`); 
        }
    }

}


const displayShopping = () => {

    if(state.recipe){
        state.grocery_list = new shopping_list(state.recipe.ingredients);
        // console.log(state.grocery_list.ingredients_list)
        shop_list.updateshoppinglist(state.grocery_list.ingredients_list);
    }

}


const displaylike = () =>{

    if (state.recipe){
        if(!state.likelist) state.likelist = new Likes();
        let currentID = state.recipe.id
        if(!state.likelist.isliked(currentID)){
            let new_like = state.likelist.addLikes(state.recipe);
            // document.querySelector('.recipe__love').classList.add('recipe__love--add')
            like_views.togglelikebtn(true);
            console.log(state.likelist.likes);
            like_views.addlike_list(new_like);
            console.log(state.likelist.isliked(currentID));
        }else{

            console.log('recipe not being liked');
            state.likelist.deletelike(currentID);
            like_views.togglelikebtn(false);
            like_views.delete_like(currentID);

            console.log(state.likelist.likes)

        }
        like_views.togglelikemenu(state.likelist.getnumlikes());
    }
}

elements.search_button.addEventListener('submit', e => {
    e.preventDefault();
    displayquery();
})
// const pizza = new Search('pizza');
// console.log(pizza);
// pizza.getResult();

elements.search_res_pages.addEventListener('click',e =>{
    let goTopage = parseInt(e.target.closest('.btn-inline').dataset.goto, 10);
    searchView.clearRecipe();
    searchView.renderResult(state.search_query.recipes,goTopage);

    console.log(goTopage);

});

['hashchange','load'].forEach(event => window.addEventListener(event,displayRecipe));

elements.recipe.addEventListener('click', e=>{
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        state.recipe.updateServing('dec');
        console.log(state.recipe);
        recipeVIew.reset_recipe();
        recipeVIew.render_recipe(state.recipe);
        shop_list.reset_list();
        displayShopping();

    }else if (e.target.matches('.btn-increase, .btn-increase *')){

        state.recipe.updateServing('inc');
        console.log(state.recipe);
        recipeVIew.reset_recipe();
        recipeVIew.render_recipe(state.recipe);
        shop_list.reset_list();
        displayShopping();
    }else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        shop_list.reset_list();
        displayShopping();
    }else if (e.target.matches('.recipe__love, .recipe__love *')){
            displaylike();
    }

})



// elements.recipe.addEventListener('click', e =>{
//     console.log(e.target.closest('.recipe__btn'));
//     displayShopping();
// })

elements.shopping_list.addEventListener('click',e =>{
    let id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        console.log(id);
        state.grocery_list.deleteitem(id);

        shop_list.deleteitem(id);
    }else if(e.target.matches('.shopping__count-value')){

        let new_value = parseFloat(e.target.value);

        state.grocery_list.updateCount(id,new_value);

    }

})