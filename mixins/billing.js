export default function billing() {
    function getRates() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        return $fetch("https://imager.plinskiy.space/api/v1/tariff/packages", requestOptions)
    }

    return {getRates}
}
