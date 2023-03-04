// const $formAddCard = document.querySelector('.formAddCard');
// const btnAddCard = document.querySelector('.btn--todoadd');
// const $inputCard = document.querySelector('#inputCard');
// const cardDiv = document.querySelector('.cardDiv');
// const fatherDiv = document.querySelector('.todo-column')

// let arrCards = [];

// $formAddCard.addEventListener('submit', getInputCard);

// function getInputCard(e){
//     e.preventDefault();

//     const Cards = {
//         id: Math.floor(Math.random() * 9999),
//         inputCard: $inputCard.value,

//     }

//     if( Cards.inputCard == 0){
//         window.alert('Campo vazio, por favor, informe uma nova tarefa para sua lista!'); 
//     }else{

//         arrCards.push(Cards);
//         CardsAdd();

//     }
   

//     $inputCard.value = "";
// }


// function CardsAdd(){
//    const CardsGenerate = arrCards.map((cards)=>{

//         return `
//             <div class="card">
//                 <h3 class="titleCard">${cards.inputCard}</h3>
//                 <div class="card-components">
                            
//                     <div class="buttonsCard">
//                         <i class="fa-solid fa-check btn-cardDone"></i>
//                         <i class="fa-solid fa-pencil  btn-cardEdit"></i>
//                         <i class="fa-solid fa-trash btn-cardDel"></i>
//                     </div>

//                         <div class="box-statusCard">
//                             <span class="cardPendency">
//                                 <i class="fa-regular fa-clock"></i>
//                                 Pendente 
//                             </span>
                            
//                             <span class="cardConcluded"> Concluído </span>

//                         </div>

//                 </div>

//             </div> 
        
//         `;

//     })

//     const cardToString = CardsGenerate.join('');
//     cardDiv.innerHTML= cardToString;  
// }

// console.log(arrCards);