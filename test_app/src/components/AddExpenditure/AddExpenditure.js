import React from 'react';
import { addExpense, startAddExpense } from '../../actions/expenses';
import { connect } from 'react-redux';
import ExpenseForm from '../ExpenseForm/ExpenseForm';

class AddExpenditure extends React.Component {
    onSubmit = (expense) => {
        console.log(expense);
        this.props.startAddExpense(expense);
        this.props.history.push('/dashboard')
    }
    render() {
        return (
            <div>
                {/* <h3> Add Expense </h3> */}
                <ExpenseForm
                    onSubmit={this.onSubmit} />
                {/* <ShowExpenses /> */}
            </div >
        );
    }
}

const mapStateToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
})

export default connect(undefined, mapStateToProps)(AddExpenditure);