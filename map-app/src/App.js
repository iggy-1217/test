import React, { Component } from 'react';
import logo from './logo.svg';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './App.css';

class App extends Component {
    state = {
            viewport: {
              width: "100vw",
              height: "100vh",
              latitude: -37.7966362,
              longitude: 144.9614113,
              zoom: 15.5
          },
          studySpots: [],
          selectedStudySpot: null
    };

    componentDidMount() {
        this.fetchStationAPI();
    }

    setSelectedStudySpot = object => {
        this.setState({
            selectedStudySpot: object
        });
    };

    fetchStationAPI = () => {
        fetch('https://cors-anywhere.herokuapp.com/https://studygrouper.herokuapp.com/groups/get')
        .then(res => res.json())
        .then(studySpots => {
            this.setState({
                studySpots: studySpots
            });
        });
    };

    filterFreeWifi = hotspots => {
        return hotspots.filter(spot => {
            return spot.type === "Free";
        });
    };

    loadGroupMarkers = () => {
        return this.state.studySpots.map(spot => {
            return (
                <Marker
                key={spot.objectid}
                latitude={parseFloat(spot.latitude)}
                longitude={parseFloat(spot.longitude)}
                >
                <img onClick={() => {
                    this.setSelectedStudySpot(spot);
                }}
                src="/grouper-icon.png" alt="" />
                </Marker>
            );
        });
    };

    closePopup = () => {
        this.setState({
            selectedStudySpot: null
        });
    };


    render() {
        return (
            <div className="App">
            <ReactMapGL  {...this.state.viewport} mapStyle='mapbox://styles/mapbox/streets-v11' onViewportChange={(viewport => this.setState({viewport}))}
            mapboxApiAccessToken="pk.eyJ1IjoibGFjaHltY2tlaXRoIiwiYSI6ImNrYTU2OGRrMjE5cXEzbW1lcGo0aTNvbHYifQ.3vPMNgYiDB1AkUt8ALEHkA">
            {this.loadGroupMarkers()}
            {this.state.selectedStudySpot !== null ? (
                <Popup
                    latitude={parseFloat(this.state.selectedStudySpot.latitude)}
                    longitude={parseFloat(this.state.selectedStudySpot.longitude)}
                    onClose={this.closePopup}
                >
                <div>
                    <p>
                        <b>Subject:</b> {this.state.selectedStudySpot.group_subject}
                    </p>
                    <p>
                        <b>Currently working on:</b> {this.state.selectedStudySpot.group_assignment}
                    </p>
                </div>
                </Popup>
            ) : null}
            </ReactMapGL>
            </div>
        );
    }
}

export default App;
