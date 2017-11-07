import Raven from 'raven'

import constants from '../../../config/constants'

// @todo only for production builds
Raven.config(constants.get('SENTRY_DNS')).install()

export default Raven
