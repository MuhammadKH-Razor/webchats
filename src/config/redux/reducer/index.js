import actionType from '../dispatch';

const initState = {
    data: [],
    dataGrup: []
}

export const Reducer = (state = initState, action) => {
    if(action.type === actionType.LOGIN) {
        return {
            ...state,
            data: action.value
        }
    }

    if(action.type === actionType.DATAGRUP) {
      return {
        ...state,
        dataGrup: action.value
      }
    }

    return state;
}

export default Reducer;
