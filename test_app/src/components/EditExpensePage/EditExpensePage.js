import React from 'react';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../../actions/expenses';
// import ExpenseForm from './ExpenseForm'
import styles from './EditExpensePage.module.css';

class EditExpensePage extends React.Component {
    onRemove = () => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            this.props.startRemoveExpense({ id: this.props.expense.id })
            this.props.history.push('/dashboard')
        }
    }
    onSubmit = (expense) => {
        this.props.startEditExpense({ id: this.props.expense.id, updates: expense })
        this.props.history.push('/dashboard')
    }
    render() {
        return (
            <div>
                <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <button className={styles.deleteButton} onClick={this.onRemove}>Remove Expense</button>
                </div>
            </div >);
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)