const formColumn = document.querySelector('.column__form');
const formColumnInput = document.querySelector('.column__input');
const formColumnId = document.querySelector('#column__id');
const formColumnEdit = document.querySelector('#editColumn');
const columnEditBtnOpen = document.querySelector('.btn-cardEditColumn');
const columnEditBtnClose = document.querySelector('.closeModalEdit');
const columnEditBtnSave = document.querySelector('.doneModalEdit');
const divColumn = document.querySelector('.column');
const divEditModal = document.querySelector('.modalEditColumn');
const InputHiddenColumn = document.querySelector('#idColumnHidden');
const inputIdCard = document.querySelector('#idHidden');

//banco de dados das colunas no local storage;
const  dataColumns = JSON.parse(localStorage.getItem('db_Columns')) ?? []; 
let setLocalStorage = ()=> { localStorage.setItem('db_Columns', JSON.stringify(dataColumns));}

//banco de dados dos cards no local storage;
const dataArrCards = JSON.parse(localStorage.getItem('db_Cards')) ?? [];
let setLocalStorageCards = () => { localStorage.setItem('db_Cards', JSON.stringify(dataArrCards)); };


//Função responsável pela pré-renderização dos elementos;
(function loadContents(){
    generateColumn(); 
    generateCard();
})(); 

formColumn.addEventListener('submit', getInputColumn);

function getInputColumn(e){
    e.preventDefault();

    const column = {

      id: Math.floor(Math.random() * 999),  
      titleColumn: formColumnInput.value,

    }

    if(column.titleColumn){ 

  
        dataColumns.push(column);
        setLocalStorage(); 
        generateColumn();
        generateCard();
        
    }
    
     else {
        window.alert('Campo vazio, por favor, informe um nome para sua nova lista!');
       
    }

    formColumnInput.value= "";
}

function resetColumnsHtml(){
    document.querySelector('.column').innerHTML='';
}

 function generateColumn (){
   resetColumnsHtml(); 

     dataColumns.forEach( (column, index) => {
        const ColumnsHTML = `
            <div class="column__components" data-index="${index}" > 

                <input autocomplete="off"  type="hidden" id="idHidden" 
                value="${column.id}">
                
                <div class="column__header">
                    
                    <h3 class="column__title">${column.titleColumn}</h3>

                    <div class="btn--column">

                     <i class="fa-regular fa-pen-to-square btn--editColumn" onclick="editColumn(${column.id})">
                     </i>

                        <i class="fa-regular fa-trash-can btn--delColumn" 
                        onclick="delColumn(${column.id}, event)"
                        data-target="${column.id}"></i>
                        
                    </i> 
                </div>
                
                </div>
                    <div data-id="${column.id}" class="taskComponents"></div>

                    <div class="card">
                      <form class="card__form" data-idColumn= '${column.id}'>

                         <button class="card--btn" type="submit"           onclick="openInputCardModal(event, '${column.titleColumn}', ${column.id})">
                            <i class="fa-solid fa-plus"></i>
                            Adicione uma nova tarefa
                         </button>
                      </form>
                    
                    </div> 
            </div>

        `;            
        
    
        divColumn.innerHTML += ColumnsHTML;
       
        let columnArea = document.querySelectorAll('.column__components'); 

        columnArea.forEach((column) =>{

          
        })
       
    });

   

} 

function delColumn (id, e){
    e.preventDefault();
    let elementNode = e.target.parentNode.parentNode.parentNode;
    let targetBtnAttribute = e.target.getAttribute('data-target');

    let indexIdCards = e.target.parentNode.offsetParent.parentElement.childNodes[5].children;

    let arrayCards = [...indexIdCards]; 

    let idArr = arrayCards.map(card => {

        let value = Number(card.attributes[1].value);
        return value; 
    })


   let indexIds = dataArrCards.reduce((acc, value, index)=>{
    
        if(idArr.includes(value.id)){

            acc.push(index); 
        }

        return acc;
   
   }, []); 

   let sortIdx = indexIds.sort((a,b) =>{
    return b - a; 

   })

    if(id == targetBtnAttribute){
        let index = dataColumns.findIndex((column)=>{
            return column.id == id;
        })

        dataColumns.splice(index, 1);
        setLocalStorage();
        sortIdx.forEach((index)=>{
            dataArrCards.splice(index, 1);
            setLocalStorageCards();
        })

        elementNode.remove();
    }

    
}



