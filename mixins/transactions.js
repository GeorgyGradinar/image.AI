import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import getRequestOptions from "~/mixins/requestOptions";
import {transactionStore} from "~/store/transactionStore";
import {modelsStore} from "~/store/models";
import shareFunctions from "~/mixins/shareFunctions";

export default function transactions() {
    const transactionsStore = transactionStore();
    const {addTransactions, addPayments, changePages, changeAllPages} = transactionsStore;
    const models = modelsStore()
    const {toggleSnackBarDone, toggleSnackBarReject,} = models;
    const {prepareLogout} = shareFunctions();

    function getPersonTransaction() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/user/transactions?items_per_page=20&page=${transactionsStore.pages}`, getRequestOptions('GET', requestOptions))
            .then(response => {
                toggleSnackBarDone({isOpen: true, text: "История транзакций загружена"})
                addTransactions(response.transactions.data);
                changePages(response.transactions.current_page);
                changeAllPages(Math.ceil(response.transactions.total / response.transactions.per_page));
            })
            .catch(error => {
                if (error.statusCode === 401) {
                    prepareLogout();
                } else {
                    toggleSnackBarReject({isOpen: true, text: "Что-то пошло не так"})
                }
            })
    }

    function getPersonPayments() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/user/payments?items_per_page=20&page=${transactionsStore.pages}`, getRequestOptions('GET', requestOptions))
            .then(response => {
                toggleSnackBarDone({isOpen: true, text: "История транзакций загружена"});
                addPayments(response.payments.data);
                changePages(response.payments.current_page);
                changeAllPages(Math.ceil(response.payments.total / response.payments.per_page));
            })
            .catch(error => {
                if (error.statusCode === 401) {
                    prepareLogout();
                } else {
                    toggleSnackBarReject({isOpen: true, text: "Что-то пошло не так"});
                }
            })
    }

    function sortDataTransactions(date, price, type) {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        let body = {
            items_per_page: 20
        }
        body = date ? {...body, sort: date} : body;
        body = price ? {...body, amount: price} : body;
        body = type ? {...body, action: type} : body;
        $fetch(`${MAIN_URL}/api/v1/user/transactions?${new URLSearchParams(body)}`, getRequestOptions('GET', requestOptions))
            .then(response => {
                toggleSnackBarDone({isOpen: true, text: "История транзакций отсортирована"});
                addTransactions(response.transactions.data)
                changePages(response.transactions.current_page);
                changeAllPages(Math.ceil(response.transactions.total / response.transactions.per_page));
            })
            .catch(error => {
                if (error.statusCode === 401) {
                    prepareLogout();
                } else {
                    toggleSnackBarReject({isOpen: true, text: "Что-то пошло не так"});
                }
            })
    }

    function sortDataPayments(date, type) {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        let body = {
            items_per_page: 20
        }
        body = date ? {...body, sort: date} : body;
        body = type ? {...body, status: type} : body;
        $fetch(`${MAIN_URL}/api/v1/user/payments?${new URLSearchParams(body)}`, getRequestOptions('GET', requestOptions))
            .then(response => {
                toggleSnackBarDone({isOpen: true, text: "История транзакций отсортирована"});
                addPayments(response.payments.data);
                changePages(response.payments.current_page);
                changeAllPages(Math.ceil(response.payments.total / response.payments.per_page));
            })
            .catch(error => {
                if (error.statusCode === 401) {
                    prepareLogout();
                } else {
                    toggleSnackBarReject({isOpen: true, text: "Что-то пошло не так"});
                }
            })
    }

    return {getPersonTransaction, getPersonPayments, sortDataTransactions, sortDataPayments}
}
