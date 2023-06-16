import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import {personStore} from "~/store/personStore";
import {navigateTo} from "nuxt/app";
import getRequestOptions from "~/mixins/requestOptions";
import {modelsStore} from "~/store/models";
import shareFunctions from "~/mixins/shareFunctions";

export default function userSettings() {
    let store = personStore();
    const {changePerson} = store;
    const models = modelsStore();
    const {toggleSnackBarDone, toggleSnackBarReject} = models;
    const {prepareLogout} = shareFunctions();

    function deleteAccount() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/user/remove`, getRequestOptions('DELETE', requestOptions))
            .then(request => {
                if (request.status === 'success') {
                    changePerson({});
                    store.imagesData = {images: [], newImages: []};
                    navigateTo('/');
                }
            })
            .catch(error => {
                if (error.statusCode === 401) {
                    prepareLogout();
                }
            });
    }

    function updatePassword(newPassword, confirmation, oldPassword) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        return $fetch(`${MAIN_URL}/api/v1/user/change_password?newpassword=${newPassword}&newpassword_confirmation=${confirmation}&password=${oldPassword}`,
            getRequestOptions('PATCH', requestOptions))
    }

    function forgotPassword(email) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        return $fetch(`${MAIN_URL}/forgot-password?email=${email}`, getRequestOptions('POST', requestOptions))
    }

    function resetPassword(payload) {
        let requestOptions = [HEADER_PARAMETERS.accept];
        let body = {
            token: payload.token,
            email: payload.email,
            password: payload.newPassword,
            password_confirmation: payload.confirmation
        }
        $fetch(`${MAIN_URL}/reset-password?${new URLSearchParams(body)}`, getRequestOptions('POST', requestOptions))
            .then(response => {
                toggleSnackBarDone({isOpen: true, text: 'Пароль успешно обновлен'});
                navigateTo('/');
            })
            .catch(error => {
                toggleSnackBarReject({isOpen: true, text: 'Что-то пошло не так'});
                if (error.statusCode === 401) {
                    prepareLogout();
                }
            })
    }

    function updateUserData(name, email) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        return $fetch(`${MAIN_URL}/api/v1/user/profile?name=${name}&email=${email}`,
            getRequestOptions('PATCH', requestOptions))
    }

    return {deleteAccount, updatePassword, updateUserData, forgotPassword, resetPassword}
}
