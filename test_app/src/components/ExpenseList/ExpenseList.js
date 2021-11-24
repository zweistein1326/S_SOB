import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux'
import ExpenseTile from './ExpenseTile';
import selectExpenses from '../../selectors/expenses'
import styles from './expenseList.module.css';
import { filterOrder, sortByDate, sortByAmount } from '../../actions/filters';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

const ExpenseList = (props) => {
    console.log(props.expenses)
    var total = new Map();

    const [order, changeOrder] = useState(1)

    const toggleFilterDate = () => {
        props.dispatch(sortByDate(-1 * order))
        changeOrder(-1 * order)
    }
    const toggleFilterAmount = () => {
        props.dispatch(sortByAmount(-1 * order))
        changeOrder(-1 * order)

    }

    const calculateTotal = (amount, currency) => {
        if (total.has(currency)) {
            var totalAmount = total.get(currency)
            total.set(currency, amount + totalAmount)
        }
        else {
            total.set(currency, amount)
        }
    }

    props.expenses.forEach((expense) => {
        calculateTotal(expense.amount, expense.currency);
    })

    let keys = Array.from(total.keys())

    return props.expenses.length > 0 ?
        (<div className={styles.expenseList}>
            <h3 className={styles.total}>
                Total: {keys.map((key, index) =>
                <p style={{ display: 'inline' }}>{key}{total.get(key) / 100}{index === keys.length - 1 ? "" : "+"}</p>
            )}
            </h3>
            <table className={styles.expensesTable}>
                <thead>
                    <tr>
                        <th>Date{" "}
                            {order < 0 ? <AiOutlineArrowUp onClick={toggleFilterDate} /> :
                                <AiOutlineArrowDown onClick={toggleFilterDate} />}
                        </th>
                        <th>Expense</th>
                        <th>Amount Spent{" "}
                            {order < 0 ? <AiOutlineArrowUp onClick={toggleFilterAmount} /> :
                                <AiOutlineArrowDown onClick={toggleFilterAmount} />}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.expenses.map((expense) =>
                        <ExpenseTile {...expense} key={expense.id} />
                    )}
                </tbody>
            </table>
        </div>) : (
            <div className={styles.expenseList}>
                <h4>Add new transactions to get started</h4>
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseList);
