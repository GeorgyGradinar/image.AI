import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import {personStore} from "~/store/personStore";

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
                }
            })
            .catch(error => console.log(error));
    }

    function updatePassword() {

    }

    function updateUserData() {

    }

    function getRequestOptions(typeRequest, payload) {
        let myHeaders = new Headers();
        payload.forEach(headerElement => {
            if (headerElement.key === 'Authorization') {
                myHeaders.append(headerElement.key, `${headerElement.body} ${store.person.token}`);
            } else {
                myHeaders.append(headerElement.key, headerElement.body);
            }
        });

        return {
            method: typeRequest,
            headers: myHeaders,
            redirect: 'follow'
        };
    }

    return {deleteAccount, updatePassword, updateUserData}
}
