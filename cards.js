// import {arrColumns} from "./column.js"

const $inputNameCard = document.querySelector('#todo-card');
const $inputDateCard = document.querySelector('#date-input');
const $inputProgressCard = document.querySelector('#progressOptions');
const $inputPriorityCard = document.querySelector('#priorityCard'); 
const btnDoneCard = document.querySelector('#addCard');
const btnEditCard = document.querySelector('#editCard');
const btnModalOpen = document.querySelector('.btn--todoadd');
const btnModalClose = document.querySelector('#btnCloseModal');
const modalCard = document.querySelector('.modalCard');



// const ColumnsModule = arrColumns; 
// console.log(ColumnsModule);

 const arrCards = []; 

function openModal(e, id){
    e.preventDefault(); 
    modalCard.classList.add('active');
}

function closeModal(){
    modalCard.classList.remove('active');
}


function createCards(){


const cards = {
    id: Math.floor(Math.random() * 999),
    titleCard: $inputNameCard.value,
    date: $inputDateCard.value,
    progress: $inputProgressCard.value,
    priority: $inputPriorityCard.value
}
   
    if(cards.titleCard && cards.date){

        arrCards.push(cards);
        cardsAdd()
        closeModal()

    } else{

        window.alert('Preencha todos os campos para adicionar uma tarefa.')
    }

}


function cardsAdd(){
    const divFatherCard = document.querySelector('.cardDiv');
    const cardsHTML = arrCards.map((card)=>{

    return `
        <div class="card">
        <input autocomplete="off"  type="hidden" id="idHidden" value="${card.id}">
         <h3 class="titleCard">${card.titleCard}</h3>
         <div class="card-components">
             <div class="card-status">
                <p>
                 <i class="fa-solid fa-calendar-days"></i> 
                ${card.date}
                </p>
                <p>
                <i class="fa-solid fa-chart-bar"></i>
                 ${card.progress}
                </p>
             </div>
                <span>${card.priority}</span>
            </div>
            </div>
        `;
        
    })


   
    divFatherCard.innerHTML = cardsHTML.join('');
}


