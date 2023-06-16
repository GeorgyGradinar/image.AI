import {defineStore} from "pinia";

export const transactionStore = defineStore('transactionsStore', () => {
    let transactions = ref([]);
    let pages = ref(1);
    let isShowButtonMoreTransactions = ref(false);

    function clearStore() {
        transactions.value = [];
        pages.value = 1;
    }

    function addTransactions(newTransactions) {
        transactions.value = [...transactions.value, ...newTransactions];
    }

    function changePages(currentPage) {
        pages.value = currentPage;
    }

    function toggleShowButtonMoreTransactions(isShow){
        isShowButtonMoreTransactions.value = isShow;
    }

    return {
        clearStore,
        transactions, addTransactions,
        pages, changePages,
        isShowButtonMoreTransactions, toggleShowButtonMoreTransactions,
    }
})
