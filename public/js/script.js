const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mes1 = document.querySelector('#m1')
const mes2 = document.querySelector('#m2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    mes1.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mes1.textContent = data.error
            } else {
                mes1.textContent = data.location
                mes2.textContent = data.forecast
            }
        })
    })
})

