const $formColumn = document.querySelector('.todo-addcolumn');
const $inputColumn = document.querySelector('#btn-addcolumn');
const $idHiddenColumn = document.querySelector('#idHidden');
const $valueInputColumn = document.querySelector('.input-column');
const $idColumn = document.querySelector('#idColumn');
const $inputEditModal = document.querySelector('#editColumn');
const btnEditColumn = document.querySelector('.btn-cardEditColumn');
const btnCloseModal = document.querySelector('.closeModalEdit');
const btnDoneEditModal = document.querySelector('.doneModalEdit');
const divColumn = document.querySelector('.todo-column');
const divEditModal = document.querySelector('.modalEditColumn');



let  dataColumns = JSON.parse(localStorage.getItem('db_Columns')) ?? []; 
let setLocalStorage = ()=> { localStorage.setItem('db_Columns', JSON.stringify(dataColumns));}


(function loadContents(){
    columnsAdd(); 

})(); 


$formColumn.addEventListener('submit', getInputColumn);

function getInputColumn(e){
    e.preventDefault();

    const column = {

      id: Math.floor(Math.random() * 999),  
      titleColumn: $valueInputColumn.value,

    }

    if(column.titleColumn){ 

        dataColumns.push(column);
        setLocalStorage(); 
        columnsAdd();

    }
    
     else{
        window.alert('Campo vazio, por favor, informe um nome para sua nova lista!');
       
    }

    $valueInputColumn.value= "";
}



function columnsAdd (){

    const ColumnsHTML = dataColumns.map( (column) => {
        
       
        return `
            <div class="column--components"> 
                <input autocomplete="off"  type="hidden" id="idHidden" 
                value="${column.id}">
                <div class="btn--column">
                    <i class="fa-solid fa-pen btn-cardEditColumn" onclick="editColumn(${column.id})"></i>
                    <i class="fa-solid fa-trash btn-cardDelColumn" onclick="delColumn(${column.id}, event)" data-target="${column.id}"></i> 
                </div>
                    <h3 class="column-title">${column.titleColumn}</h3>
                    <form class="formAddCard">
                    <div class="todo-add">
                    <button class="btn--todoadd" type="submit" onclick="openModal(event)">
                        <i class="fa-solid fa-circle-plus"></i>
                        Adicione uma nova tarefa
                    </button>
                    </div> 
                    </form>
                    
                    <div data-id="${column.id}" class="cardDiv"></div>
            </div>

        `;               

    });

    
    divColumn.innerHTML = ColumnsHTML.join('');

} 



function delColumn (id, e){
    e.preventDefault();
    let elementNode = e.target.parentNode.parentNode;
    let targetBtnAttribute = e.target.getAttribute('data-target');

    if(id == targetBtnAttribute){
        let index = dataColumns.findIndex((column)=>{
            return column.id == id;
        })

        dataColumns.splice(index, 1);
        setLocalStorage();
        elementNode.remove();

    }
  
}



function editColumn(id){
    divEditModal.classList.add('active');
    
    const idIndex = dataColumns.findIndex((column)=>{
        return column.id == id;
        
    })

    const indexColumn = dataColumns[idIndex];
    

    $idColumn.value = indexColumn.id;
    $inputEditModal.value = indexColumn.titleColumn;
    
  
}


function SaveEditModal(){
    
    const editColumn =
     {
        id: $idColumn.value,
        titleColumn: $inputEditModal.value

     }
  
    
     const idIndex = dataColumns.findIndex((column)=>{
        return column.id == $idColumn.value;

    })

   

    dataColumns[idIndex] = editColumn;
    
    
    columnsAdd();
    setLocalStorage();
    divEditModal.classList.remove('active')
}

btnDoneEditModal.addEventListener('click', SaveEditModal);


function closeModal(){
    divEditModal.classList.remove('active');
    $idColumn.value = "";
    $inputEditModal.value = "";
    
    
}

btnCloseModal.addEventListener('click', closeModal);


