const intialUi = {
    error: {
        show: false,
        path: '',
        type: '',
        status: null
    },
    tabs: [1, 2, 3].map(item => ({ title: `Tab${item}`, content: `Tab ${item} contents` })),
    currentTab: 0
}

function appReducer(state = intialUi, action) {

    switch (action.type) {
        case 'SWITCH_TABS': 
            return {
                ...state,
                currentTab: action.idx
            }
        case 'UPDATE_TABS': 
            return {
                ...state,
                tabs: action.tabs
            }
        case 'REORDER_TABS':
            return {
                ...state,
                tabs: action.tabs,
                currentTab: action.idx
            }
        default:
            return state;
    }
}

export default appReducer;
