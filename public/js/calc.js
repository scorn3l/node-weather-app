

const calcType = document.getElementById('calc-type')
const calcPickBtn = document.getElementById('calcPickBtn')

const calcBtn1 = document.getElementById('calc-btn1')
const calcBtn2 = document.getElementById('calc-btn2')

const calc1Div = document.getElementById(`calc-1-div`)
const calc2Div = document.getElementById(`calc-2-div`)

const msg1 = document.getElementById('msg1')
//const  Input= document.getElementById(``)

calcPickBtn.onclick = () => {
    if (calcType.value === '1') {
        calc2Div.style.display = 'none'
        calc1Div.style.display = 'block'
        const pZeroInput = document.getElementById(`p-zero-value`)
        const roInput = document.getElementById(`ro-value`)
        const HInput = document.getElementById(`H-value`)
        const h1Input = document.getElementById(`h1-value`)
        const h2Input = document.getElementById(`h2-value`)
    } else if (calcType.value === '2') {
        calc1Div.style.display = 'none'
        calc2Div.style.display = 'block'

    }
}


calcBtn1.onclick = () => {

}

calcBtn2.onclick = () => {
    console.log('test')
    const pZeroInput = document.getElementById(`p-zero-value1`).value
    const roInput = document.getElementById(`ro-value1`).value
    const HInput1 = document.getElementById(`H-value1`).value
    const h1Input1 = document.getElementById(`h1-value1`).value
    const h2Input1 = document.getElementById(`h2-value1`).value
    const HInput2 = document.getElementById(`H-value2`).value
    const h1Input2 = document.getElementById(`h1-value2`).value
    const h2Input2 = document.getElementById(`h2-value2`).value

    const HInput3 = document.getElementById(`H-value3`).value
    const h1Input3 = document.getElementById(`h1-value3`).value
    const h2Input3 = document.getElementById(`h2-value3`).value

    n1 = (pZeroInput / pZeroInput * roInput * 9.81)*(h1Input1/h2Input1)
    n2 = (pZeroInput / pZeroInput * roInput * 9.81)*(h1Input2/h2Input2)
    n3 = (pZeroInput / pZeroInput * roInput * 9.81)*(h1Input3/h2Input3)

    nmed = (n1+n2+n3)/3
    
    delta_n1 = Math.abs(n1-nmed)
    delta_n2 = Math.abs(n2-nmed)
    delta_n3 = Math.abs(n3-nmed)

    delta_nmed = (delta_n1+delta_n2+delta_n3)/3
    
    eroare_n1_delta_n1 = delta_n1/n1
    eroare_n2_delta_n2 = delta_n2/n2
    eroare_n3_delta_n3 = delta_n3/n3

    eroare_n1_delta_med = delta_nmed/n1
    eroare_n2_delta_med = delta_nmed/n2
    eroare_n3_delta_med = delta_nmed/n3

    eroare_nmed = delta_nmed/nmed

    result_text = `------------------<br>
    n (1) = ${n1} <br>
    n (2) = ${n2} <br>
    n (3) = ${n3} <br><br>

    n (med) = ${nmed} <br><br>
    
    ------------------<br><br>

    ( | n (1) - n (med) | )<br><br>
    ▲n (1) = ${delta_n1} <br>
    ▲n (2) = ${delta_n2} <br>
    ▲n (3) = ${delta_n3} <br><br>

    ▲n (med) = ${delta_nmed} <br><br>

    ------------------<br><br>

    ( ▲n (1) / (n1) )<br><br>
    E (1) = ${eroare_n1_delta_n1} <br>
    E (2) = ${eroare_n2_delta_n2} <br>
    E (3) = ${eroare_n3_delta_n3} <br><br>

    ( ▲n (med) / (n1) )<br><br>
    E (1) = ${eroare_n1_delta_med} <br>
    E (2) = ${eroare_n2_delta_med} <br>
    E (3) = ${eroare_n3_delta_med} <br><br>

    E (med) = ${eroare_nmed} <br><br>
    
    ------------------<br>
    `

    msg1.innerHTML = result_text;

}



