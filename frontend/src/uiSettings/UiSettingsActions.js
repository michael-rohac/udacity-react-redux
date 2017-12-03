/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {UPDATE_UI_SETTINGS} from './UiSettingsReducer'

export const updateUiSettings = uiSettings => dispatch => (
    dispatch({
        type: UPDATE_UI_SETTINGS,
        uiSettings
    })
)
