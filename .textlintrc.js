module.exports = {
  filters: {},
  rules: {
    'preset-ja-technical-writing': {
      'sentence-length': {
        max: 200,
      },
      'ja-no-mixed-period': {
        allowPeriodMarks: [':::'],
      },
    },
    'preset-ja-spacing': true,
    'spellcheck-tech-word': true,
  },
};
