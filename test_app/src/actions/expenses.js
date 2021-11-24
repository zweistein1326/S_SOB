import database from '../firebase/firebase';
import { v4 as uuid } from 'uuid'

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
})

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        console.log(expenseData);
        const {
            title = '',
            note = '',
            amount = 0,
            date = 0,
            currency = 'HKD'
        } = expenseData;
        const expense = { title, note, amount, date, currency };

        return database.ref(`users/${uid}/Expenses`).push(expense).then((childSnapshot) => {
            dispatch(addExpense({
                id: childSnapshot.key,
                ...expense
            }));
        });
    };
}

export const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/Expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};

export const editExpense = (id, updates) => {
    return {
        type: 'EDIT_EXPENSE',
        id,
        updates
    }
}

export const startEditExpense = ({ id, updates }) => {
    console.log(id, updates)
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/Expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    };
};

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/Expenses`).once('value').then((snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    };
};
