export const elements = {
    search_button : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    search_res_list: document.querySelector('.results__list'),
    search_res : document.querySelector('.results'),
    search_res_pages : document.querySelector('.results__pages'),
    recipe : document.querySelector('.recipe'),
    shopping_list : document.querySelector('.shopping__list'),
    like_list : document.querySelector('.likes__list'),
    recipe_love : document.querySelector('.recipe__love'),
    likesMenu : document.querySelector('.likes__field')
};

export const elementString = {
    loader: "loader"
}

export const renderSpinner = parent =>{
    const loader = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>  
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
}

export const clearSpinner  = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}

