import React from 'react';
import firebase from 'firebase';
import { removeExpense } from '../actions/expenses';
import ExpenseTile from './ExpenseTile'

class ShowExpenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expenses: {} }
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        const database = firebase.database();
        database.ref().on("value", (snapshot) => {
            if (snapshot.val() != null) {
                this.setState({ expenses: snapshot.val()['Expenses']['3'] })
            }
        })
    }

    handleDelete(id) {
        removeExpense(id);
    }

    render() {
        // const database = firebase.database();
        // database.ref().on("value", (snapshot) => { console.log(snapshot.val()); })
        return (
            <div>
                {Object.keys(this.state.expenses).map((key, i) => { return (ExpenseTile(this.state.expenses[key], key)) })}
            </div >
        )
    }
}

export default ShowExpenses;