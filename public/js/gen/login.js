$('#form-login').on('submit', (event) => {
    event.preventDefault()

    const buttonSendLogin = document.getElementById('button-send-login')

    buttonSendLogin.disabled = true

    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const remember = document.getElementById('remember').checked

    email.classList.remove('is-invalid')
    password.classList.remove('is-invalid')

    const formData = new FormData()
    const url = '/login'

    formData.append('email', email.value)
    formData.append('password', password.value)
    formData.append('remember', remember)

    $.ajax({
        url: url,
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
            buttonSendLogin.disabled = false

            if(data.errDb){
                return alert('Erro interno no servidor')
            }

            if(data.emailNotRegistered){
                email.classList.add('is-invalid')

                return alert('E-mail não registrado')
            }

            if(data.invalidPassword){
                password.classList.remove('is-invalid')

                return alert('Senha incorreta')
            }

            if(data.status){
                location.href = data.oldPage
            }
        },
        error: (err) => {
            buttonSendLogin.disabled = false
            
            console.error('Erro ao solicitar resposta na rota ' + url)
            console.error(err.message)
            alert('Erro ao tentar conectar com o servidor')
        }
    })
})