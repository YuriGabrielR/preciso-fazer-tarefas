
const inputColorBg = document.querySelector('#inputColor--setColor');

function setThemeLocalStorage(color) {

    let getColorLocalStorage = localStorage.getItem('colorTheme', color);

    document.body.style.backgroundColor = getColorLocalStorage;
    inputColorBg.value = getColorLocalStorage;
};


inputColorBg.addEventListener('input', (e) => {
    let valueColor = inputColorBg.value;
    let colorStorage = localStorage.setItem('colorTheme', valueColor);

    setThemeLocalStorage(colorStorage);
});

(function themeSelectLoad() {

    setThemeLocalStorage();

})();


let openModalGalleryImages = document.querySelector('.btn--setImageBackground');

openModalGalleryImages.addEventListener('click', ()=>{

    document.querySelector('.modalImagesBg').classList.add('active');

})

let inputSearchImages = document.querySelector('#searchImages');
let messageErrorSearchImages = document.querySelector('.error');

inputSearchImages.addEventListener('keypress', inputKeypress)

function inputKeypress({ key, target }) {
    let inputSearchValue = target.value;

    if (key === 'Enter') {

        galleryImages(inputSearchValue);

    }
    // else{
    //  messageErrorgalleryImages.classList.add('active')
    // }
}


async function galleryImages(searchText, page=1) {

    let dataImages = await getDataImages(`${searchText}&page=${page}`);

    let images = dataImages.hits;
    let totalHits = dataImages.totalHits; 
    let totalPages = Math.ceil(totalHits/20); 
   

    createImagesHtml(images, totalPages);

    document.querySelector("#pageNumberInput").value = page;
}

function resetImagesHtml(){
 document.querySelector('.images').innerHTML='';
}


async function getDataImages(searchText) {

    let keyUrl = await `https://pixabay.com/api/?key=35709897-b3e766a02865d6992119cbd7b&q=${searchText}`;


    let reqDataImages = await fetch(keyUrl).then(response => response.json());

    return reqDataImages;

}

let inputPagination = document.querySelector("#pageNumberInput"); 

inputPagination.addEventListener('keypress', handleKeypressPage); 

 function handleKeypressPage({key, target}){
    let searchValue = document.querySelector('#searchImages').value;

    if(key === 'Enter'){

        console.log(searchValue); 
        console.log(target.value);
        galleryImages(searchValue, target.value)
    }
}

let nextPageBtn = document.querySelector('.nextPage'); 

nextPageBtn.addEventListener('click', handleNextPageButton); 

function handleNextPageButton(){
    let searchValue = document.querySelector('#searchImages').value;
    let inputPagination = Number(document.querySelector("#pageNumberInput").value); 
    let totalHits = Number(document.querySelector('#hitsNumber').textContent.replace('/', '')); 

    if(inputPagination < totalHits){
        inputPagination++;

        galleryImages(searchValue, inputPagination);

    }

}

let previousPageButton = document.querySelector('.previousPage'); 

previousPageButton.addEventListener('click', handlePreviousPageButton)

function handlePreviousPageButton(){

    let searchValue = document.querySelector('#searchImages').value;
    let inputPagination = Number(document.querySelector("#pageNumberInput").value); 
  
    if(inputPagination > 1){
        inputPagination--;

        galleryImages(searchValue, inputPagination);
    }

}

function createImagesHtml(images, totalPages){
    
   
    resetImagesHtml();

    images.forEach(img => {
        let divForInsertImgs = document.querySelector('.images');
        const imgsHTML = `
        <span class="box-image">
            <img src="${img.webformatURL}" alt="">

                        <span class="buttons-image">

                            <button onclick="setImageBackground('${img.largeImageURL}')">
                                <i class="fa-solid fa-plus"></i>
                                
                            </button>

                            <button id="addImageForBg">
                                <i class="fa-solid fa-circle-info"></i>
                                Info
                            </button>

                        </span>

                    </span>
        
        
        `

        divForInsertImgs.innerHTML += imgsHTML
    })
    
    
   let pagesElement = document.querySelector('#hitsNumber'); 
       pagesElement.textContent = `/ ${totalPages}`;

}

function setImageBackground(url){

 let urlImage =  localStorage.setItem('imageThemeBg', url);
 
 insertImageBackground(urlImage);

 closeGallery();

}

let closeGalleryBtn = document.querySelector('.closeGallery');

closeGalleryBtn.addEventListener('click', closeGallery)

function closeGallery(){
    document.querySelector('.modalImagesBg').classList.remove('active');

}

function insertImageBackground(url){

    let image = localStorage.getItem('imageThemeBg', url); 

    document.body.style.backgroundImage = `url(${image})`;

}



(function loadImageBg(){

    insertImageBackground();
})()