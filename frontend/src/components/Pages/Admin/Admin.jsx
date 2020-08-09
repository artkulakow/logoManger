import React, { useState, useEffect, Fragment } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setUnits} from '../../../actions/admin';

import './Admin.scss';


const Admin = (props) => {
    const emailPattern = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$";

    const admin = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const adminSetUnits = k => dispatch(setUnits(k));

    const userName = admin.adminUserName;
    const firstName = admin.adminFirstName;
    const lastName = admin.adminLastName;
    const emailAddress = admin.adminEmailAddress;
    
    const [adminUserName, setAdminUserName] = useState(userName);
    const [adminFirstName, setAdminFirstName] = useState(firstName);
    const [adminLastName, setAdminLastName] = useState(lastName);
    const [adminEmailAddress, setAdminEmailAddress] = useState(emailAddress);
    const [disablePersonal, setDisablePersonal] = useState( userName === '' | emailAddress === '');

    useEffect(() => {
        if (userName) {
            setAdminUserName(userName);
        }

        if (firstName) {
            setAdminFirstName(firstName);
        }

        if (lastName) {
            setAdminLastName(lastName);
        }

        if (emailAddress) {
            setAdminEmailAddress(emailAddress)
        }
    }, [userName, firstName, lastName, emailAddress])

    useEffect(() => {
        setDisablePersonal( adminUserName === '' | adminEmailAddress === '');
    }, [adminUserName, adminEmailAddress])

    const onChangeUserName = (e) => {
        setAdminUserName(e.target.value)
    }

    const onChangeFirstName = (e) => {
        setAdminFirstName(e.target.value)
    }

    const onChangeLastName = (e) => {
        setAdminLastName(e.target.value)
    }

    const onChangeEmailAddress = (e) => {
        setAdminEmailAddress(e.target.value)
    }

    const onClickUpdatePersonal = () => {
        localStorage.setItem('userName', adminUserName);
        localStorage.setItem('firstName', adminFirstName);
        localStorage.setItem('lastName', adminLastName);
        localStorage.setItem('emailAddress', adminEmailAddress);
    }

    const onChangeUnits = (units) => {
        adminSetUnits(units);

        localStorage.setItem('units', units);
    }

    const selectedUnitStandard = admin.adminUnits === 'standard' ? true : false;
    const selectedUnitMetric = admin.adminUnits === 'metric' ? true : false;

    return (
        <Fragment>
        <div className="admin">
            <div className="header">
                <div className="label">
                    Admin / Settings
                </div>

                <fieldset className="fieldSetPerson">
                    <legend>User Account</legend>
                    <div className="personalLineDiv">
                        <div className="requiredMsg"><span className="requiredSymbol">*</span> - required field</div>
                    </div>
                    <div className="personalLineDiv">
                        <div className="userNameDiv">
                            <div className="fieldLabel">User Name <span className="requiredSymbol">*</span></div>
                            <div className="field">
                                <input type="text" className="inputText" value={adminUserName} onChange={onChangeUserName} placeholder="User Name" maxLength="20"></input>
                            </div>
                        </div>
                    </div>

                    <div className="personalLineDiv">
                        <div className="fullNameDiv">
                            <div className="firstNameDiv">
                                <div className="fieldLabel">First Name</div>
                                <div className="field">
                                    <input type="text" className="inputText" value={adminFirstName} onChange={onChangeFirstName} placeholder="First Name" maxLength="40"></input>
                                </div>
                            </div>
                            <div className="lastNameDiv">
                                <div className="fieldLabel">Last Name</div>
                                <div className="field">
                                    <input type="text" className="inputText" value={adminLastName} onChange={onChangeLastName} placeholder="Last Name" maxLength="40"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="personalLineDiv">
                        <div className="emailAddrDiv">
                            <div className="fieldLabel">Email Address <span className="requiredSymbol">*</span></div>
                            <div className="field">
                                <input type="email" pattern={emailPattern} className="inputText" value={adminEmailAddress} onChange={onChangeEmailAddress} placeholder="Email Address" maxLength="256"></input>
                            </div>                        
                        </div>
                    </div>
                    <div className="personalLineDiv">
                        <div className="updateDiv">
                            <button type="button" className="updateBtn" onClick={() => onClickUpdatePersonal()} disabled={disablePersonal}>Update</button>
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
        </Fragment>
    );
}



export default Admin;
