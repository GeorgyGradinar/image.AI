import {personStore} from "~/store/personStore";
import requests from "~/mixins/requests";

export default function socials() {
    const store = personStore();
    const {changePerson} = store;
    const {getPersonInfo} = requests();

    function authVK() {
        const width = window.document.body.clientWidth * 0.6;
        const height = screen.height * 0.6;
        const left = window.document.body.clientWidth / 2 - width / 2;
        const top = screen.height / 2 - height / 2;
        const params = `width=${width},height=${height},toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=${left},top=${top}`;
        let popup = window.open('https://api.neuro-holst.ru/api/v1/login/vkontakte', '', params)
        const currentURL = getPopupLocation(popup);

        return checkUrlChange(popup, currentURL, '');
    }

    let checkUrlTimeout;

    function checkUrlChange(popup, currentUrl, oldUrl) {
        if (checkUrlTimeout) clearTimeout(checkUrlTimeout);
        let currentOldUrl = oldUrl;

        if (currentUrl && currentUrl !== oldUrl) {
            currentOldUrl = currentUrl;
            if (currentUrl.includes('login/vk')) {
                const urlParams = new URLSearchParams(currentUrl);
                const token = urlParams.get('token');

                if (token) {
                    changePerson({token});
                    getPersonInfo();

                    popup.close();
                    return true;
                }
            }
        }

        currentOldUrl = getPopupLocation(popup);

        checkUrlTimeout = window.setTimeout(() => {
            const newUrl = getPopupLocation(popup);

            checkUrlChange(popup, newUrl, currentOldUrl);
        }, 1000);
    }

    function getPopupLocation(popup) {
        try {
            return popup.location.href;
        } catch {
            return ''
        }
    }

    return {authVK}
}
