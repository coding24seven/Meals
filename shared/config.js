const config = {
  maxUploadFileSize: 150000, // in bytes
  submitMealPassword: "demo",
  types: {
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
    invalidImageExtension: "invalid image extension"
  }
}

export default config;
export const { types } = config;
export const { errors } = config;
