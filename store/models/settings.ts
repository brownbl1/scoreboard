import { createModel } from '@rematch/core'
import { RootModel } from '.'

type SettingsState = {
  selectedWeek: number
}

export const settings = createModel<RootModel>()({
  state: {
    selectedWeek: 1,
  } as SettingsState,
  reducers: {
    setWeek: (state, week: number) => ({ ...state, selectedWeek: week }),
  },
})
