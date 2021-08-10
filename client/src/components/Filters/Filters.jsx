import React from "react";
import { useDispatch } from "react-redux";
import { filterBy } from "../../actions/order&filters";
import style from '../Filters/Filters.module.css'

export default function FilterOptions() {
    const dispatch = useDispatch();
    const handleCreated = (e) => {
        switch (e.target.value) {
            case 'FromAPI': 
            
                dispatch(filterBy(elem =>elem.id.length < 8)); break
            case 'CreatedInBD':
                dispatch(filterBy(elem => elem.id.length > 8 )); break
            default: dispatch(filterBy(vg => vg.hasOwnProperty('id')))
        }
    };

    return (
        <div>
            <h5 className={style.label}>Filter by Created:</h5>
            <form >
                <select className={style.box_select} name="Created" onChange={handleCreated}>
                    <option value="All">All</option>
                    <option value="FromAPI">From API</option>
                    <option value="CreatedInBD"> In BaseData</option>
                </select>
            </form>
        </div>
    )
};