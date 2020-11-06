export const switchTabs = (idx) => ({
    type: 'SWITCH_TABS',
    idx
})

export const updateTabs = (tabs) => ({
    type: 'UPDATE_TABS',
    tabs
})

export const reorderTabs = (tabs, idx) => ({
    type: 'REORDER_TABS',
    tabs,
    idx
})
