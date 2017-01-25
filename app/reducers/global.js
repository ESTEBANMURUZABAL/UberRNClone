import {types, SEARCH_SELECTED} from "../actions/types";

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
  searchSelected: SEARCH_SELECTED.DESTINATION,
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
    case types.SET_SEARCH_SELECTED:
      return Object.assign({}, state, {
        searchSelected: action.select
      })
    default:
      return state
  }
}
