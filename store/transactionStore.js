import {defineStore} from "pinia";
import {ref} from "vue";

export const transactionStore = defineStore('transactionsStore', () => {
    let allTransactions = ref([]);
    let allPayments = ref([]);
    let pages = ref(1);
    let allPages = ref(null);

    function clearTransactionStore() {
        allTransactions.value = [];
        allPayments.value = [];
        pages.value = 1;
        allPages.value = null;
    }

    function addTransactions(newTransactions) {
        allTransactions.value = [...newTransactions];
    }

    function addPayments(newPayments) {
        allPayments.value = [...newPayments];
    }

    function changePages(currentPage) {
        pages.value = currentPage;
    }

    function changeAllPages(data){
        allPages.value = data;
    }

    return {
        clearTransactionStore,
        allTransactions, addTransactions,
        allPayments, addPayments,
        pages, changePages,
        allPages, changeAllPages,

    }
})
