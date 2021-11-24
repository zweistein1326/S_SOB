import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchByText, sortByAmount, sortByDate, searchByDate } from '../../actions/filters';
import styles from './expenseListFilters.module.css';
import 'react-dates/initialize'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment';
const ExpenseListFilters = (props) => {
    const [startDate, changeStartDate] = useState(null);
    const [endDate, changeEndDate] = useState(null)
    const [focused, changeFocus] = useState('null');
    const changeDates = (start, end) => {
        changeStartDate(start);
        changeEndDate(end)
        props.dispatch(searchByDate(moment(start).valueOf(), moment(end).endOf('day').valueOf()))
    }
    return (
        <div id={styles.filters}>
            <div className={styles.datepicker}>
                <DateRangePicker
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    onDatesChange={({ startDate, endDate }) => changeDates(startDate, endDate)} // PropTypes.func.isRequired,
                    focusedInput={focused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => {
                        changeFocus(focusedInput)
                    }} // PropTypes.func.isRequired,
                    isOutsideRange={(day) => false} //show all months
                    openDirection='down'
                    showClearDates
                    showDefaultInputIcon
                    hideKeyboardShortcutsPanel
                    numberOfMonths={1}
                />
            </div>
            <div>
                <input type="text"
                    value={props.filters.text}
                    placeholder="search by title"
                    className={styles.searchInput}
                    onChange={(e) => {
                        props.dispatch(searchByText(e.target.value));
                    }} />
                {/* <select value={props.filters.sortBy}
                    className={styles.filterInput}
                    onChange={(e) => {
                        if (e.target.value === 'date') {
                            props.dispatch(sortByDate())
                        }
                        else if (e.target.value === 'amount') {
                            props.dispatch(sortByAmount());
                        }
                    }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select> */}
            </div>

        </div >
    );
}

const mapStateToProps = (state) => (
    { filters: state.filters }
)

export default connect(mapStateToProps)(ExpenseListFilters);
