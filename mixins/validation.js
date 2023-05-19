export default function validation() {

    function mapErrors(errors) {
        return errors.map(e => {
            switch (e.$validator) {
                case 'required':
                    return 'Обязательное поле';
                case 'email':
                    return 'Некорректный E-mail';
                case 'minLength':
                    return 'Не соответствует минимальному кол-ву символов';
                default:
                    return 'Что-то не так';
            }
        });
    }

    return {mapErrors};
}
