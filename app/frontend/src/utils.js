import { isArray, isObject, mapKeys, mapValues, camelCase } from 'lodash'

export const mapKeysDeep = (obj, cb) => {
  if (isArray(obj)) {
    return obj.map((o) => mapKeysDeep(o, cb))
  } else if (isObject(obj)) {
    return mapValues(mapKeys(obj, cb), (val) => mapKeysDeep(val, cb))
  }
  return obj
}

export const camelize = (obj) => mapKeysDeep(obj, (v, k) => camelCase(k))