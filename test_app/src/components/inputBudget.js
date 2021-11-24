import moment from 'moment';
import React from 'react';
import styles from './inputBudget.module.css';

class InputBudget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { budget: localStorage.getItem('budget'), enableEdit: true };
        this.handleBudgetChange = this.handleBudgetChange.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
    }
    componentDidMount() {
        if (this.state.budget != null) {
            this.setState({ enableEdit: false })
        }
    }

    handleBudgetChange(e) {
        e.preventDefault();
        // console.log(e.target.value)
        this.setState({
            budget: e.target.value
        })
        localStorage.setItem('budget', e.target.value)
    }

    enableEdit(e) {
        e.preventDefault();
        this.setState({ enableEdit: !this.state.enableEdit });
    }
    render() {
        return (
            <div id={styles.inputBudget}>
                <form onSubmit={this.enableEdit}>
                    <label>Budget for the month of {moment().format('MMMM')}</label>
                    {this.state.enableEdit ? <input type="text" id="budget" name="budget" value={this.state.budget} onChange={this.handleBudgetChange} /> : <p>HKD {this.state.budget}</p>}
                    {this.state.enableEdit ? <button onClick={this.enableEdit}>Confirm</button> : <button onClick={this.enableEdit}>Pencil</button>}
                </form >

            </div>
        );
    }
}

export default InputBudget;