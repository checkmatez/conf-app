import { Observable } from '@apollo/client'

export const promiseToObservable = <T>(promise: Promise<T>): Observable<T> =>
  new Observable((subscriber) => {
    promise
      .then((value) => {
        if (subscriber.closed) {
          return undefined
        }
        subscriber.next(value)
        subscriber.complete()
        return undefined
      })
      .catch((err) => {
        subscriber.error(err)
      })
  })
