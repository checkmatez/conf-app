import { format as dateFns } from 'date-fns'
import { ru } from 'date-fns/locale'

export const format = (date: number | Date, format: string): string =>
  dateFns(date, format, { locale: ru })
