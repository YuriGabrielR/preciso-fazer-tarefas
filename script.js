const $formColumn = document.querySelector('.todo-addcolumn');
const $inputColumn = document.querySelector('#btn-addcolumn');
const $valueInputColumn = document.querySelector('#input-column');
const divColumn = document.querySelector('.todo-column');


let arrColumns = [];

$formColumn.addEventListener('submit', getInputColumn);

function columnsAdd (){
    const ColumnsHTML = arrColumns.map((column)=>{

        return `
            <div class="column--components"> 
                <div class="btn--column">
                    <i class="fa-solid fa-pen   btn-cardEditColumn"></i>
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
      id: Math.floor(Math.random()* 999),  
      titleColumn: $valueInputColumn.value
    }

    if(column.titleColumn == 0){

        window.alert('Campo vazio, por favor, informe um nome para sua nova lista!');

    }else{
        
        arrColumns.push(column);
        columnsAdd()
    }

    $valueInputColumn.value ="";
}


console.log(arrColumns);