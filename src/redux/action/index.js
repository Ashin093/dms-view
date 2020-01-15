//acion类型
export const type = {
    SWITCH_MENU: 'SWITCH_MENU',
    RESET_FORM:'RESET_FORM'
}

export function switchMenu(menuName) {
    return {
        type: type.SWITCH_MENU,
        menuName:menuName
    }
}

export function resetForm(resetFunction) {
    return {
        type: type.RESET_FORM,
        resetFunction
    }
}