// Jest counterpart of the graphql-tag/loader rule in next.config.js.
const gql = require('graphql-tag');

module.exports = {
  process: source => `module.exports = ${JSON.stringify(gql(source))};`,
};
