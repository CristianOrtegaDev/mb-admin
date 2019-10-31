export const hasLoginNetworkError = error => {
  if (error.response) {
    return error.response.data.message
  } else {
    return 'Hubo un error con la red'
  }
}
