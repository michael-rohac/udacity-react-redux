/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {UPDATE_UI_SETTINGS} from './UiSettingsReducer'

const updateUiSettings = (uiSettings, dispatch) => (
    dispatch({
        type: UPDATE_UI_SETTINGS,
        uiSettings
    })
)

export default (dispatch) => {
    return {
        updateUiSettings: (uiSettings) => updateUiSettings(uiSettings, dispatch)
    }
}
