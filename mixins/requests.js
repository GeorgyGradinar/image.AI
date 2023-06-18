import {personStore} from "~/store/personStore";
import {modelsStore} from "~/store/models";
import {imagesStore} from "~/store/imageStore";
import {ACCOUNT_STORAGE_KEY, IS_CHEATER_STORAGE_KEY} from "~/constants";
import {HEADER_PARAMETERS, MAIN_URL} from "~/config"
import apiMapper from "~/mixins/apiMapper";
import getRequestOptions from "~/mixins/requestOptions";
import storage from "~/mixins/storage";
import shareFunctions from "~/mixins/shareFunctions";

export default function requests() {
    const store = personStore();
    const {changePerson} = store;
    const models = modelsStore()
    const {
        toggleAcceptDialog,
        toggleSnackBarDone,
        toggleSnackBarReject,
        changeErrorMessageRegistration,
        toggleRegistrationDialog
    } = models;
    const imageStore = imagesStore();
    const {
        addNewImages,
        addOldImages,
        changeImagePage,
        toggleShowMainLoader,
        toggleInProgressMoreImages,
        toggleShowButtonMoreImages,
        changeTotalImages
    } = imageStore;
    const {personMapper} = apiMapper();
    const {setLocalStorage, getLocalStorage, setCookie, getCookie} = storage();
    const {prepareLogout} = shareFunctions();

    let timer;

    function initStore() {
        changePerson(getLocalStorage(ACCOUNT_STORAGE_KEY))
    }

    function registration(data) {
        let isCheater = !!getLocalStorage(IS_CHEATER_STORAGE_KEY)?.length || getCookie().includes(IS_CHEATER_STORAGE_KEY);
        let body = {
            email: data.email,
            password: data.password,
            name: data.name,
            password_confirmation: data.passwordConfirmation,
        }
        console.log(store.referralId)
        body = store.referralId ? {...body, refferal_id: store.referralId} : body;
        body = isCheater ? {...body, is_cheater: isCheater} : body;

        $fetch(`${MAIN_URL}/api/v1/register?${new URLSearchParams(body)}`, getRequestOptions('POST', [HEADER_PARAMETERS.accept]))
            .then(response => {
                changePerson(personMapper(response.user, response.authorisation.token));
                // if (!response.user.email_verified_at) {
                //     toggleAcceptDialog(true);
                //     getPersonInfo();
                // }
                window.ym(93987528, 'reachGoal', '632235');
                toggleRegistrationDialog(false);
            })
            .catch(error => {
                if (error.statusCode === 401) {
                    prepareLogout();
                } else if (error.statusCode === 422) {
                    changeErrorMessageRegistration('Пользователь с такой почтой уже существует');
                } else {
                    changeErrorMessageRegistration('Что-то пошло не так, повторите попытку');
                }
            })
    }

    function sendMessageToEmail() {
        $fetch(`${MAIN_URL}/email/verification-notification`, getRequestOptions('POST', [HEADER_PARAMETERS.authorization]))
            .then(() => {
                toggleSnackBarDone({isOpen: true, text: 'Сообщение отправлено'});
            })
            .catch(() => {
                toggleSnackBarReject({isOpen: true, text: 'Что-то пошло не так'})
            })
    }

    function loginIn(data) {
        let requestOptions = [HEADER_PARAMETERS.accept];
        const body = {
            email: data.email,
            password: data.password
        }
        return $fetch(`${MAIN_URL}/api/v1/login?${new URLSearchParams(body)}`, getRequestOptions('POST', requestOptions));
    }

    function logout() {
        let requestOptions = [HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/logout`, getRequestOptions('POST', requestOptions))
            .then(request => {
                if (request.status === 'success') {
                    prepareLogout();
                }
            })
            .catch(() => prepareLogout());
    }

    function getPersonInfo() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/user/me`, getRequestOptions('GET', requestOptions))
            .then(response => {
                changePerson(personMapper(response.user, store.person.token));
                if (!response.user.email_verified_at) {
                    toggleAcceptDialog(true);
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => getPersonInfo(), 5000);
                } else {
                    setLocalStorage(IS_CHEATER_STORAGE_KEY, response.user.email);
                    setCookie(IS_CHEATER_STORAGE_KEY, response.user.email);
                    toggleAcceptDialog(false);
                }
            })
            .catch(error => {
                if (error.statusCode === 401) {
                    prepareLogout();
                }
            })
    }

    function getPersonGallery() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        imageStore.getImagePages === 1 && !imageStore.images.length ? toggleShowMainLoader(true) : toggleInProgressMoreImages(true);
        $fetch(`${MAIN_URL}/api/v1/user/gallery?items_per_page=30&page=${imageStore.getImagePages}`, getRequestOptions('GET', requestOptions))
            .then(response => {
                if (response.status === 'success') {
                    if (response.gallery.data.length) {
                        toggleSnackBarDone({isOpen: true, text: 'Изображения загружены'});
                        changeTotalImages(response.gallery.total);

                        if (imageStore.getImagePages === 1) {
                            addNewImages(response.gallery.data);
                        } else {
                            addOldImages(response.gallery.data);
                        }

                        if (imageStore.totalImages > imageStore.images.length) {
                            changeImagePage(imageStore.getImagePages + 1);
                        } else {
                            toggleShowButtonMoreImages(false);
                        }
                    }
                    toggleInProgressMoreImages(false);
                    toggleShowMainLoader(false);
                }
            })
            .catch(error => {
                if (error.statusCode === 401) {
                    prepareLogout();
                } else {
                    toggleSnackBarReject({isOpen: true, text: 'Что-то пошло не так'});
                }
            })
    }

    function getSharedImage(id) {
       return $fetch(`https://api.neuro-holst.ru/api/v1/image/share/get/?share_id=${id}`, [HEADER_PARAMETERS.accept])
    }

    return {
        registration,
        sendMessageToEmail,
        loginIn,
        logout,
        getPersonInfo,
        initStore,
        getPersonGallery,
        getSharedImage
    };
}
