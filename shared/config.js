const config = {
  databaseFilePath: "database/meals.json",
  maxUploadFileSize: 150000, // in bytes
  submitMealPassword: "demo",
  types: {
    imageLoading: "image loading",
    mealAdded: "meal added",
    mealIsTodays: "meal is todays",
    mealIsAlreadyTodays: "meal is already todays",
    nameUpdated: "name updated",
    dateUpdated: "date updated",
    badDate: "bad date",
    countUpdated: "count updated",
    badCountFormat: "bad count format"
  },
  errors: {
    wrongPassword: "wrong password",
    fileTooLarge: "file too large",
    invalidImageExtension: "invalid image extension",
    imagePreviewFailed: "image preview failed",
    invalidImageExtension: "invalid image extension"
  }
}

export default config;
export const { databaseFilePath } = config;
export const { types } = config;
export const { errors } = config;
