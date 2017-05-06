import { get as getProjects } from '../models/projects'

export function get (req, res) {
  return getProjects()
    .then(projects => {
      res.status(200)
      res.json(projects)
    })
    .catch(() => {
      // @todo log error
      res.sendStatus(500)
    })
}
