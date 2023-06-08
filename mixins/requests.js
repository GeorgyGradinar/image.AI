import {personStore} from "~/store/personStore";
import {modelsStore} from "~/store/models";
import {imageGenerationStore} from "~/store/imageGenerationStore";
import {ACCOUNT_STORAGE_KEY, IS_CHEATER_STORAGE_KEY} from "~/constants";
import {HEADER_PARAMETERS, MAIN_URL} from "~/config"
import {navigateTo} from "nuxt/app";
import apiMapper from "~/mixins/apiMapper";
import getRequestOptions from "~/mixins/requestOptions";
import storage from "~/mixins/storage";

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
    const imageStore = imageGenerationStore();
    const {
        addOldImages,
        clearImages,
        changeImagePage,
        clearImagePage,
        toggleShowMainLoader,
        toggleInProgressMoreImages,
        toggleShowButtonMoreImages
    } = imageStore;
    const {personMapper} = apiMapper();
    const {setLocalStorage, getLocalStorage, setCookie, getCookie} = storage();
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
        body = store.referralId ? {...body, refferal_id: store.referralId} : body;
        body = isCheater ? {...body, is_cheater: isCheater} : body;

        $fetch(`${MAIN_URL}/api/v1/register?${new URLSearchParams(body)}`, getRequestOptions('POST', [HEADER_PARAMETERS.accept]))
            .then(response => {
                changePerson(personMapper(response.user, response.authorisation.token));

                if (!response.user.email_verified_at) {
                    toggleAcceptDialog(true);
                    getPersonInfo();
                }

                toggleRegistrationDialog(false);
            })
            .catch(error => {
                if (error.statusCode === 422) {
                    changeErrorMessageRegistration('Пользователь с такой почтой уже существует');
                } else {
                    changeErrorMessageRegistration('Что то пошло не так, повторите попытку');
                }
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
                    changePerson({});
                    clearImages();
                    clearImagePage();
                    navigateTo('/');
                }
            })
            .catch(error => {
                changePerson({});
                clearImages();
                clearImagePage();
                navigateTo('/');
            });
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
                if (error.status === 401) {
                    changePerson({});
                    clearImages();
                    navigateTo('/');
                }
            })
    }

    function getPersonTransaction() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        return $fetch(`${MAIN_URL}/api/v1/user/transactions`, getRequestOptions('GET', requestOptions))
    }

    function getImageShared(id) {
        return imagesData.find(image => image.img === `${id}.jpeg`)
    }

    function getPersonGallery() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        imageStore.getImagePages === 1 ? toggleShowMainLoader(true) : toggleInProgressMoreImages(true);

        $fetch(`${MAIN_URL}/api/v1/user/gallery?items_per_page=10&page=${imageStore.getImagePages}`, getRequestOptions('GET', requestOptions))
            .then(response => {
                if (response.status === 'success') {
                    addOldImages(response.images.data);
                    toggleSnackBarDone({isOpen: true, text: 'Изображения загружены'});

                    if (response.images.total > imageStore.images.length) {
                        changeImagePage();
                        toggleShowButtonMoreImages(true);
                    } else {
                        toggleShowButtonMoreImages(false);
                    }
                    toggleInProgressMoreImages(false);
                    toggleShowMainLoader(false);
                }
            })
            .catch(error => {
                if (error.status === 401) {
                    changePerson({});
                    clearImages();
                    navigateTo('/');

                }
            })
    }

    return {
        registration,
        loginIn,
        logout,
        getPersonInfo,
        initStore,
        getImageShared,
        getPersonTransaction,
        getPersonGallery
    };
}
