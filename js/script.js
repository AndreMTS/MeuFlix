function handler (event){
   event.preventDefault();
}

window.onload = () => {

    const submit = document.querySelector('.form__submit')
    submit.addEventListener('click', handler)
    
}