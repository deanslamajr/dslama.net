import { get as getPosts } from '../models/posts'

export function get (req, res) {
  return getPosts()
    .then(data => {
      res.status(200)
      res.json(data)
    })
    .catch(() => {
      // @todo log error
      res.sendStatus(500)
    })
}
