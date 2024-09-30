const request = require(`request`)

const qrCode = ({ data, size,extension, body, eye, eyeball, erf1, erf2, erf3, bodyColor, bgColor, eye1Color, eye2Color, eye3Color, eyeball1Color, eyeball2Color, eyeball3Color, gradientIsOn, gradientColor1, gradientColor2, gradientType, gradientOnEyes } = {}, callback) => {

    url = `https://api.qrcode-monkey.com//qr/custom`


    let qrGenConfig = {
        body,
        eye,
        eyeBall: eyeball,
        erf1,
        erf2,
        erf3,
        bodyColor,
        bgColor,
        eye1Color,
        eye2Color,
        eye3Color,
        eyeBall1Color: eyeball1Color,
        eyeBall2Color: eyeball2Color,
        eyeBall3Color: eyeball3Color,
    };

    if (gradientIsOn) {
        qrGenConfig.gradientColor1 = gradientColor1;
        qrGenConfig.gradientColor2 = gradientColor2;
        qrGenConfig.gradientType = gradientType;
        qrGenConfig.gradientOnEyes = gradientOnEyes;
    }

    const qrGenRequestData = {
        data,
        size,
        download: true,
        file: extension,
        config: qrGenConfig
    }

    request({ url, json: true, body: qrGenRequestData, method: 'POST' }, (error, { body } = {}) => {
        console.log(body)
        if (error) {
            callback('vezi ca nu merge sfiaziu', undefined)
        } else {
            callback(undefined, {
                imageUrl: `https:${body.imageUrl}`
            })
        }
    })
}


module.exports = qrCode