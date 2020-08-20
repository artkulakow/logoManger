/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { modifyUser, createUser } from '../../../actions/admin';

import './Admin.scss';

const Admin = () => {
    const emailPattern = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$';

    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    let userName = '';
    let firstName = '';
    let lastName = '';
    let emailAddress = '';
    let units = 'standard';
    let userId = -1;
    if (admin.adminUserError === null && !admin.adminUserLoading && admin.adminUser != null) {
        userName = admin.adminUser.userName;
        firstName = admin.adminUser.firstName;
        lastName = admin.adminUser.lastName;
        emailAddress = admin.adminUser.email;
        units = admin.adminUser.units;

        userId = admin.adminUserId;
    }

    const adminModifyUser = (userId, userName, firstName, lastName, emailAddress, units) => dispatch(modifyUser(userId, userName, firstName, lastName, emailAddress, units));
    const adminCreateUser = (userName, firstName, lastName, emailAddress, units) => dispatch(createUser(userName, firstName, lastName, emailAddress, units));

    const [adminUserName, setAdminUserName] = useState(userName);
    const [adminFirstName, setAdminFirstName] = useState(firstName);
    const [adminLastName, setAdminLastName] = useState(lastName);
    const [adminEmailAddress, setAdminEmailAddress] = useState(emailAddress);
    const [adminUnits, setAdminUnits] = useState(units);
    const [disablePersonal, setDisablePersonal] = useState(userName === '' | emailAddress === '');
    const [btnLabel, setBtnLabel] = useState(userId === -1 ? 'Create' : 'Update');
    const [displayError, setDisplayError] = useState(false);
    const [fieldInError, setFieldInError] = useState('');

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
            setAdminEmailAddress(emailAddress);
        }

        if (units) {
            setAdminUnits(units);
        }

        setBtnLabel(userId === -1 ? 'Create' : 'Update');
    }, [userName, firstName, lastName, emailAddress, units, userId]);

    useEffect(() => {
        setDisablePersonal(adminUserName === '' | adminEmailAddress === '');
    }, [adminUserName, adminEmailAddress]);

    useEffect(() => {
        if (admin.adminModifyUserError !== null) {
            setDisplayError(true);
            setFieldInError(admin.adminModifyUserError.data.field);
        } else {
            setDisplayError(false);
            setFieldInError('');
        }

        if (admin.adminCreateUserError !== null) {
            setDisplayError(true);
            setFieldInError(admin.adminCreateUserError.data.field);
        } else {
            setDisplayError(false);
            setFieldInError('');
        }

        if (admin.adminCreateUserSuccess) {
            // eslint-disable-next-line no-undef
            localStorage.setItem('userId', admin.adminUser.id);
            setBtnLabel('Update');
        }
    }, [admin]);

    const onChangeUserName = (e) => {
        setAdminUserName(e.target.value);
    };

    const onChangeFirstName = (e) => {
        setAdminFirstName(e.target.value);
    };

    const onChangeLastName = (e) => {
        setAdminLastName(e.target.value);
    };

    const onChangeEmailAddress = (e) => {
        setAdminEmailAddress(e.target.value);
    };

    const onClickUpdatePersonal = () => {
        if (userId === -1) {
            adminCreateUser(adminUserName, adminFirstName, adminLastName, adminEmailAddress, adminUnits);
        } else {
            adminModifyUser(userId, adminUserName, adminFirstName, adminLastName, adminEmailAddress, adminUnits);
        }
    };

    const onChangeUnits = (units) => {
        setAdminUnits(units);
    };

    const displayErrorComponent = () => {
        if (!displayError) {
            return;
        }

        let errMsg = 'Error Message';
        let errNum = -1;
        if (admin.adminModifyUserError !== null) {
            errMsg = admin.adminModifyUserError.data.msg;
            errNum = admin.adminModifyUserError.data.errorNum;
        } else if (admin.adminCreateUserError !== null) {
            errMsg = admin.adminCreateUserError.data.msg;
            errNum = admin.adminCreateUserError.data.errorNum;
        }

        const msgHeader = `ERROR - ${errMsg} (Error Number: ${errNum})`;

        // eslint-disable-next-line consistent-return
        return (
            <div className="errMsgHeader">
                {msgHeader}
            </div>
        );
    };

    const selectedUnitStandard = adminUnits === 'standard';
    const selectedUnitMetric = adminUnits === 'metric';

    let emailFieldDivStyle = 'emailAddrDiv';
    if (fieldInError === 'email') {
        emailFieldDivStyle += ' fieldError';
    }

    return (
        <div className="admin">
            <div className="header">
                <div className="label">
                    Admin / Settings
                </div>
                <div className="btnDiv">
                    <button
                        type="button"
                        className="updateBtn"
                        onClick={() => onClickUpdatePersonal()}
                        disabled={disablePersonal}
                    >
                        {btnLabel}
                    </button>
                </div>
            </div>

            {displayErrorComponent()}

            <div className="guts">
                <fieldset className="fieldSetPerson">
                    <legend>User Account</legend>
                    <div className="personalLineDiv">
                        <div className="requiredMsg">
                            <span className="requiredSymbol">*</span>
                            {' '}
                            - required field
                        </div>
                    </div>
                    <div className="personalLineDiv">
                        <div className="userNameDiv">
                            <div className="fieldLabel">
                                User Name
                                <span className="requiredSymbol">*</span>
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    className="inputText"
                                    value={adminUserName}
                                    onChange={onChangeUserName}
                                    placeholder="User Name"
                                    maxLength="20"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="personalLineDiv">
                        <div className="fullNameDiv">
                            <div className="firstNameDiv">
                                <div className="fieldLabel">First Name</div>
                                <div className="field">
                                    <input
                                        type="text"
                                        className="inputText"
                                        value={adminFirstName}
                                        onChange={onChangeFirstName}
                                        placeholder="First Name"
                                        maxLength="40"
                                    />
                                </div>
                            </div>
                            <div className="lastNameDiv">
                                <div className="fieldLabel">Last Name</div>
                                <div className="field">
                                    <input
                                        type="text"
                                        className="inputText"
                                        value={adminLastName}
                                        onChange={onChangeLastName}
                                        placeholder="Last Name"
                                        maxLength="40"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="personalLineDiv">
                        <div className={emailFieldDivStyle}>
                            <div className="fieldLabel">
                                Email Address
                                <span className="requiredSymbol">*</span>
                            </div>
                            <div className="field">
                                <input
                                    type="email"
                                    pattern={emailPattern}
                                    className="inputText"
                                    value={adminEmailAddress}
                                    onChange={onChangeEmailAddress}
                                    placeholder="Email Address"
                                    maxLength="256"
                                />
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="fieldSetUnits">
                    <legend>Units</legend>
                    <div className="unitRadioDiv">
                        <input
                            type="radio"
                            id="standardUnits"
                            value="standard"
                            checked={selectedUnitStandard}
                            onChange={() => onChangeUnits('standard')}
                        />
                        <label htmlFor="standardUnits">
                            Standard
                        </label>
                    </div>
                    <div className="unitRadioDiv">
                        <input
                            type="radio"
                            id="metricUnits"
                            value="metric"
                            checked={selectedUnitMetric}
                            onChange={() => onChangeUnits('metric')}
                        />
                        <label htmlFor="metricUnits">Metric</label>
                    </div>

                </fieldset>
            </div>
        </div>
    );
};

export default Admin;
