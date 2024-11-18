

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
    const pZeroInput = document.getElementById(`p-zero-value1`).value
    const HInput1 = document.getElementById(`H-value1`).value
    const h1Input1 = document.getElementById(`h1-value1`).value
    const h2Input1 = document.getElementById(`h2-value1`).value
    const T2Input1 = document.getElementById(`T2-value1`).value
    const T1Input1 = document.getElementById(`T1-value1`).value
    const HInput2 = document.getElementById(`H-value2`).value
    const h1Input2 = document.getElementById(`h1-value2`).value
    const h2Input2 = document.getElementById(`h2-value2`).value
    const T2Input2 = document.getElementById(`T2-value2`).value
    const T1Input2 = document.getElementById(`T1-value2`).value


    n1 = (pZeroInput / (pZeroInput - (1000 * 9.81 * HInput1 )))*(h1Input1/h2Input1)*(T2Input1/T1Input1)
    n2 = (pZeroInput / (pZeroInput - (1000 * 9.81 * HInput2 )))*(h1Input2/h2Input2)*(T2Input2/T1Input2)

    nmed = (n1+n2)/2
    
    delta_n1 = Math.abs(n1-nmed)
    delta_n2 = Math.abs(n2-nmed)
    
    eroare_n1_delta_n1 = delta_n1/n1
    eroare_n2_delta_n2 = delta_n2/n2


    result_text = `------------------<br>
    n (1) = ${n1} <br>
    n (2) = ${n2} <br><br>

    n (med) = ${nmed} <br><br>
    
    ------------------<br><br>

    ( | n (1) - n (med) | )<br><br>
    ▲n (1) = ${delta_n1} <br>
    ▲n (2) = ${delta_n2} <br><br>

    ------------------<br><br>

    ( ▲n (1) / (n1) )<br><br>
    E (1) = ${eroare_n1_delta_n1} <br>
    E (2) = ${eroare_n2_delta_n2} <br><br>
    
    ------------------<br>
    `

    msg1.innerHTML = result_text;

}



