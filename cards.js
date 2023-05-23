
let ModalForEditCard = document.querySelector('.modalEditCard')
let inputEdit = document.querySelector('#inputEditCard');
let dateModalInput = document.querySelector('#date-input');
let progressStatus = document.querySelector('#progressOptions');
let priorityCard = document.querySelector('#priorityCard');
let InputHiddenColumn = document.querySelector('#idColumnHidden');
let inputIdCard = document.querySelector('#idHidden');


const dataArrCards = JSON.parse(localStorage.getItem('db_Cards')) ?? [];

let setLocalStorageCards = () => { localStorage.setItem('db_Cards', JSON.stringify(dataArrCards)); };


(function loadCards() {

    cardsAdd();
})();

function openInputCardModal(e, columnTitle, idColumn) {
    e.preventDefault();

    let divInsertForModal = document.querySelector('.modalCard');
    let ColumnId = idColumn;
    const modalHTML =
        `
        <div class="cardModal">
                <i class="fa-solid fa-xmark" id="btnCloseModal" onclick="closeModal()" ></i>
                <h1 class="ColumnCard">${columnTitle}</h1>

                <div class="area-todo">
                    <form>
                        <input placeholder="Insira um nome para a tarefa" type="text" id="todo-card" autocomplete="off">
                    </form>
                </div>

                <div class="controll-status">
                    <div class="date-concluded">
                        <span class="spanDate">
                            <label id="date-label" for="date">Prazo para conclusão</label>
                        </span>
                        <input id="date-input" max="9999-12-31" type="date">
                    </div>

                    <div class="area-progress">
                        <span class="spanProgress">
                           <p> Progresso </p>
                        </span>
                        
                        <select name="progresso" id="progressOptions">
                            <option value="Não Iniciada"> Não Iniciada </option>
                            <option value="Em andamento"> Em andamento </option>
                            <option value="Concluída"> Concluída </option>
                        </select>

                    </div> 


                    <div class="area-priority">
                        <p> Prioridade </p>
                        <select name="Prioridade" id="priorityCard">

                            <option> Baixa </option>
                            <option> Média </option>
                            <option> Importante </option>
                            <option> Urgente </option>
                        </select>
                    </div>
                </div>

                <div class="area-modalBtnCard">
                    <button class="btn-modalCard" onclick="createCards(${ColumnId})"   id="addCard"> 
                    Adicionar tarefa 
                    </button>


                </button>
                 </div>

        </div>
    `

    divInsertForModal.innerHTML = modalHTML;
    divInsertForModal.classList.add('active');
}

function closeModal() {
    document.querySelector('.modalCard').classList.remove('active');
}


function createCards(idColumn) {

    let inputNameCard = document.querySelector('#todo-card');
    let inputDateCard = document.querySelector('#date-input');
    let inputProgressCard = document.querySelector('#progressOptions');
    let inputPriorityCard = document.querySelector('#priorityCard');


    const cards = {
        idColumn: idColumn,
        id: Math.floor(Math.random() * 1000),
        titleCard: inputNameCard.value,
        date: inputDateCard.value,
        progress: inputProgressCard.value,
        priority: inputPriorityCard.value
    }

    if (cards.titleCard && cards.date) {

        dataArrCards.push(cards);
        setLocalStorageCards();
        cardsAdd();

    } else {

        window.alert('Preencha todos os campos para adicionar uma tarefa.')
    }


    inputNameCard.value = ''
    inputDateCard.value = ''
    inputProgressCard.value = ''
    inputPriorityCard.value = ''

    closeModal()
}


function cleatHtmlColumns() {
    let divs = document.querySelectorAll('[data-id]');

    divs.forEach(div => {
        div.innerHTML = '';
    })
}

function cardsAdd() {

    cleatHtmlColumns();

    dataArrCards.forEach((card) => {

        let divForInsertCards = document.querySelector
            (`[data-id ="${card.idColumn}"]`);


        let cardHTML =

        `
            <div class="card">

                <input autocomplete="off"  type="hidden" id="idHidden" value="${card.id}">

                <div class="card-header">

                 <h3 class="titleCard">${card.titleCard}</h3>

                 <p onclick="openModalOptionsCard(event)"> ... </p> 

                </div>
            
                <ul class="box-OptionsCard">

                    <li onclick="editModal(${card.id})"> 
                    <i class="fa-solid fa-pencil"></i>
                    Editar </li>
                    <li> 
                    Excluir 
                    <i class="fa-solid fa-trash-can"></i>
                    </li> 

                </ul>
           
         
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

        divForInsertCards.innerHTML += cardHTML;

    })


}

function openModalOptionsCard(event) {
    let divButtons = event.target.parentElement.offsetParent.children[2]; 
    divButtons.classList.toggle('active');
}


function editModal(id) {
    ModalForEditCard.classList.add('active');


    const indexCard = dataArrCards.findIndex((card) => {
        return card.id == id;

    })

    const card = dataArrCards[indexCard];


    inputEdit.value = card.titleCard;
    dateModalInput.value = card.date;
    progressStatus.value = card.progress;
    priorityCard.value = card.priority;

}






function closeEditModal() {

    ModalForEditCard.classList.remove('active');

}