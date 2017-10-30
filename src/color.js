module.exports = color;

function color(input, theme) {
  if (!input) {
    return null;
  }
  if (Array.isArray(input)) {
    return `rgb(${input.join(', ')})`;
  }

  const c = theme[input];

  if (c) {
    return `rgb(${c.join(', ')})`;
  }

  return `rgb(${[input, input, input].join(', ')})`;
}
