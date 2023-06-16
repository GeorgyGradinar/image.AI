import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import getRequestOptions from "~/mixins/requestOptions";
import {transactionStore} from "~/store/transactionStore";
import {modelsStore} from "~/store/models";
import shareFunctions from "~/mixins/shareFunctions";

export default function transactions() {
    const transactionsStore = transactionStore();
    const {addTransactions, addPayments, changePages} = transactionsStore;
    const models = modelsStore()
    const {toggleSnackBarDone, toggleSnackBarReject,} = models;
    const {prepareLogout} = shareFunctions();

    function getPersonTransaction() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/user/transactions?items_per_page=30&page=${transactionsStore.pages}`, getRequestOptions('GET', requestOptions))
            .then(response => {
                toggleSnackBarDone({isOpen: true, text: "История транзакций загружена"})
                addTransactions(response.transactions.data);
                changePages(response.transactions.current_page + 1);
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
        $fetch(`${MAIN_URL}/api/v1/user/payments?items_per_page=30&page=1`, getRequestOptions('GET', requestOptions))
            .then(response => {
                toggleSnackBarDone({isOpen: true, text: "История транзакций загружена"});
                addPayments(response.payments.data);
            })
            .catch(error => {
                if (error.statusCode === 401) {
                    prepareLogout();
                } else {
                    toggleSnackBarReject({isOpen: true, text: "Что-то пошло не так"});
                }
            })
    }

    return {getPersonTransaction, getPersonPayments}
}
