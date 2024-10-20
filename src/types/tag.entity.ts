import { colors } from '../components/TagInput'

export type Colors = keyof typeof colors

export type ICreateTag = {
  name: string
  color?: Colors
}

export type Tag = ICreateTag & {
  _id?: string
  color: Colors
}
