const styled = require('@stiligita/core').default
const react = require('@stiligita/react').default
const {CREATE_COMPONENT, CREATE_SELECTOR, PROCESSOR, GET_NAME} = require('@stiligita/constants')
const Abcq = require('abcq')
const DEFAULT_THEME = require('./default-theme');

const shortid = new Abcq()

const safelyAlphanumeric = (a, b) => {
  const propA = a.split(':')[0]
  const propB = b.split(':')[0]
  const propAPre = propA.split('-')[0]
  const propBPre = propB.split('-')[0]
  if (propAPre > propBPre) {
    return 1
  }
  if (propAPre < propBPre) {
    return -1
  }
  if (propA > propB) {
    return 1
  }
  if (propA < propB) {
    return -1
  }
  return 0
}

const sortCSSProps = rules => {
  return rules
    .split(';')
    .filter(x => Boolean(x.trim()))
    .sort(safelyAlphanumeric)
    .join(';')
}

const shortId = (key, keys) => shortid.encode(keys.indexOf(key))
const defaultId = (key, keys) => key

const createComponent = (strings, args, tag, defaultProps) => {
  const amendedDefaultProps = Object.assign({theme: DEFAULT_THEME}, defaultProps);
  return react(strings, args, tag, amendedDefaultProps);
}

const createClassName = (hash, mode) => {
  switch (mode) {
    case 'css':
      return `.${hash}`;
    case 'html':
      return {className: hash};
  }
};

shortId.stiligita = GET_NAME
defaultId.stiligita = GET_NAME
sortCSSProps.stiligita = PROCESSOR
createComponent.stiligita = CREATE_COMPONENT;
createClassName.stiligita = CREATE_SELECTOR;

styled
  .before(sortCSSProps)
  .use(createComponent)
  .use(shortId)
  .use(createClassName)

module.exports = styled;
