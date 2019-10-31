export const readFile = event => {
  return new Promise((resolve, reject) => {
    const inputFile = event.target.files[0]
    let temporaryFileReader = new FileReader()
    temporaryFileReader.onloadend = () => {
      resolve({
        extension: getFileExtension(inputFile),
        url: temporaryFileReader.result,
        base64Value: getBase64Value(temporaryFileReader)
      })
    }
    temporaryFileReader.onerror = () => {
      reject()
    }
    if (inputFile) temporaryFileReader.readAsDataURL(inputFile)
  })
}

export const getFileExtension = file =>
  file.name
    .split('.')
    .pop()
    .toLowerCase()

export const getBase64Value = fileReader =>
  fileReader.result.replace(/^data:image\/[a-z]+;base64,/, '')
