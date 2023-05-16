
const inputColorBg = document.querySelector('#input-colorTheme'); 

function setThemeLocalStorage(color){

    let getColorLocalStorage = localStorage.getItem('colorTheme', color); 
    
    document.body.style.backgroundColor = getColorLocalStorage;
    inputColorBg.value = getColorLocalStorage;
    console.log(getColorLocalStorage); 
  
  }
  
  (function themeSelectLoad(){
  
      setThemeLocalStorage();
  
  })(); 

  
inputColorBg.addEventListener('input', (e)=>{
    let valueColor = inputColorBg.value; 
    let colorStorage = localStorage.setItem('colorTheme', valueColor);
   
    setThemeLocalStorage(colorStorage); 
} )

