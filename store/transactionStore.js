import {defineStore} from "pinia";
import {ref} from "vue";

export const transactionStore = defineStore('transactionsStore', () => {
    let allTransactions = ref([]);
    let allPayments = ref([]);
    let pages = ref(1);

    function clearTransactionStore() {
        allTransactions.value = [];
        allPayments.value = [];
        pages.value = 1;
    }

    function addTransactions(newTransactions) {
        allTransactions.value = [...allTransactions.value, ...newTransactions];
    }

    function addPayments(newPayments) {
        allPayments.value = [... allPayments.value, ...newPayments];
    }

    function changePages(currentPage) {
        pages.value = currentPage;
    }

    return {
        clearTransactionStore,
        allTransactions, addTransactions,
        allPayments, addPayments,
        pages, changePages,

    }
})
