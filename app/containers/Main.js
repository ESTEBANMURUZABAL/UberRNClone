import React, { Component, PropTypes } from 'react'
import { TouchableOpacity, Dimensions, StyleSheet, View, Image } from 'react-native'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'

import { connect } from 'react-redux'
import MapView from 'react-native-maps';

import { globalActionCreators, SEARCH_SELECTED } from '../redux/global'

import {
  LocationButtonGroup,
  LocationSearchHeader,
  LocationSearchResults,
  SearchResultsList,
  NavigationIcon,
} from '../components'

const mapStateToProps = (state) => ({
  recentLocations: state.global.recentLocations,
  searchedLocations: state.global.searchedLocations,
  searchSelected: state.global.searchSelected,
  setSearchSelect: state.global.setSearchSelect,
  shortcutLocations: state.global.recentLocations.slice(0, 3),
  searchIsOpen: state.global.searchIsOpen,
  destination: state.global.destination,
  source: state.global.source,
})

class Main extends Component {
  constructor(props) {
    super(props)
    this._closeSearch = this._closeSearch.bind(this)
    this._setLocation = this._setLocation.bind(this)
  }

  _closeSearch() {
    this.props.closeSearch()
    dismissKeyboard()
  }

  _setLocation(addressString){
     const {searchSelected} = this.props;
     if(searchSelected == SEARCH_SELECTED.DESTINATION){
       this.props.setDestination(addressString);
     }else{
       this.props.setSource(addressString);
     }
  }

  render() {
    const {recentLocations, searchedLocations, shortcutLocations} = this.props

    const {width: windowWidth, height: windowHeight} = Dimensions.get('window')
    const style = {
      height: windowHeight,
      width: windowWidth,
      zIndex: 0,
    }



    return (
      <View
        style={styles.main}
      >
        <LocationSearchHeader
          searchIsOpen={this.props.searchIsOpen}
          openSearch={this.props.openSearch}
          fetchAutoComplete={this.props.fetchAutoComplete}
          closeSearch={this.props.closeSearch}
          destination={this.props.destination}
          source={this.props.source}
          setSearchSelect={this.props.setSearchSelect}
          setDestination={this.props.setDestination}
          setSource={this.props.setSource}
        />
        <MapView
          style={style}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <LocationSearchResults visible={this.props.searchIsOpen}>
          <SearchResultsList
            searchedLocations={searchedLocations}
            recentLocations={recentLocations}
            setLocation={this._setLocation}
          />
        </LocationSearchResults>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={this._closeSearch}
        >
          { this.props.searchIsOpen ?
            <Image
              style={styles.controlButton}
              source={require('../images/icon-arrow-left.png')}
            />
            :
            <Image
              style={styles.controlButton}
              source={require('../images/icon-hamburger.png')}
            />
          }
        </TouchableOpacity>
        <LocationButtonGroup
          visible={!this.props.searchIsOpen}
          locations={recentLocations.slice(0,3)}
          onPressLocation={this.props.setDestination}
          openSearch={this.props.openSearch}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    top: 20,
  },
  controlButton: {
    position: 'absolute',
    height: 20,
    width: 20,
    top: 10,
    left: 10,
    zIndex: 10,
  }
})

export default connect(mapStateToProps, globalActionCreators)(Main)
