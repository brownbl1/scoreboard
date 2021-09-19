import AsyncStorage from '@react-native-async-storage/async-storage'
import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import persistPlugin from '@rematch/persist'
import { models, RootModel } from './models'

export const store = init<RootModel>({
  models,
  plugins: [
    persistPlugin({
      key: 'root',
      version: 0,
      storage: AsyncStorage,
    }),
  ],
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
