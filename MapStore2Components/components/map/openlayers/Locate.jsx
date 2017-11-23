/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

var React = require('react');
const PropTypes = require('prop-types');
var OlLocate = require('../../../utils/openlayers/OlLocate');

class Locate extends React.Component {
    static propTypes = {
        map: PropTypes.object,
        status: PropTypes.string,
        messages: PropTypes.object,
        changeLocateState: PropTypes.func,
        onLocateError: PropTypes.func
    }
    static defaultProps = {
        id: 'overview',
        status: "DISABLED",
        changeLocateState: () => {},
        onLocateError: () => {}
    }
    componentDidMount() {
        if (this.props.map) {
            this.locate = new OlLocate(this.props.map, this.defaultOpt);
            this.locate.setStrings(this.props.messages);
            this.locate.options.onLocationError = this.onLocationError;
            this.locate.on("propertychange", (e) => {this.onStateChange(e.target.get(e.key)); });
            this.configureLocate(this.props.status);
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.status !== this.props.status) {
            this.configureLocate(newProps.status);
        }
        if (newProps.messages !== this.props.messages) {
            this.locate.setStrings(newProps.messages);
        }
    }
    configureLocate = (newStatus) => {
        let state = this.locate.get("state");
        if ( newStatus === "ENABLED" && state === "DISABLED") {
            this.locate.start();
        }else if (newStatus === "FOLLOWING" && state === "ENABLED") {
            this.locate.startFollow();
        }else if (newStatus === "DISABLED") {
            this.locate.stop();
        }
    }
    onStateChange = (state) => {
        if (this.props.status !== state) {
            this.props.changeLocateState(state);
        }
    }
    onLocationError = (err) => {
        this.props.onLocateError(err.message);
        this.props.changeLocateState("DISABLED");
    }
    render() {
        return null;
    }
    static defaultOpt: {
        follow: false,// follow with zoom and pan the user's location
        remainActive: true,
        metric: true,
        stopFollowingOnDrag: false,
        keepCurrentZoomLevel: true,
        locateOptions: {
            maximumAge: 2000,
            enableHighAccuracy: true,
            timeout: 10000,
            maxZoom: 18
        }
    }
};

module.exports = Locate;
