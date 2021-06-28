const apiConfig = {
  baseUrl: process.env.REACT_APP_BASE_URL || "http://localhost:3001",
}

const uiConfig = {
  alertDismissMs: 7.5 * 1000, // 7.5 seconds
}

const config = {
  ...apiConfig,
  ...uiConfig,
}

export default config
