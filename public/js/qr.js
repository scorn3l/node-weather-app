// Api requestul
const qrGenerate = (qrRequestBody) => {
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(qrRequestBody)
    }
    fetch(`/qr-api`, requestData).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = `Eroare: ${data.error}`
            } else {
                msg1.textContent = `Succes`
                qrCodeImage.style.display = 'block'
                qrCodeImage.src = data.imageUrl
            }
        })
    })
}


// o fignea pentru functia care genereaza json objectu care trebuie trimis la api
const stringToArrayErf = (value) => {
    if (value === '') {
        return []
    } else if (value === 'fv' || value === 'fh') {
        return [`${value}`]
    } else if (value === 'fv,fh') {
        return ["fv", "fh"]
    } else {
        return [value]
    }
}

// pravireste daca nr de pixeli este setat corect
const sizeVerify = () => {
    const size = document.getElementById(`qr-size`).value
    const errorLabel = document.getElementById(`qr-size-error`)
    if (size>25 && size<3000) {
        errorLabel.style.display = `none`
        return true
    }
    else if (typeof(size) !== Number) {
        errorLabel.textContent = `Valoarea setata este invalida, a fost setata valoarea implicita (300px)!`
    }
    else if (size > 3000) {
        errorLabel.textContent = `Valoarea setata este prea mare, a fost setata valoarea implicita (300px)!`
    }
    else if (size<25) {
        errorLabel.textContent = `Valoarea setata este prea mica, a fost setata valoarea implicita (300px)!`
    }
    document.getElementById(`qr-size`).value = 300
    errorLabel.style.display = `block`
    return false
}

// pravireste daca este pus vreun text pentru generarea qr-codului
const textVerify = () => {
    const text = document.getElementById(`qr-text`).value
    const errorLabel = document.getElementById(`qr-text-error`)
    if (text === '') {
        errorLabel.textContent = `Trebuie sa introduci un text pentru a putea genera QR Codul!`
        errorLabel.style.display = 'block'
    }
    else {
        errorLabel.style.display = 'none'
        return true
    }
    
}

// porneste functiile de verificare si daca raspunsul la functia cu text e false, da eroare care anuleaza api requestu
const inputVerify = () => {
    textVerifySuccess = textVerify()
    sizeVerifySuccess = sizeVerify()
    if (!textVerifySuccess) {
        throw new Error(`No QrCode Text`)
    } 
}

// Sacineste json objectu care trebuie trimis la api
const getDataForQR = () => {
    const data = document.getElementById(`qr-text`).value
    const size = document.getElementById(`qr-size`).value
    const extension = document.getElementById(`qr-extension`).value
    const body = document.getElementById(`qr-body`).value
    const eye = document.getElementById(`qr-eye`).value
    const eyeball = document.getElementById(`qr-eyeball`).value
    const erf1 = stringToArrayErf(document.getElementById(`qr-erf1`).value)
    const erf2 = stringToArrayErf(document.getElementById(`qr-erf2`).value)
    const erf3 = stringToArrayErf(document.getElementById(`qr-erf3`).value)
    const bodyColor = document.getElementById(`qr-bodyColor`).value
    const bgColor = document.getElementById(`qr-bgColor`).value
    const eye1Color = document.getElementById(`qr-eye1Color`).value
    const eye2Color = document.getElementById(`qr-eye2Color`).value
    const eye3Color = document.getElementById(`qr-eye3Color`).value
    const eyeball1Color = document.getElementById(`qr-eyeBall1Color`).value
    const eyeball2Color = document.getElementById(`qr-eyeBall2Color`).value
    const eyeball3Color = document.getElementById(`qr-eyeBall3Color`).value
    const gradientIsOn = JSON.parse(document.getElementById(`qr-gradientIsOn`).value)
    const gradientColor1 = document.getElementById(`qr-gradientColor1`).value
    const gradientColor2 = document.getElementById(`qr-gradientColor2`).value
    const gradientType = document.getElementById(`qr-gradientType`).value
    const gradientOnEyes = JSON.parse(document.getElementById(`qr-gradientOnEyes`).value)
    qrRequestBody = {
        data,
        size,
        extension,
        body,
        eye,
        eyeball,
        erf1,
        erf2,
        erf3,
        bodyColor,
        bgColor,
        eye1Color,
        eye2Color,
        eye3Color,
        eyeball1Color,
        eyeball2Color,
        eyeball3Color,
        gradientIsOn
    }
    if (gradientIsOn) {
        qrRequestBody["gradientColor1"] = gradientColor1
        qrRequestBody["gradientColor2"] = gradientColor2
        qrRequestBody["gradientType"] = gradientType
        qrRequestBody["gradientOnEyes"] = gradientOnEyes
    }

    qrGenerate(qrRequestBody)
}



// constante de care este nevoie
const qrForm = document.querySelector('#qr-form')
const search = document.querySelector('#qr-text')
const msg1 = document.getElementById('msg1')
const clearBtn = document.getElementById('clearBtn')
const resetBtn = document.getElementById('resetBtn')
const qrCodeImage = document.getElementById('qrCodeImage')


// submit caroci
qrForm.addEventListener('submit', (event) => {
    event.preventDefault()
    qrCodeImage.style.display = 'none'
    inputVerify()
    getDataForQR()
    msg1.textContent = 'Se incarca, stai oleak..'
})

// sterge textul pentru qr
clearBtn.onclick = () => search.value = null

// reseteaza proprietatile
resetBtn.onclick = () => {
    const qrPropsForm = document.getElementById('qr-props')
    qrPropsForm.reset()
    document.getElementById(`qr-bgColor`).value = "#ffffff"
    // daca dai 'gazu' si apare eroarea, si dai clear la props, ramane eroarea si arata dea oaia {
    const errorLabels = document.querySelectorAll(`.errorLabel`) 
    errorLabels.forEach((label) => label.style.display = 'none')
    // }
    const colorInputs = document.querySelectorAll('#qr-proprieties input[type="color"]');
    colorInputs.forEach(input => {
        input.style.backgroundColor = input.value
    })

}


// Tipa face ca la input-urile de culori sa apara culoarea selectata (functie luata de pe ChatGpt)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById(`qr-bgColor`).value = "#ffffff" // Fara asta daca culoarea nu este schimbata, QR-Codeul este o imagine toata neagra
    const colorInputs = document.querySelectorAll('#qr-proprieties input[type="color"]');

    colorInputs.forEach(input => {
        input.style.backgroundColor = input.value;
        input.addEventListener('input', () => {
            input.style.backgroundColor = input.value;
        })
    })
})
