const
    // Input and forms elements
    mainForm = document.querySelector('#main-form'),
    cepInput = document.querySelector('#cep-input'),
    adressInput = document.querySelector('#road-input'),
    houseNumInput = document.querySelector('#num-input'),
    complementInput = document.querySelector('#complement-input'),
    neighborhoodInput = document.querySelector('#neighborhood-input'),
    cityInput = document.querySelector('#city-input'),
    stateInput = document.querySelector('#state-input'),
    allInput = document.querySelectorAll('[data-input]'),
    inputList = document.querySelector('#form-list'),
    
    // Message, alert e loader elements
    fadeElement = document.querySelector('#fade'),
    msgBoxElement = document.querySelector('#message'),
    msgElement = document.querySelector('#msg'),
    closeBtn = document.querySelector('#closen-message'),
    loaderElement = document.querySelector('#loader')

    
// Validate the CPF
cepInput.addEventListener('keypress', (e) => {
    const onlyNumbers = /\d/g,
        key = String.fromCharCode(e.keyCode)

    if(!onlyNumbers.test(key)){
        e.preventDefault()
        return
    }
})

// Get adress event
cepInput.addEventListener('keyup', (e) => {
    const inputValue = e.target.value

    // Check if we have the correct lenght
    if(inputValue.length === 8){
        getAddress(inputValue)
    }
})

// Get customer address api
const getAddress = async (cep) => {
    toggleLoader()
    cepInput.blur()

    const apiUrl = `https://viacep.com.br/ws/${cep}/json`

    const response = await fetch(apiUrl)
    const data = await response.json()


    if (data.erro){
        inputList.reset()
        mainForm.reset()
        toggleLoader()
        toggleDisable(data.erro)
        toggleErro('Este CEP não existe, por favor digite outro!')
        return
    }

    inputList.reset()
    adressInput.value = data.logradouro
    cityInput.value = data.localidade
    neighborhoodInput.value = data.bairro
    stateInput.value = data.uf

    toggleDisable()
    toggleLoader()
}

// Add or remove disable atribute
const toggleDisable = (err) => {
    allInput.forEach((input) => {
        if(err){
            input.setAttribute('disabled', 'disabled')
            input.classList.remove('enable')
        }
        else if(!input.value){
            input.removeAttribute('disabled')
            input.classList.add('enable')
        }
        else{
            input.setAttribute('disabled', 'disabled')
            input.classList.remove('enable')
        }
    })
}

// Show or Hide Loader
const toggleLoader = () => {
    fadeElement.classList.toggle('hide')
    loaderElement.classList.toggle('hide')
}

// Show or hide Error msg
const toggleErro = (text) => {
    fadeElement.classList.toggle('hide')
    msgBoxElement.classList.toggle('hide')
    msgElement.innerText = text

    closeBtn.addEventListener('click', closeBtnEvent)
}

const closeBtnEvent = () => {
    fadeElement.classList.toggle('hide')
    msgBoxElement.classList.toggle('hide')
}