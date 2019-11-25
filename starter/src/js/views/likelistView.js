import {elements} from './base'
import { clearRecipe } from './searchView';

export const addlike_list = (element) => {
    console.log(element)
       let final_tag =         
                `
                <li>
                    <a class="likes__link" href="#${element.id}">
                        <figure class="likes__fig">
                            <img src="${element.image}" alt="Test">
                        </figure>
                        <div class="likes__data">
                            <h4 class="likes__name">${element.title} ...</h4>
                            <p class="likes__author">${element.publisher}</p>
                        </div>
                    </a>
                </li>
                `;
            

        elements.like_list.insertAdjacentHTML('beforebegin',final_tag);
}

export const clearlikelist = () => {
    console.log(`This is list is being cleared`);
    elements.like_list.innerHTML = ``;
}

export const togglelikemenu = numLikes => {
    elements.likesMenu.style.visibility  = numLikes > 0? 'visible' : 'hidden';
}

export const togglelikebtn = isliked => {
    let love_element = "icon-heart"
    let love_btn = document.querySelector('.recipe__love use')
    if(isliked){
        love_btn.setAttribute('href',`img/icons.svg#${love_element}`);
    }
    else{
        love_element+='-outlined';
        love_btn.setAttribute('href',`img/icons.svg#${love_element}`);
    }

}

export const delete_like = (id) => {
    let element = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (element) element.parentElement.removeChild(element);
}