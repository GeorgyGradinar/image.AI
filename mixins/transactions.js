import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import getRequestOptions from "~/mixins/requestOptions";
import {transactionStore} from "~/store/transactionStore";

export default function transactions() {
    const transactionsStore = transactionStore();
    const {addTransactions, changePages} = transactionsStore;

    function getPersonTransaction() {
        let requestOptions = [HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/user/transactions?items_per_page=30&page=${transactionsStore.pages}`, getRequestOptions('GET', requestOptions))
            .then(response => {
                console.log(response.transactions)
                addTransactions(response.transactions.data);
                changePages(response.transactions.current_page + 1);
                if(response.transactions.data){
                    console.log()
                }
            })
    }

    return {getPersonTransaction}
}
