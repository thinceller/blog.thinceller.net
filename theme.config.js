const YEAR = new Date().getFullYear()
const FIRST_YEAR = 2021

function getYear() {
  if (YEAR === FIRST_YEAR) {
    return `${YEAR}`
  } else {
    return `${FIRST_YEAR}-${YEAR}`
  }
}

export default {
  footer: <div>© {getYear()} thinceller</div>,
}
