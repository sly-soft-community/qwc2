/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = require('prop-types');
const {connect} = require('react-redux');
const {Glyphicon} = require('react-bootstrap');
const {setCurrentTask} = require("../actions/task");
require('./style/TaskBar.css');

class TaskBar extends React.Component {
    static propTypes = {
        task: PropTypes.string.isRequired,
        currentTask: PropTypes.string,
        onClose: PropTypes.func
    }
    static defaultProps = {
        onClose: () => {}
    }
    onClose = () => {
        this.props.onClose();
        this.props.setCurrentTask(null);
    }
    renderRole = (role) => {
        return React.Children.toArray(this.props.children).filter((child) => child.props.role === role);
    }
    render() {
        if(this.props.currentTask !== this.props.task) {
            return null;
        }
        return (
            <div>
                <div id="TaskBar" className={this.props.task}>
                    <div className="taskbar">
                        <span className="body">
                            {this.renderRole("body")}
                        </span>
                        <span className="closewrapper">
                            <Glyphicon className="close" onClick={this.onClose} glyph="remove"/>
                        </span>
                    </div>
                </div>
                {this.renderRole("extra")}
            </div>
        );
    }
};

const selector = (state) => ({
    currentTask: state.task ? state.task.current : null
});

module.exports = {
    TaskBar: connect(selector, {
        setCurrentTask: setCurrentTask,
    })(TaskBar),
    reducers: {
        task: require('../reducers/task')
    }
}
