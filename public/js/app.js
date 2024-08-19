
const weatherInfo = (address) => {
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            
            if (data.error) {
                msg1.textContent = `Eroare: ${data.error}`
            } else {
                msg1.textContent = `Locatia: ${data.locationName}`
                msg2.textContent = `Temperatura: ${data.temperature}`
                
            }
            
        })
        
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    msg1.textContent = 'Se incarca, stai oleak..'
    msg2.textContent = null
    weatherInfo(search.value)
    search.value = null
})

