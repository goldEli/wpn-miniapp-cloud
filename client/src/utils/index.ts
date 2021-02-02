import _ from "lodash";
export {default as http} from "./http"

export const isNumber = (value: any) => {
  if (_.isNumber(value) && !_.isNaN(value)) {
    return true
  }
  return false
}