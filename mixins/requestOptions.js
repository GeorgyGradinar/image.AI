import {personStore} from "~/store/personStore";

export default function getRequestOptions(typeRequest, payload){
    let store = personStore();
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
