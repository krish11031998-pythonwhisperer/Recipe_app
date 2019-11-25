import uniqid from 'uniqid'
export default class shopping_list{
    constructor(recipe){
        this.shop_ing_list = new Array ();
        recipe.forEach(element => {
            this.shop_ing_list.push(element);
        });
        // console.log(`THis is the shopping list : ${this.shop_ing_list}`);
        this.addingredient();
    }

    addingredient(){
        this.ingredients_list = new Array();
        this.ingredients_list = this.shop_ing_list.map(el =>{
            let objIng;
            objIng = {
                id : uniqid(),
                count: el.count,
                unit: el.unit,
                ingredient: el.ingredient
            }
            
            return objIng
        })
    }


    deleteitem(id){
        let delIndex = this.ingredients_list.findIndex(el => {
            if(el.id == id){
                return el
            }
        });
        this.ingredients_list.splice(delIndex,1);
    }

    updateCount(id,newCount){
        this.ingredients_list.find(el => el.id === id).count = newCount;
    }
}