function editColumn(id){

    divEditModal.classList.add('active');
    


    const idIndex = dataColumns.findIndex((column)=>{
        return column.id == id;
        
    })

    const indexColumn = dataColumns[idIndex];
    
    
    formColumnId.value = indexColumn.id;
    formColumnEdit.value = indexColumn.titleColumn;
    
  
}


function SaveEditModal(){
    
        const editColumn =
        {
            id: formColumnId.value,
            titleColumn: formColumnEdit.value

        }
  

     const idIndex = dataColumns.findIndex((column)=>{
        return column.id == formColumnId.value;

     })

     dataColumns[idIndex] = editColumn;
    
    
        generateColumn();
        setLocalStorage();
        generateCard();
        closeModalEdit();
}

columnEditBtnSave.addEventListener('click', SaveEditModal);


function closeModalEdit(){
    divEditModal.classList.remove('active');
}

columnEditBtnClose.addEventListener('click', closeModalEdit);


function openInputCardModal(e, columnTitle, idColumn) {
    e.preventDefault();

    let divInsertForModal = document.querySelector('.modalCard');
    let ColumnId = idColumn;
    const modalHTML =
    `
        <div class="cardModal">

            <i class="fa-solid fa-xmark" 
                id="btnCloseModal"
                onclick="closeModalCard()">
            </i>

            <h3 class="columnCard">${columnTitle}</h3>

            <form class="card__form">

                <input placeholder="Insira um nome para a tarefa" 
                type="text" 
                id="card__input" 
                autocomplete="off">

            </form>
                

            <div class="cardAttributes"> 
    
                <div class="date__attribute">

                    <label id="date-label" for="date-input">
                      
                      Prazo para conclusão
                      
                    </label>

                    <input id="date-input" max="9999-12-31" type="date">

                </div>

                <div class="progressAtributte">
                
                    <label for="progressOptions" class="spanProgress">

                        <p> Progresso </p>

                    </label>
                        
                    <select name="progresso" id="progressOptions">

                        <option value="Não Iniciada"> Não Iniciada </option>
                        <option value="Em andamento"> Em andamento </option>
                        <option value="Finalizada"> Finalizada </option>

                    </select>

                </div> 


                <div class="statusAttribute">
                    <p> Status </p>

                    <select name="Prioridade" id="selectStatus">

                        <option> Pendente </option>
                        <option> Concluída </option>
                        

                    </select>
                    
                    </div>
                </div>

                <div class="btnAddCard">

                    <button class="btn-modalCard" 
                        onclick="createCards(${ColumnId})"  
                        id="addCard"> 
                        Adicionar tarefa
                    </button>
                </div>

            </div>

        </div>
    `

    divInsertForModal.innerHTML = modalHTML;
    divInsertForModal.classList.add('active');
}

function createCards(idColumn) {

    let inputNameCard = document.querySelector('#card__input');
    let inputDateCard = document.querySelector('#date-input');
    let inputProgressCard = document.querySelector('#progressOptions');
    let inputStatusCard = document.querySelector('#selectStatus');


    const cards = {
        idColumn: idColumn,
        id: Math.floor(Math.random() * 1000),
        titleCard: inputNameCard.value,
        date: inputDateCard.value,
        progress: inputProgressCard.value,
        status: inputStatusCard.value
    }

    if (cards.titleCard && cards.date) {

        dataArrCards.push(cards);
        setLocalStorageCards();
        generateColumn(); 
        generateCard();
       

    } else {

        window.alert('Preencha todos os campos para adicionar uma tarefa.');
    }


    inputNameCard.value = ''
    inputDateCard.value = ''
    inputStatusCard.value = ''
    inputStatusCard.value = ''

    closeModalCard();
}

function closeModalCard() {
    document.querySelector('.modalCard').classList.remove('active');
}

function clearHtmlColumns() {
    let divs = document.querySelectorAll('[data-id]');

    divs.forEach(div => {
        div.innerHTML = '';
    })
}

