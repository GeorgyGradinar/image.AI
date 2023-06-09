export default function validation() {

    function mapErrors(errors) {
        return errors.map(e => {
            switch (e.$validator) {
                case 'required':
                    return 'Обязательное поле';
                case 'email':
                    return 'Некорректный E-mail';
                case 'minLength':
                    return 'Пароль должен содержать не менее 6 символов';
                case 'minLengthEight':
                    return 'Пароль должен содержать не менее 8 символов';
                case 'sameAs':
                    return 'Пароли должны совпадать';
                default:
                    return 'Что-то не так';
            }
        });
    }

    return {mapErrors};
}
