import {personStore} from "@/store/personStore";
import {ACCOUNT_STORAGE_KEY} from "@/constants";

export default function requests() {
    const store =  personStore();

    function registration(data) {
        console.log(data)
    }

    function checkVerificationEmail() {

    }

    function loginIn() {
        const person = {
            id: 26516,
            name: 'Евгений Кондратьев',
            email: 'test-email@mail.ru',
            password: 'frej4324f43',
            credits: 25,
        }

        store.person = person;
        localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(person));
    }

    function logout() {
        const person = {};

        store.person = person;
        localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(person));
    }

    return {registration, checkVerificationEmail, loginIn, logout};
}
