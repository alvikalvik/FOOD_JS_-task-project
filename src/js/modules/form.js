export function form() {
    const forms = document.querySelectorAll('form');

    const formMessages = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо. Скоро мы с Вами свяжемся.',
        error: 'Ошибка отправки запроса.',
    };

    for (const form of forms) {
        handleForm(form);
    }

    async function sendFormData(url, json) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();             
    }    

    function handleForm(form) {
        form.addEventListener('submit', evt => {
            evt.preventDefault();
            
            const formData = new FormData(form);            
            const messageBox = document.createElement('div');
            const spinner = document.createElement('img');

            const object = {};
            formData.forEach((value, key) => object[key] = value);
            const json = JSON.stringify(object);

            messageBox.classList.add('message');
            
            spinner.src = formMessages.loading;
            spinner.classList.add('spinner');
            form.querySelector('.btn').append(spinner);
            

            sendFormData('http://localhost:3000/requests', json)
            .then(data => {
                messageBox.textContent = formMessages.success;                          
                console.log(data);                
            })
            .catch(error => {
                messageBox.textContent = formMessages.error;                    
                console.log(error);
            })
            .finally(() => {
                form.reset();
                spinner.remove();
                form.insertAdjacentElement('afterend', messageBox);
                setInterval(() => {
                    messageBox.remove();
                },3000);
            });
        });
    }   
}