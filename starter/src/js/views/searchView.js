import {elements} from './base'

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResult = () =>{
    elements.search_res_list.innerHTML = '';
}

export const highlightselected = id => {

    const resultsArr = Array.from(document.querySelectorAll('.results__link'));

    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}
const limitRecipetitle = (title,limit =17) =>{
    if(title.length > limit){
        const finalRecipetitle = []
        let current_len = 0
        let count = 0
        let title_arr = title.split(' ');
        // console.log(`First word : ${title_arr[count]}`)
        let word = title_arr[count]
        if (word){
            while (word != undefined && current_len+word.length<=limit){
                current_len+=word.length
                finalRecipetitle.push(word)
                count+=1
                word = title_arr[count];
            }
        }
        let new_recipe_title = `${finalRecipetitle.join(' ')}...`;
        return new_recipe_title
        // title.split(' ').reduce((acc,cur) =>{
        //     if(acc+cur.length <= limit){
        //         finalRecipetitle.push(cur);
        //     }
        //     return acc+cur.length;
        // },0);
        // let new_string  = `${finalRecipetitle.join(' ')}`;
        // return new_string
    }
    return title
}

export const clearRecipe = () =>{
    elements.search_res_list.innerHTML = '';
    elements.search_res_pages.innerHTML = '';

}


const renderRecipe = recipe =>{
    // let html_tag = `<li><a class="results__link results__link--active" href="#23456"><figure class="results__fig"><img src="img/test-1.jpg" alt="Test"></figure><div class="results__data"><h4 class="results__name">Pasta with Tomato ...</h4><p class="results__author">The Pioneer Woman</p></div></a></li>`;
    let new_recipe_title = limitRecipetitle(recipe.title,17)
    const html_tag = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${new_recipe_title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.search_res_list.insertAdjacentHTML('beforeend',html_tag);

} 

const create_button = (page,type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type == 'next'? page+1 : page-1}>
        <span>Page ${type == 'next' ? page+1 : page-1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${ type == 'next' ? 'right' : 'left'}"></use>
        </svg>
    </button>
    `;

const renderButton = (page, numofRes, res_per_page) => {
    let pages = Math.ceil(numofRes/res_per_page);

    let button 
    if(page ===1 && pages>1){
        //Add one button on the right
        button = create_button(page,'next')
    }
    else if (page < pages){
        //Add two buttons
        button = `
            ${create_button(page,'next')}
            ${create_button(page,'prev')}
        `;
    }
    else if (page ==pages && pages > 1){
        //Add third button 
        button = create_button(page,'prev');
    }

    elements.search_res_pages.insertAdjacentHTML('afterbegin',button);
}

export const renderResult = (recipes,page = 1, res_per_page=10) =>{

    const start = (page-1)*res_per_page;
    const end = page*res_per_page;
    recipes.slice(start,end).forEach(renderRecipe);
    
    renderButton(page,recipes.length,res_per_page);
}

