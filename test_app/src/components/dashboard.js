import React from 'react';
import AddExpenditure from './AddExpenditure/AddExpenditure';
import ExpenseList from './ExpenseList/ExpenseList';
import ExpenseListFilters from './ExpenseList/ExpenseListFilters';
import InputBudget from './inputBudget';

function Dashboard() {
    return (
        <div>
            {/* <InputBudget /> */}
            {/* <h3>Monthly expenditure</h3>
            <h2>01.04.2021</h2> */}
            <ExpenseListFilters />
            {/* <AddExpenditure /> */}
            <ExpenseList />
        </div>

    );
}
export default Dashboard