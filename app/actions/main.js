import {types} from "./types";
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

const setSearchSelect = (select) => ({
  type: types.SET_SEARCH_SELECTED,
  select,
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
  return dispatch => {
    return fetch(url)
     .then(response => response.json())
     .then(json => (dispatch(receivePredictions(json))))
  }
}

export const globalActionCreators = {
  openSearch,
  closeSearch,
  setDestination,
  setSource,
  setSearchSelect,
  fetchAutoComplete
}
