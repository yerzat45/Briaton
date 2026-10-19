export default class FormValidation {
    constructor() {
        this.form = document.querySelector('.questions__form');
    }

    init() {
        if (!this.form) return;

        const validator = new JustValidate('.questions__form');

        validator
            .addField('#name', [
                {
                    rule: 'required',
                    errorMessage: 'Введите имя'
                },
                {
                    rule: 'minLength',
                    value: 3,
                    errorMessage: 'Минимум 3 символа'
                }
            ])

            .addField('#email', [
                {
                    rule: 'required',
                    errorMessage: 'Введите email'
                },
                {
                    rule: 'email',
                    errorMessage: 'Введите корректный email'
                }
            ])

            .addField('#agree', [
                {
                    rule: 'required',
                    errorMessage: 'Подтвердите согласие'
                }
            ])

            .onSuccess(async (event) => {
                await this.sendForm(event.target);
            });
    }

    async sendForm(form) {
        const formData = new FormData(form);

        const data = {
            name: formData.get('name'),
            email: formData.get('email')
        };

        try {
            const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Ошибка отправки');
            }

            const result = await response.json();

            console.log('Успешно отправлено:', result);

            alert('Заявка успешно отправлена');

            form.reset();

        } catch (error) {
            console.error(error);
            alert('Ошибка при отправке формы');
        }
    }
}