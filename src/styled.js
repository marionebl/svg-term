import React from 'react';
import styled from '@stiligita/core';
import react from '@stiligita/react';
import { CREATE_COMPONENT, CREATE_SELECTOR, PROCESSOR, GET_NAME } from '@stiligita/constants';
import Abcq from 'abcq';
import DEFAULT_THEME from './default-theme';

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
    .filter(x => x.split(':').every(f => f.trim() !== ''))
    .sort(safelyAlphanumeric)
    .join(';')
}

const shortId = (key, keys) => shortid.encode(keys.indexOf(key))
const defaultId = (key, keys) => key

const createComponent = (strings, args, tag, defaultProps) => {
  const amendedDefaultProps = Object.assign({theme: DEFAULT_THEME}, defaultProps);
  const Component = react(strings, args, tag, amendedDefaultProps);
  return (props) => {
    const name = process.env.DEBUG === 'true' ? Component.displayName : null;
    return <Component {...props} data-name={name}/>;
  };
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

export default styled;
