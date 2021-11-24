import React from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'
import styles from './expenseTile.module.css'
import { connect } from 'react-redux';
import { startRemoveExpense } from '../../actions/expenses';
import { BsTrashFill, BsPencil } from 'react-icons/bs'
import { RiPencilFill } from 'react-icons/ri'

function ExpenseTile({ startRemoveExpense, date, title, amount, id, currency }) {
    return (
        <tr className={styles.tile}>
            <td>{moment(date).format('MMMM Do, YYYY')}</td>
            <td>{title}</td>
            <td>{currency || 'SID'} {`${amount / 100}`}</td>
            <td>
                <Link to={`/editExpense/${id}`} color="red"><RiPencilFill size="18px" color="orange" /></Link>
                &nbsp;
                &nbsp;
                <BsTrashFill color="red" size="18px" onClick={() => {
                    if (window.confirm('Are you sure you want to delete this expense?')) {
                        startRemoveExpense({ id })
                    }
                }} />
            </td>
        </tr>
        // <div className={styles.tile} key={id}>
        //     <Link to={`/editExpense/${id}`} className={styles.link}>
        //         <p>{moment(date).format('MMMM Do YYYY')}</p>
        //         <h3>{title}</h3>
        //         <p>HKD {`${amount / 100}`}</p>
        //     </Link >
        //     <BsTrashFill
        //         size='20px'
        //         color="red"
        //         cursor='pointer'
        //         onClick={() => { startRemoveExpense({ id }) }}
        //     />
        // </div >
    )
}

const mapStateToProps = (state, props) => ({
    expense: props.expense
})

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTile)