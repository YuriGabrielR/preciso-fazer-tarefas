const formColumn = document.querySelector('.todo-addcolumn');
const formColumnInput = document.querySelector('.input-column');
const formColumnId = document.querySelector('#idColumn');
const formColumnEdit = document.querySelector('#editColumn');
const columnEditBtnOpen = document.querySelector('.btn-cardEditColumn');
const columnEditBtnClose = document.querySelector('.closeModalEdit');
const columnEditBtnSave = document.querySelector('.doneModalEdit');
const divColumn = document.querySelector('.todo-column');
const divEditModal = document.querySelector('.modalEditColumn');


let  dataColumns = JSON.parse(localStorage.getItem('db_Columns')) ?? []; 
let setLocalStorage = ()=> { localStorage.setItem('db_Columns', JSON.stringify(dataColumns));}



(function loadContents(){
    columnsAdd(); 
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
        columnsAdd();

    }
    
     else{
        window.alert('Campo vazio, por favor, informe um nome para sua nova lista!');
       
    }

    formColumnInput.value= "";
}

function clearHtmlColumns(){
    document.querySelector('.todo-column').innerHTML='';
}

function columnsAdd (){
   clearHtmlColumns(); 

     dataColumns.forEach( (column, index) => {
        const ColumnsHTML = `
            <div class="column--components" data-index="${index}" > 

                <input autocomplete="off"  type="hidden" id="idHidden" 
                value="${column.id}">
                
                <div class="header-column">

                    <h3 class="column-title">${column.titleColumn}</h3>

                    <div class="btn--column">

                     <i class="fa-regular fa-pen-to-square btn-cardEditColumn" onclick="editColumn(${column.id})">

                     </i>
                        <i class="fa-regular fa-trash-can btn-cardDelColumn" 
                        onclick="delColumn(${column.id}, event)"
                        data-target="${column.id}">
                        
                        </i> 
                </div>
                
                </div>
                    
                    <div data-id="${column.id}" class="cardDiv"></div>
                    <div class="todo-add">
                    <form class="formAddCard" data-idColumn= '${column.id}'>

                    <button class="btn--todoadd" type="submit" onclick="openInputCardModal(event, '${column.titleColumn}', ${column.id})">
                    <i class="fa-solid fa-plus"></i>
                        Adicione uma nova tarefa
                </button>
                    </form>
                    
                    </div> 
            </div>

        `;            
        
        
        divColumn.innerHTML += ColumnsHTML;

    });

   

} 



function delColumn (id, e){
    e.preventDefault();
  
    let elementNode = e.target.parentNode.parentNode.parentNode;
    let targetBtnAttribute = e.target.getAttribute('data-target');
    
    let dataCardsLocalStorage = JSON.parse(localStorage.getItem('db_Cards')); 

    let setLocalStorageCards = ()=> { localStorage.setItem('db_Cards', JSON.stringify(dataArrCards));};


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
    
    
        columnsAdd();
        setLocalStorage();
        divEditModal.classList.remove('active')
}

columnEditBtnSave.addEventListener('click', SaveEditModal);


function closeModal(){
    divEditModal.classList.remove('active');


}

columnEditBtnClose.addEventListener('click', closeModal);


