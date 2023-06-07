import {personStore} from "~/store/personStore";
import requests from "~/mixins/requests";
import {modelsStore} from "~/store/models";

export default function socials() {
    const store = personStore();
    const {changePerson} = store;
    const {getPersonInfo} = requests();

    const models = modelsStore();
    const {toggleRegistrationDialog, toggleLoginDialog} = models;

    function authVK() {
        let popup = window.open('https://api.neuro-holst.ru/api/v1/login/vkontakte', '', generateParams())
        const currentURL = getPopupLocation(popup);
        checkUrlChange(popup, currentURL, '', 'login/vkontakte');
    }

    function authYandex() {
        let popup = window.open('https://api.neuro-holst.ru/api/v1/login/yandex', '', generateParams())
        const currentURL = getPopupLocation(popup);
        checkUrlChange(popup, currentURL, '', 'login/yandex');
    }

    function authGoogle() {
        let popup = window.open('https://api.neuro-holst.ru/api/v1/login/google', '_blank', generateParams())
        const currentURL = getPopupLocation(popup);
        checkUrlChange(popup, currentURL, '', 'login/google');
    }

    function generateParams() {
        const width = window.document.body.clientWidth * 0.6;
        const height = screen.height * 0.6;
        const left = window.document.body.clientWidth / 2 - width / 2;
        const top = screen.height / 2 - height / 2;
        return `width=${width},height=${height},toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=${left},top=${top}`;
    }

    let checkUrlTimeout;

    function checkUrlChange(popup, currentUrl, oldUrl, partOfUrl) {
        if (checkUrlTimeout) clearTimeout(checkUrlTimeout);
        let currentOldUrl = oldUrl;
        if (currentUrl && currentUrl !== oldUrl) {
            currentOldUrl = currentUrl;
            if (currentUrl.includes(partOfUrl)) {
                const urlParams = new URLSearchParams(currentUrl);
                const token = urlParams.get('token');

                if (token) {
                    changePerson({token});
                    popup.close();
                    toggleRegistrationDialog(false);
                    toggleLoginDialog(false);
                    getPersonInfo();
                }
            }
        }

        currentOldUrl = getPopupLocation(popup);

        checkUrlTimeout = window.setTimeout(() => {
            const newUrl = getPopupLocation(popup);

            checkUrlChange(popup, newUrl, currentOldUrl, partOfUrl);
        }, 1000);
    }

    function getPopupLocation(popup) {
        try {
            return popup.location.href;
        } catch {
            return ''
        }
    }

    return {authVK, authYandex, authGoogle}
}