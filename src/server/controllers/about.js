import { get as getAbout } from '../models/about'

export function get (req, res) {
  return getAbout()
    .then(data => {
      res.status(200)
      res.json(data)
    })
    .catch(() => {
      // @todo log error
      res.sendStatus(500)
    })
}
