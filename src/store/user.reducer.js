import { userService } from '../services/user.service.js'


const initialState = {
    count: 10,
    user: userService.getLoggedinUser(),
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'INCREMENT':
            newState = { ...state, count: state.count + 1 }
            break;
        case 'DECREMENT':
            newState = { ...state, count: state.count - 1 }
            break;
        case 'CHANGE_COUNT':
            newState = { ...state, count: state.count + action.diff }
            break;
        case 'SET_USER':
            newState = { ...state, user: action.user}
            break;
        default:
    }
    // For debug:
    window.userState = newState;
    // console.log('State:', newState);
    return newState;

}
