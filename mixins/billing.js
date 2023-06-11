import getRequestOptions from "~/mixins/requestOptions";
import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import {personStore} from "~/store/personStore";
import {modelsStore} from "~/store/models";
import shareFunctions from "~/mixins/shareFunctions";

export default function billing() {
    const store = personStore();
    const {changePerson} = store;
    const models = modelsStore();
    const {toggleSnackBarDone, toggleSnackBarReject, toggleAddEmailDialog} = models;
    const {prepareLogout} = shareFunctions();

    function getRates() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return $fetch(`${MAIN_URL}/api/v1/tariff/packages`, requestOptions)
    }

    function buyRate(id, email) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        let body = {
            package: id,
        }
        body = email ? {...body, email} : body;
        $fetch(`${MAIN_URL}/api/v1/yookassa/buy?${new URLSearchParams(body)}`, getRequestOptions('POST', requestOptions))
            .then(response => {
                window.open(response.payment_url, '_blank');
                toggleAddEmailDialog({isOpen: false, idRate: null})
            })
            .catch(error => {
                if (error.statusCode === 401) {
                    prepareLogout();
                }else if (error.statusCode === 422){
                    toggleSnackBarReject({isOpen:true, text: 'Пользователь с такой почтой уже зарегистрирован'})
                }
                console.dir(error)
            })
    }

    function priceGeneration() {
        let requestOptions = [HEADER_PARAMETERS.accept];
        let currentFilters = store.filters;
        return $fetch(`${MAIN_URL}/api/v1/image/request_price?height=${currentFilters.size.height}&width=${currentFilters.size.width}&prompt=${currentFilters.description}&negative_prompt=${currentFilters.exception}&is_upscaled=${0}&is_liked=${0}&count=${currentFilters.parameters.countImages}`,
            getRequestOptions('POST', requestOptions));
    }

    return {getRates, buyRate, priceGeneration}
}
