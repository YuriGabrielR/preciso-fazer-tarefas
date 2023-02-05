const $formColumn = document.querySelector('.todo-addcolumn');
const $inputColumn = document.querySelector('#btn-addcolumn');
const $valueInputColumn = document.querySelector('.input-column');
const $idColumn = document.querySelector('#idColumn');
const $inputEditModal = document.querySelector('#editColumn');
const btnEditColumn = document.querySelector('.btn-cardEditColumn');
const btnCloseModal = document.querySelector('.closeModalEdit');
const btnDoneEditModal = document.querySelector('.doneModalEdit');
const divColumn = document.querySelector('.todo-column');
const divEditModal = document.querySelector('.modalEditColumn');



let arrColumns = [];

$formColumn.addEventListener('submit', getInputColumn);


function columnsAdd (){
    const ColumnsHTML = arrColumns.map((column)=>{

        return `
            <div class="column--components"> 
                <div class="btn--column">
                    <i class="fa-solid fa-pen   btn-cardEditColumn" onclick="editColumn(${column.id})"></i>
                    <i class="fa-solid fa-trash btn-cardDelColumn"></i> 
                </div>
                    <h3 class="column-title">${column.titleColumn}</h3>
                    <div class="todo-add">
                    <button class="btn--todoadd">
                        <i class="fa-solid fa-circle-plus"></i>
                    </button>
                    <input type="text" id="input-add-todo" 
                    placeholder="Adicione uma nova tarefa"> 
                    </div> 
            </div>
        `;               

    });
 
    divColumn.innerHTML = ColumnsHTML.join('');

} 

function getInputColumn(e){
    e.preventDefault();

    const column = {
      id: Math.floor(Math.random() * 999),  
      titleColumn: $valueInputColumn.value,
    }

    if(column.titleColumn == 0){

        window.alert('Campo vazio, por favor, informe um nome para sua nova lista!');

    }else{
        
        arrColumns.push(column);
        columnsAdd();
    }

    $valueInputColumn.value= "";
    
}

function editColumn(id){
    divEditModal.classList.add('active');
    
    const idIndex = arrColumns.findIndex((column)=>{
        return column.id == id;
        
    })

    const indexColumn = arrColumns[idIndex];

    $idColumn.value = indexColumn.id;
    $inputEditModal.value = indexColumn.titleColumn;

    
}


function SaveEditModal(){
    
    const Editcolumn =
     {
        id: $idColumn.value,
        titleColumn: $inputEditModal.value

     }
  
    
     const idIndex = arrColumns.findIndex((column)=>{
        return column.id == $idColumn.value;

    })

    const IndexColumn =  arrColumns[idIndex];

    arrColumns[idIndex] = Editcolumn;

    columnsAdd()
    closeModal()

}

btnDoneEditModal.addEventListener('click', SaveEditModal);


function closeModal(){
    $idColumn.value = "";
    $inputEditModal.value = "";
    divEditModal.classList.remove('active');
    
}

btnCloseModal.addEventListener('click', closeModal);



