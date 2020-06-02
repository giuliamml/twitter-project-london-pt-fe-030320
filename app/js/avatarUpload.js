const file = document.querySelector('input.inputfile')
const baseImgPath = './img'

file.addEventListener('change', e => {
    const fileName = event.target.value.split('\\').pop()
    const imgSrc = `/${fileName}`
    document.querySelector('img#avatar').src = imgSrc
})