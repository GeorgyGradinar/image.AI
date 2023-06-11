import {personStore} from "~/store/personStore";
import requests from "~/mixins/requests";
import {modelsStore} from "~/store/models";
import storage from "~/mixins/storage";
import {IS_CHEATER_STORAGE_KEY} from "~/constants";
import {MAIN_URL} from "~/config"

export default function socials() {
    const store = personStore();
    const {changePerson} = store;
    const {getPersonInfo} = requests();
    const {getLocalStorage, getCookie} = storage();

    const models = modelsStore();
    const {toggleRegistrationDialog, toggleLoginDialog} = models;

    function authVK() {
        console.log(`${MAIN_URL}/api/v1/login/vkontakte?${new URLSearchParams(bodyURL())}`)
        let popup = window.open(`${MAIN_URL}/api/v1/login/vkontakte`, '', generateParams())

        const currentURL = getPopupLocation(popup);
        checkUrlChange(popup, currentURL, '', 'login/vkontakte');
    }

    function authYandex() {
        let popup = window.open(`${MAIN_URL}/api/v1/login/yandex?${new URLSearchParams(bodyURL())}`, '', generateParams())
        const currentURL = getPopupLocation(popup);
        checkUrlChange(popup, currentURL, '', 'login/yandex');
    }

    function authGoogle() {
        let popup = window.open(`${MAIN_URL}/api/v1/login/google?${new URLSearchParams(bodyURL())}`, '_blank', generateParams())
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
            console.log(currentUrl)
            console.log(partOfUrl)
            if (currentUrl.includes(partOfUrl)) {
                const regexp = new RegExp(/token=([^&]*)/, 'gmi');
                const result = regexp.exec(currentUrl);
                const token = result?.length ? result[1] : null;
                console.log(token)
                if (token) {
                    changePerson({token});

                    popup.close();
                    toggleRegistrationDialog(false);
                    toggleLoginDialog(false);
                    getPersonInfo();

                    return;
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
            console.dir(popup.location.href);
            return popup.location.href;
        } catch {
            return ''
        }
    }

    function bodyURL() {
        let isCheater = !!getLocalStorage(IS_CHEATER_STORAGE_KEY)?.length || getCookie().includes(IS_CHEATER_STORAGE_KEY);
        let body = {};
        body = store.referralId ? {...body, refferal_id: store.referralId} : body;
        body = isCheater ? {...body, is_cheater: isCheater} : body;
        return body;
    }

    return {authVK, authYandex, authGoogle}
}
