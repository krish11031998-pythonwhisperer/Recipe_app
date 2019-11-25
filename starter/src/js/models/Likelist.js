import uniqid from 'uniqid'
export default class Likes {
    constructor(recipe){

        this.likes = new Array();

    }

    addLikes(recipe){
        let likeObj;
        likeObj = {
        id : recipe.id,
        title : recipe.title,
        image : recipe.recipe_img,
        publisher : recipe.publisher
        }
        console.log(`This is the object : ${likeObj}`);
        this.likes.push(likeObj);
        // persist Data
        this.persistData();
        return likeObj
    }


    deletelike(id){
        let index = this.likes.findIndex(el => el.id == id);
        this.likes.splice(index,1);

        //persist data 
        this.persistData();
    }

    isliked(id){
        if (this.likes.findIndex(el => el.id === id) !== -1){
            return true
        }
        else{
            return false
        }
    }
    
    getnumlikes() {
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('Likes',JSON.stringify(this.likes))
    }

    readData(){
        let storage = JSON.parse(localStorage.getItem('Likes'));


        if (storage){
            this.likes = storage;
            
        }
    }
}