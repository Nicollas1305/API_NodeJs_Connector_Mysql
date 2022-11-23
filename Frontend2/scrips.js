const handleSubmit = (event) => {
    alert('TESTANDO ALERT FORM')
    //event.prevendDefault();

    fetch('http://localhost:3030/users/create', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content=Type': 'application/json',
        },
        body: JSON.stringify({ username: 'Nicollasteste', password: 'nicollasteste@gmail.com' })
    });

}

const btn = document.getElementById('submit');
console.log(btn);

btn.addEventListener('click', () => {
    handleSubmit();
    console.log('btn clicked');
});

document.querySelector('form')?.addEventListener('submit', handleSubmit);