const mainForm = document.querySelector('#main-form'),
    cepInput = document.querySelector('#cep-input'),
    adressInput = document.querySelector('#road-input'),
    houseNumInput = document.querySelector('#num-input'),
    complementInput = document.querySelector('#complement-input'),
    neighborhoodInput = document.querySelector('#neighborhood-input'),
    cityInput = document.querySelector('#city-input'),
    stateInput = document.querySelector('#state-input'),
    allInput = document.querySelectorAll('[data-input]')

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
        if(!adressInput.hasAttribute("disabled")){
            toggleDisable()
        }

        mainForm.reset()
        toggleLoader()
        return
    }

    adressInput.value = data.logradouro
    cityInput.value = data.localidade
    neighborhoodInput.value = data.bairro
    stateInput.value = data.uf

    toggleDisable()
}

// Add or remove disable atribute
const toggleDisable = () => {
    allInput.forEach((input) => {
        if(input.hasAttribute('disabled') && input.value == ''){
            input.removeAttribute('disabled')
        }
    })
}

// Show or Hide Loader
const toggleLoader = () => {
    const fadeElement = document.querySelector('#fade'),
        loaderElement = document.querySelector('#loader')

    fadeElement.classList.toggle('hide')
    loaderElement.classList.toggle('hide')
}