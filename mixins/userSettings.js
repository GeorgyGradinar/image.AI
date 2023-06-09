import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import {personStore} from "~/store/personStore";
import {navigateTo} from "nuxt/app";
import getRequestOptions from "~/mixins/requestOptions";

export default function userSettings() {
    let store = personStore();
    const {changePerson} = store;

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
                if (error.status === 401) {
                    changePerson({});
                    navigateTo('/');
                }
                console.log(error)
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
        console.log(payload)
        let body = {
            token: payload.token,
            password: payload.newPassword,
            password_confirmation: payload.confirmation
        }
        $fetch(`${MAIN_URL}/reset-password?${new URLSearchParams(body)}`, getRequestOptions('POST', requestOptions))
            .then(response => {
                console.log(response)
            })
    }

    function updateUserData(name, email) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        return $fetch(`${MAIN_URL}/api/v1/user/profile?name=${name}&email=${email}`,
            getRequestOptions('PATCH', requestOptions))
    }

    return {deleteAccount, updatePassword, updateUserData, forgotPassword, resetPassword}
}
