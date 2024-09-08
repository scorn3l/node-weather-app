
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


const getDataForQR = () => {
    const data = document.getElementById(`inputBox`).value
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



document.getElementById(`qr-bgColor`).value = "#ffffff"

const qrForm = document.querySelector('form')
const search = document.querySelector('#qr-proprieties input[type="text"]')
const msg1 = document.getElementById('msg1')
const qrCodeImage = document.getElementById('qrCodeImage')
const gradientIsOn = document.getElementById('qr-gradientIsOn')


qrForm.addEventListener('submit', (event) => {
    event.preventDefault()
    qrCodeImage.style.display = 'none'
    getDataForQR()
    msg1.textContent = 'Se incarca, stai oleak..'
    search.value = null

})



document.addEventListener('DOMContentLoaded', () => {
    const colorInputs = document.querySelectorAll('#qr-proprieties input[type="color"]');

    colorInputs.forEach(input => {
        input.style.backgroundColor = input.value;
        input.addEventListener('input', () => {
            input.style.backgroundColor = input.value;
        })
    })
})
