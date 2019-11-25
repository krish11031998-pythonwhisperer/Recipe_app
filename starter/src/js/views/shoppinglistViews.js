import {elements} from './base'
export const updateshoppinglist = (s_list) =>{
    let html_tag;
    
    s_list.forEach(element => {
        console.log(element);
        if (!html_tag){
            html_tag= `
            <li class="shopping__item" data-itemid=${element.id}>
            <div class="shopping__count">
                <input type="number" value="${element.count}" step="${element.count}" class="shopping__count-value">
                <p>${element.unit}</p>
            </div>
                <p class="shopping__description">${element.ingredient}</p>
                <button class="shopping__delete btn-tiny"  value="#${element.id}">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </li>
            `;
        }
        else{
            html_tag += `
            <li class="shopping__item" data-itemid=${element.id}>
                <div class="shopping__count">
                    <input type="number" value="${element.count}" step="${element.count}" class="shopping__count-value">
                    <p>${element.unit}</p>
                </div>
                <p class="shopping__description">${element.ingredient}</p>
                <button class="shopping__delete btn-tiny"  value="#${element.id}">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </li>
            `;
        }
    });

    elements.shopping_list.insertAdjacentHTML('beforeend',html_tag);

}

export const reset_list = () =>{
    elements.shopping_list.innerHTML = '';
}

export const deleteitem = (id) =>{
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
}   
