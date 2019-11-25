import axios from 'axios'
import { throws } from 'assert';
export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe_details_api(){
        const url = 'https://forkify-api.herokuapp.com/api/get';
        try{
            this.recipe_d = await axios(`${url}?rId=${this.id}`);
            // console.log(recipt_d);
        }catch(error){
            console.log(error);
        }
        this.getRecipe_details();
    }

    getRecipe_details(){
        this.servings = 4;
        this.title = this.recipe_d.data.recipe.title;
        this.ingredients = this.recipe_d.data.recipe.ingredients;
        this.ingredients = this.ingredientsObj();
        this.recipe_img = this.recipe_d.data.recipe.image_url;
        this.src_url = this.recipe_d.data.recipe.source_url;
        this.publisher = this.recipe_d.data.recipe.publisher;
        this.publisher_url = this.recipe_d.data.recipe.publisher_url;
    }

    calcTime(){
        const numImg = this.ingredients.length;
        const periods = Math.ceil(numImg/2);
        this.time = periods*15;
    }

    calcServings(){
        this.servings = 4;
    }

    ingredientsObj(){

        let full_form = ['tablespoons', 'tablespoon', 'teaspoon', 'teaspoons' , 'ounce','ounces', 'cups', 'pounds']
        let form_maps = new Map()
        form_maps.set('tablespoons','tbsp')
        form_maps.set('tablespoon','tbsp')
        form_maps.set('teaspoon','tsp')
        form_maps.set('teaspoons','tsp')
        form_maps.set('ounces','oz')
        form_maps.set('ounce','oz')
        form_maps.set('cups','cup')
        form_maps.set('pounds','lb(s)')
        let short_form = ['tbsp','tsp','oz','ozs','cup','lb(s)'];

        // Changing the full_forms to short_forms

        let new_ingredients = this.ingredients.map(el => {

            let ingredient = el.toLowerCase();
            full_form.forEach(element => {
                if (ingredient.includes(element)){
                    console.log(`the ingredient has ${element} in it`)
                    ingredient  = ingredient.replace(element,form_maps.get(element));
                }
            });

            // ingredients replace 
            ingredient.replace(/ *\([^)]*\) */g,'');

            // spliting the ingredients here

            let Ings = ingredient.split(' ');
            let indexVal = Ings.findIndex(el => short_form.includes(el));

            let objIng;
            if(indexVal > -1){

                let count_arr = Ings.slice(0,indexVal);

                let count;
                if(count_arr.length == 1){
                    count  = eval(count_arr[0].replace('-','+'));
                }
                else{
                    count = eval(count_arr.join('+'));
                }

                objIng= {
                    count: count,
                    unit: Ings[indexVal],
                    ingredient : Ings.slice(indexVal+1).join(' ')
                }
            }else if (parseInt(Ings[0],10)){
                objIng = {
                    count: parseInt(Ings[0],10),
                    unit: ' ',
                    ingredient : Ings.slice(1).join(' ')
                }
            }
            else if (indexVal === -1){
                objIng = {
                    count: 1,
                    unit: "",
                    ingredient: Ings.join(' ')
                }
            }

            return objIng

        });

        // change t
        return new_ingredients
    }
    
    // ingredient_object(){
    //     let ingredient_obj;
    //     this.ingredients.map(el => {
            
    //     })
    // }

    updateServing(type){

        //Servings
        let newServings;
        (type =='dec') ? newServings = this.servings - 1 : newServings = this.servings + 1;
        //Ingredients

        this.ingredients.forEach(ing => {
            console.log(`Before : ${ing.count}`);
            console.log(`newServings : ${newServings}`);
            ing.count *= (newServings/ this.servings);
            console.log(`After : ${ing.count}`);
        })

        this.servings = newServings;
        console.log(this.servings);
    }

}

