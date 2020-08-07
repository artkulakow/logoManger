import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setUnits} from '../../../actions/admin';

import './Admin.scss';

const Admin = (props) => {
    const admin = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const adminSetUnits = k => dispatch(setUnits(k));

    const [adminUserName, setAdminUserName] = useState('');

    const onChangeUserName = (e) => {
        setAdminUserName(e.target.value)
    }

    const onChangeUnits = (units) => {
        adminSetUnits(units);

        localStorage.setItem('units', units);
    }

    const selectedUnitStandard = admin.adminUnits === 'standard' ? true : false;
    const selectedUnitMetric = admin.adminUnits === 'metric' ? true : false;

    return (
        <div className="admin">
            <div className="header">
                <div className="label">
                    Admin / Settings
                </div>

                <fieldset className="fieldSetPerson">
                    <legend>Person</legend>
                    <div className="personalLineDiv">
                        <div className="userNameDiv">
                            <div className="fieldLabel">User Name</div>
                            <div className="field">
                                <input type="text" value={adminUserName} onChange={onChangeUserName} placeholder="User Name" maxLength="20"></input>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="fieldSetUnits">
                    <legend>Units</legend>
                        <div className="unitRadioDiv">
                            <input type="radio" id="standardUnits" value="standard" checked={selectedUnitStandard} onChange={() => onChangeUnits('standard')}></input>
                            <label htmlFor="standardUnits">Standard</label>
                        </div>
                        <div className="unitRadioDiv">
                            <input type="radio" id="metricUnits" value="metric" checked={selectedUnitMetric} onChange={() => onChangeUnits('metric')}></input>
                            <label htmlFor="metricUnits">Metric</label>
                        </div>

                </fieldset>
            </div>
        </div>
    );
}



export default Admin;
