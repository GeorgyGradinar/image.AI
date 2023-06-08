export default function storage() {

    function setLocalStorage(KEY, value) {
        localStorage.setItem(KEY, JSON.stringify(value));
    }

    function getLocalStorage(KEY) {
        let saved = process.client && localStorage.getItem(KEY);
        return saved ? JSON.parse(saved) : '';
    }

    function setCookie(key, value) {
        document.cookie = `${key}=${value}`;
    }

    function getCookie() {
        return document.cookie
    }

    return {setLocalStorage, getLocalStorage, setCookie, getCookie}
}
