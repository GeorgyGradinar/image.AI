import getRequestOptions from "~/mixins/requestOptions";
import {HEADER_PARAMETERS, MAIN_URL} from "~/config";

export default function billing() {

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
                console.log(response)
                window.open(response.payment_url, '_blank')
            })
    }

    return {getRates, buyRate}
}
