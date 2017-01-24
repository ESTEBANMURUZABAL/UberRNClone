const types = {
  OPEN_SEARCH: 'OPEN_SEARCH',
  CLOSE_SEARCH: 'CLOSE_SEARCH',
  SET_DESTINATION: 'SET_DESTINATION',
  SET_SOURCE: 'SET_SOURCE',
  RECEIVE_PREDICTIONS: 'RECEIVE_PREDICTIONS'
}

import Qs from 'qs';

const openSearch = () => ({
  type: types.OPEN_SEARCH,
})

const closeSearch = () => ({
  type: types.CLOSE_SEARCH,
})

const setDestination = (destination) => ({
  type: types.SET_DESTINATION,
  destination,
})

const setSource = (source) => ({
  type: types.SET_SOURCE,
  source,
})

const receivePredictions = (json) => {
  var predictions = []
  json.predictions.map((value,i)=> {
    var prediction = {
      id: value.id,
      icon:'recent',
      title:value.description,
      subtitle:value.description,
    }
    predictions.push(prediction);
  });
  return {
    type: types.RECEIVE_PREDICTIONS,
    predictions
  }
}

intialQuery = {
  key: 'AIzaSyDBHetSZ45da64kmwV8cCBbYjD5lefmKFc',
  language: 'en'
}

const fetchAutoComplete = (text, query = intialQuery) => {
  text = encodeURIComponent(text)
  const queryRaw = Qs.stringify(query)
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${text}&${queryRaw}`
  if(text.length > 3){
    return dispatch => {
      return fetch(url)
       .then(response => response.json())
       .then(json => (dispatch(receivePredictions(json))))
    }
  }
}

export const globalActionCreators = {
  openSearch,
  closeSearch,
  setDestination,
  setSource,
  fetchAutoComplete
}

const initialState = {
  recentLocations: [
    {id: 0, icon: 'home', title: 'Home', subtitle: '123 Spear St, San Francisco'},
    {id: 1, icon: 'recent', title: 'Zynga HQ', subtitle: '699 8th St, San Francisco'},
    {id: 2, icon: 'recent', title: 'Facebook HQ', subtitle: '888 Brannan St, San Francisco, CA'},
    {id: 3, icon: 'recent', title: '123 Apple Road', subtitle: 'Cupertino, CA'},
    {id: 4, icon: 'recent', title: '445 1st St', subtitle: 'Sunnyvale, CA'},
  ],
  searchIsOpen: false,
  destination: 'Where to?',
  source: 'Office',
  searchedLocations:[]
}


export default global = (state = initialState, action) => {
  switch(action.type) {
    case types.OPEN_SEARCH:
      return Object.assign({}, state, {
        searchIsOpen: true
      })
    case types.CLOSE_SEARCH:
      return Object.assign({}, state, {
        searchIsOpen: false
      })
    case types.SET_DESTINATION:
      return Object.assign({}, state, {
        destination: action.destination,
      })
    case types.SET_SOURCE:
      return Object.assign({}, state, {
        source: action.source,
      })
    case types.RECEIVE_PREDICTIONS:
      return Object.assign({}, state, {
        searchedLocations: action.predictions
      })
    default:
      return state
  }
}
