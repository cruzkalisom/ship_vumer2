$('#form-register').on('submit', (event) => {
    event.preventDefault()

    const buttonFormRegister = document.getElementById('button-form-register')

    buttonFormRegister.disabled = true

    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const confirmPassword = document.getElementById('confirm-password')
    const terms = document.getElementById('check-terms').checked

    name.classList.remove('is-invalid')
    email.classList.remove('is-invalid')
    password.classList.remove('is-invalid')
    confirmPassword.classList.remove('is-invalid')

    var message = null
    var auth = true

    if(!terms){
        message = 'É necessário concordar com os termos de uso'
        auth = false
    }

    if(password.value !== confirmPassword.value){
        password.classList.add('is-invalid')
        confirmPassword.classList.add('is-invalid')
        message = 'Senhas não estão iguais'
        auth = false
    }

    if(!(/[a-zA-Z]/).test(password.value) || password.value.length < 4){
        password.classList.add('is-invalid')
        message = 'Senha inválida'
        auth = false
    }

    if(!email.value){
        email.classList.add('is-invalid')
        message = 'E-mail inválido'
        auth = false
    }

    if(!(/[a-zA-Z]/).test(name.value) || name.value.length < 4){
        name.classList.add('is-invalid')
        message = 'Nome inválido'
        auth = false
    }

    if(!auth){
        buttonFormRegister.disabled = false
        return alert(message)
    }

    const formData = new FormData()
    const url = '/register'

    formData.append('name', name.value || 'Sem nome')
    formData.append('email', email.value || 'sem@email')
    formData.append('password', password.value || 'semsenha')

    $.ajax({
        url: url,
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
            buttonFormRegister.disabled = false

            if(data.errDb){
                return alert('Erro interno no servidor')
            }

            if(data.emailRegistered){
                email.classList.add('is-invalid')

                return alert('E-mail já cadastrado')
            }

            if(data.status){
                event.target.reset()
                location.href = data.oldPage
            }
        },
        error: (err) => {
            buttonFormRegister.disabled = false

            console.error('Erro ao solicitar resposta na rota ' + url)
            console.error(err)
            alert('Erro ao tentar conectar com o servidor')
        }
    })
})