function generateCard() {

    clearHtmlColumns();

    dataArrCards.forEach((card) => {

        let divForInsertCards = document.querySelector
        (`[data-id ="${card.idColumn}"]`);

        let cardHTML =
        `
            <div class="task" data-target ="${card.id}">

                <input autocomplete="off"  type="hidden" id="idHidden" value="${card.id}">

                <div class="task-header">

                 <h3 class="task__title">${card.titleCard}</h3>

                 <p onclick="openModalOptionsCard(event)"> ... </p> 

                </div>
            
                <ul class="task__options">

                    <li onclick="editTask(${card.id}, ${card.idColumn})"> 
                    
                    Editar </li>

                    <li class="deleteCard" onclick="deleteTask(${card.id}, event)"> 
                    Excluir 
                    
                    </li> 

                </ul>
           
         
                <div class="task__components">

                    <div class="task__atributtes">
                        <p>
                        <i class="fa-solid fa-calendar-days"></i> 
                        ${card.date}
                        </p>
                        <p>
                        <i class="fa-solid fa-chart-bar"></i>
                        ${card.progress}
                        </p>
                    </div>

                    <span>${card.status}</span>

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


function deleteTask(id, e){
    
    let elementForRemove = e.target.parentNode.parentNode; 
    let targetId = elementForRemove.attributes[1].value;

    if ( id == targetId){

        let index = dataArrCards.findIndex(card =>{

            return card.id == id; 

        })

        dataArrCards.splice(index, 1); 
        setLocalStorageCards();
        elementForRemove.remove();
    }
    
}

function editTask(id, idColumn) {

    let ModalForEditCard = document.querySelector('.modalEditCard');
    
    let modalEditHTML = 
    `
    <div class="taskEditModal">
    
                <i class="fa-solid fa-xmark" id="closeTaskModal" onclick="closeTaskEditModal()">
                </i>

                <h2 class="taskEditTitle">Edição</h2>

                <div class="task__inputsEdit">
                    <form>
                        <label for="inputEditCard">
                        Tarefa a fazer:
                        </label>
                        
                        <input 
                        placeholder="Reescreva sua tarefa" 
                        type="text" 
                        id="inputEditCard" 
                        autocomplete="off">
                    </form>
                </div>

                
                <div class="taskEdit__attributes">

                    <div class="taskEdit__date">

                        <span>

                            <label id="date-label" for="date-input">

                            Prazo para conclusão

                            </label>

                        </span>

                        <input id="date-input" max="9999-12-31" type="date">
                    </div>

                    <div class="taskEdit__progress">

                        <label for ="progressOptions" class="spanProgress">
                            <p> Progresso </p>
                        </label>

                        <select id="progressOptions">

                        <option value="Não Iniciada"> Não Iniciada </option>
                        <option value="Em andamento"> Em andamento </option>
                        <option value="Finalizada"> Finalizada </option>
                        
                        </select>

                    </div>


                    <div class="taskEdit__status">
                        <label for="taskEditStatus"> Prioridade </label> 
                        
                        <select id="taskEditStatus">

                            <option value="Pendente"> Pendente </option>
                            <option value="Concluída"> Concluída </option>
                            
                           
                        </select>
                    </div>
                </div>

                <div class="area-modalBtnCard">
                    <button 
                    class="btn-modalCard" 
                    id="editCardModalBtn"
                    onclick="saveEditModalCard(${id}, ${idColumn})">
                        Salvar alterações
                    </button>
                </div>
            </div>


    
    `
    
    ModalForEditCard.innerHTML = modalEditHTML; 
    ModalForEditCard.classList.add('active');

    let inputEdit = document.querySelector('#inputEditCard');
    let dateModalInput = document.querySelector('#date-input');
    let progressStatus = document.querySelector('#progressOptions');
    let statusCard = document.querySelector('#taskEditStatus');


    const indexCard = dataArrCards.findIndex((card) => {
        return card.id == id;
    })

    const card = dataArrCards[indexCard];

    inputEdit.value = card.titleCard;
    dateModalInput.value = card.date;
    progressStatus.value = card.progress;
    statusCard.value = card.status;

}



function saveEditModalCard(id, idColumn){

    let inputEdit = document.querySelector('#inputEditCard');
    let dateModalInput = document.querySelector('#date-input');
    let progressStatus = document.querySelector('#progressOptions');
    let statusCard = document.querySelector('#taskEditStatus');


    const newCardEdited = {

        idColumn: idColumn,
        id: id,
        titleCard: inputEdit.value,
        date: dateModalInput.value,
        progress: progressStatus.value,
        status: statusCard.value
    }


    let index = dataArrCards.findIndex(card =>{

        return card.id == id; 

    })

    dataArrCards[index] = newCardEdited;
    generateCard(); 
    setLocalStorageCards();

    closeTaskEditModal(); 
}


function closeTaskEditModal() {
    let ModalForEditCard = document.querySelector('.modalEditCard');
    ModalForEditCard.classList.remove('active');
}