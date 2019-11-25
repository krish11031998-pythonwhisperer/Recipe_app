import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResult() {
        const url = 'https://forkify-api.herokuapp.com/api/search'
        try{
            const res = await axios(`${url}?q=${this.query}`);
            this.recipes = res.data.recipes;
            // console.log(this.recipes);
        } catch(error){
            alert(error)
        }
    }
    
}