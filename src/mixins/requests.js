import {personStore} from "@/store/personStore";

export default function requests() {
    const store =  personStore();

    function registration(data) {
        console.log(data)
    }

    function checkVerificationEmail() {

    }

    function loginIn() {
        console.log('kjdhsjfk')
        store.person = {
            id: 26516,
            name: 'Georgy Gradinar',
            email: 'test-email@mail.ru',
            password: 'frej4324f43',
            credits: 25,
        }
    }

    return {registration, checkVerificationEmail, loginIn}
}
