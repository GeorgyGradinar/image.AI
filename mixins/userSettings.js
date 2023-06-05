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
                if (error.status === 401){
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

    function updateUserData(name, email) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        return $fetch(`${MAIN_URL}/api/v1/user/profile?name=${name}&email=${email}`,
            getRequestOptions('PATCH', requestOptions))
    }

    // function getRequestOptions(typeRequest, payload) {
    //     let myHeaders = new Headers();
    //     payload.forEach(headerElement => {
    //         if (headerElement.key === 'Authorization') {
    //             myHeaders.append(headerElement.key, `${headerElement.body} ${store.person.token}`);
    //         } else {
    //             myHeaders.append(headerElement.key, headerElement.body);
    //         }
    //     });
    //
    //     return {
    //         method: typeRequest,
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };
    // }

    return {deleteAccount, updatePassword, updateUserData}
}
