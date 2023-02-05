const inputColorBg = document.querySelector('#input-colorTheme'); 

inputColorBg.addEventListener('change', (e)=>{
    let valueColor = inputColorBg.value; 
    document.body.style.backgroundColor = valueColor;
} )