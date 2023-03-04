

const inputColorBg = document.querySelector('#input-colorTheme'); 

inputColorBg.addEventListener('input', (e)=>{
    let valueColor = inputColorBg.value; 
    document.body.style.backgroundColor = valueColor;
} )

console.log(arrColumns);