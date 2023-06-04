import getRequestOptions from "~/mixins/requestOptions";
import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import {personStore} from "~/store/personStore";

export default function billing() {
    const store = personStore();

    function getRates() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return $fetch(`${MAIN_URL}/api/v1/tariff/packages`, requestOptions)
    }

    function buyRate(id) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];

        $fetch(`${MAIN_URL}/api/v1/tariff/buy?package=${id}`, getRequestOptions('POST', requestOptions))
            .then(response => {
                window.open(response.payment_url, '_blank')
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
