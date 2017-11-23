/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
const {changeMeasurement} = require('../../MapStore2Components/actions/measurement');
const {changeRedliningState} = require('./redlining');
const {changeMapInfoState} = require('../../MapStore2Components/actions/mapInfo');

function setCurrentTask(task, mode=null, allowIdentify=false) {
    return (dispatch) => {
        dispatch(changeMeasurement({geomType: null}));
        dispatch(changeRedliningState({geomType: null}));
        dispatch(changeMapInfoState(task === null || allowIdentify));
        dispatch({
            type: SET_CURRENT_TASK,
            current: task,
            mode: mode
        });
    }
}

module.exports = {
    SET_CURRENT_TASK,
    setCurrentTask
}
