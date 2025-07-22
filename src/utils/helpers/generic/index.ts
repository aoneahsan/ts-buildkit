import { DBColumnKeysShortFormEnum } from '@app-enums/firebaseEnum';
import { RequestContentTypeEnum, TimeUnitEnum } from '@app-enums/generic';
import {
  allowedImageTypes,
  apiConstants,
  svgIconTypes,
} from '@app-utils/constants/generic';
import { getDateFromFrbTimestamp } from '../../../require-package/dayjs';
import { DBItemGenericDataType } from '../../../types/firebaseTypes'; // will need to study this, the absolute import was giving error
import {
  IGenericObject,
  IPaginationOptions,
} from '../../../types/genericTypes';
import {
  IValidateFileOptions,
  IFileTypeOptions,
  ITruncateStringOptions,
  ITitleCaseOptions,
  IGenerateCodeOptions,
  ICurrencyFormatOptions,
  ICountdownOptions,
  IImageDimensionOptions,
} from '../../../types/utilityOptions';

/**
 * Generates a unique random key.
 *
 * @returns {string} A unique random key.
 */
export const getZUniqueKey = (): string => {
  // Get the current timestamp and convert it to a base-36 string
  const head = Date.now()?.toString(36);

  // Generate a random number, convert it to a base-36 string, and remove the leading "0."
  const tail = Math.random()?.toString(36)?.substr(2);

  // Concatenate the timestamp string and the random string, and return it
  return head + tail;
};

/**
 * A utility function that logs a message and returns void.
 */
export const emptyVoidReturnFunction = (): void => {
  // eslint-disable-next-line no-console
  console.info({ message: 'emptyVoidReturnFunction' });
};

/**
 * A utility function that logs a message and returns a void Promise.
 */
export const emptyVoidReturnFunctionPromise = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.info({ message: 'emptyVoidReturnFunction' });
};

/**
 * Serializes an object to a JSON-formatted string.
 *
 * @param _data - The data to be stringified.
 * @returns The JSON-formatted string.
 * To parsed JSON, use zJsonParse helper function
 */
export const zStringify = (_data: unknown): string => {
  return JSON.stringify(_data);
};

/**
 * Parses a JSON-formatted string into an object of the specified type.
 *
 * @param _data - The JSON-formatted string to be parsed.
 * @returns The parsed object, or undefined if parsing fails.
 * To stringify JSON, use the zStringify helper function.
 */
export const zJsonParse = <T>(_data: string): T | undefined => {
  try {
    return JSON.parse(_data) as T;
  } catch (error) {
    return undefined;
  }
};

/**
 * Checks if the given value is a non-empty string.
 *
 * @param value - The string value to be checked.
 * @returns A boolean indicating whether the string is non-empty or not.
 */
export const isZNonEmptyString = (
  value: string | undefined | null
): boolean => {
  return value !== undefined && value !== null && value?.trim()?.length > 0;
};

/**
 * Checks if all the values in the given array are non-empty strings.
 *
 * @param values - An array of string values to be checked.
 * @returns A boolean indicating whether all strings in the array are non-empty or not.
 */
export const isZNonEmptyStrings = (
  values: Array<string | undefined | null>
): boolean => {
  const _result = values?.every((_value) => isZNonEmptyString(_value));

  return _result;
};

/**
 * Checks if the given value is a valid number.
 *
 * @param value - The value to be checked. Can be number, string, undefined, or null.
 * @param checkPositive - Optional parameter. If true, the function will also check if the value is a positive number.
 * @returns A boolean indicating whether the value is a valid number (and optionally a positive number).
 */
export const isZValidNumber = (
  value: number | string | undefined | null,
  checkPositive: boolean = false
): boolean => {
  const numberValue = Number(value);
  const isValidNumber = !isNaN(numberValue);

  if (!isValidNumber) return false;
  if (checkPositive) {
    return numberValue > 0;
  }
  return true;
};

/**
 * Checks if all the values in the given array are valid numbers.
 *
 * @param values - An array of values (number, string, undefined, or null) to be checked.
 * @param checkPositive - Optional parameter. If true, the function will also check if all values are positive numbers.
 * @returns A boolean indicating whether all values in the array are valid numbers (and optionally positive numbers).
 */
export const isZValidNumbers = (
  values: Array<number | string | undefined | null>,
  checkPositive: boolean = false
): boolean => {
  return values?.every((value) => isZValidNumber(value, checkPositive));
};

/**
 * Converts a string to title case by adding spaces between lowercase and uppercase letters and converting to lowercase.
 *
 * @param s - The input string.
 * @returns The title case string.
 */
export const convertToTitleCase = (s: string): string => {
  return s
    ?.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
    ?.toLowerCase(); // Convert the string to lowercase
};

/**
 * Converts a string to title case by adding spaces between lowercase and uppercase letters and converting to lowercase.
 *
 * @param s - The input string.
 * @returns The title case string.
 */
export const convertToTitleCaseV1 = (s: string): string => {
  return isStringVariable(s)
    ? s?.replace(/^_*(.)|_+(.)/g, (_, a, b) => {
        return a ? a?.toUpperCase() : ' ' + b?.toUpperCase();
      })
    : s;
};

/**
 * Calculates the total number of pages based on the total number of items and items per page.
 * @param total The total number of items.
 * @param perPage The number of items per page.
 * @returns The total number of pages.
 */
export const ZTotalPages = (total: number, perPage: number): number => {
  if (total > 0 && perPage > 0) {
    return Math.ceil(total / perPage);
  }
  return 0;
};

/**
 * Converts an image URL to a base64-encoded string.
 *
 * @param imageUrl - The URL of the image to convert.
 * @returns A Promise that resolves with the base64-encoded string of the image.
 */
export const imageUrlToBase64 = async (
  url?: string,
  authToken?: string
): Promise<string> => {
  try {
    if (url !== undefined && isZNonEmptyString(url)) {
      // Check if fetch is available (browser or modern Node.js)
      if (typeof fetch === 'undefined') {
        throw new Error(
          'imageUrlToBase64: fetch API is not available in this environment'
        );
      }

      // Getting authToken from Storage.
      const headers = new Headers({
        'Content-Type': RequestContentTypeEnum.Json,
        Authorization: `${apiConstants.authorizationTokenType.bearer} ${
          authToken ?? ''
        }`,
        // Add other headers as needed
      });
      const request = new Request(url, {
        method: 'GET',
        headers,
      });

      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Failed to fetch image. Status: ${response.status}`);
      }
      const blob = await response.blob();
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(blob);
      });

      return data as string;
    }
    return '';
  } catch (error) {
    console.error('Error fetching or converting image:', error);
    return '';
  }
};

/**
 * Replaces dynamic parts in a URL with corresponding values.
 * @param {string} url - The base URL string with dynamic parts.
 * @param {string[]} itemsId - An array of strings representing the dynamic parts to replace.
 * @param {string[]} urlDynamicParts - An array of strings representing the values to replace the dynamic parts.
 * @returns {string} The URL with dynamic parts replaced.
 */
export const replaceUrlDynamicParts = ({
  url,
  itemsId,
  urlDynamicParts,
}: {
  url: string;
  itemsId: Array<number | string>;
  urlDynamicParts: Array<number | string>;
}): string => {
  if (itemsId?.length !== urlDynamicParts?.length) {
    throw new Error('itemsId and urlDynamicParts must have the same length.');
  }
  let resultUrl = url;

  for (let i = 0; i < urlDynamicParts?.length; i++) {
    const dynamicPart = String(urlDynamicParts[i]);
    if (String(resultUrl)?.includes(dynamicPart)) {
      const itemId = String(itemsId[i]);
      resultUrl = String(resultUrl)?.replace(dynamicPart, itemId);
    }
  }

  return resultUrl;
};

/**
 * Converts a string to a boolean value.
 * @param {string | boolean} value - The value to convert to a boolean.
 * @returns {boolean} The converted boolean value.
 */
export const zConvertToBoolean = (value?: string | boolean): boolean => {
  switch (value) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return Boolean(value); // handles other cases, like non-string inputs
  }
};

/**
 * Generates a unique code of a specified length.
 * @param {number} [length=6] - The length of the code to generate.
 * @returns {string} The generated unique code.
 */
export const generateUniqueCode = (length: number = 6): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters?.length);
    code += characters?.[randomIndex];
  }
  return code?.toLowerCase();
};

/**
 * Generates a unique code with configurable options.
 * @param {IGenerateCodeOptions} options - Code generation options.
 * @returns {string} The generated code.
 */
export const generateUniqueCodeV2 = (
  options?: IGenerateCodeOptions
): string => {
  const defaultOptions: IGenerateCodeOptions = {
    length: 6,
    charset: 'alphanumeric',
    customCharset: '',
    lowercase: true,
    uppercase: false,
    excludeAmbiguous: false,
    prefix: '',
    suffix: '',
    segments: 1,
    segmentSeparator: '-',
  };

  const config = { ...defaultOptions, ...options };

  // Define character sets
  const charsets: Record<string, string> = {
    numeric: '0123456789',
    alphabetic: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    alphanumeric:
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    custom: config.customCharset || '',
  };

  let characters =
    charsets[config.charset || 'alphanumeric'] || charsets.alphanumeric;

  // Exclude ambiguous characters if requested
  if (config.excludeAmbiguous) {
    characters = characters.replace(/[0O1lI]/g, '');
  }

  // Generate segments
  const segments: string[] = [];
  const totalSegments = config.segments || 1;
  const totalLength = config.length || 6;
  const segmentLength = Math.floor(totalLength / totalSegments);

  for (let s = 0; s < totalSegments; s++) {
    let segment = '';
    const currentSegmentLength =
      s === totalSegments - 1
        ? totalLength - segmentLength * (totalSegments - 1)
        : segmentLength;

    for (let i = 0; i < currentSegmentLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      segment += characters[randomIndex];
    }

    // Apply case transformations
    if (config.lowercase && !config.uppercase) {
      segment = segment.toLowerCase();
    } else if (config.uppercase && !config.lowercase) {
      segment = segment.toUpperCase();
    }

    segments.push(segment);
  }

  // Join segments and add prefix/suffix
  const code = segments.join(config.segmentSeparator || '-');
  return `${config.prefix || ''}${code}${config.suffix || ''}`;
};

/**
 * Checks if a value is null or undefined.
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is null or undefined; otherwise, `false`.
 */
export const isNullOrUndefined = (value: any): boolean => {
  return value === null || value === undefined;
};

/**
 * Checks if a value is not null or undefined.
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is not null or undefined; otherwise, `false`.
 */
export const isNotNullOrUndefined = (value: any): boolean => {
  return !isNullOrUndefined(value);
};

/**
 * Dumps a value without logging anything.
 * @param {...any} _ - The values to dump.
 */
export const dumpValueNoLogNothing = (..._: any): void => {};

/**
 * Checks if a value is an array.
 * @param {unknown} arr - The value to check.
 * @param {boolean} [checkLength=false] - Whether to check the length of the array.
 * @returns {boolean} - Returns `true` if the value is an array; otherwise, `false`.
 */
export const isArray = (arr: unknown, checkLength = false): boolean => {
  const typeIsArray = isObject(arr, false) && Array.isArray(arr);
  if (!checkLength) return typeIsArray;
  else return typeIsArray && !!arr?.length;
};

/**
 * Checks if an item is soft deleted.
 * @param {DBItemGenericDataType} item - The item to check.
 * @returns {boolean} - Returns `true` if the item is soft deleted; otherwise, `false`.
 */
export const isSoftDeleted = ({
  item,
}: {
  item: DBItemGenericDataType;
}): boolean => {
  return typeof item[DBColumnKeysShortFormEnum.deletedAt] === 'number';
};

/**
 * Checks if an item is blocked.
 * @param {DBItemGenericDataType} item - The item to check.
 * @returns {boolean} - Returns `true` if the item is blocked; otherwise, `false`.
 */
export const dbItemIsBlocked = ({
  item,
}: {
  item: DBItemGenericDataType;
}): boolean => {
  return typeof item[DBColumnKeysShortFormEnum.blockedAt] === 'number';
};

/**
 * Gets the value of a database time column.
 * @param {IGenericObject} item - The item to check.
 * @param {DBColumnKeysShortFormEnum} key - The key of the column to get the value from.
 * @returns {string | undefined} - Returns the value of the column; otherwise, `undefined`.
 */
export const getDBTimeColumnValue = ({
  key,
  item,
}: {
  item?: IGenericObject;
  key: DBColumnKeysShortFormEnum;
}): string | undefined => {
  const value = item?.[key];
  if (value) {
    return getDateFromFrbTimestamp(value);
  } else {
    return undefined;
  }
};

/**
 * Adds a URL protocol handler to the given URL if it doesn't already have one.
 * @param {string} url - The URL to add the protocol handler to.
 * @param {boolean} isLocalhost - Whether the URL is on localhost.
 * @returns {string} The URL with the protocol handler added.
 */
export const addUrlProtocolHandler = (
  url: string,
  isLocalhost: boolean
): string => {
  if (url.search(/^http[s]?:\/\//) === -1) {
    url = (isLocalhost ? 'http://' : 'https://') + url;
    return url;
  } else return url;
};

/**
 * Checks if an object contains key/value pairs.
 * @param {unknown} obj - The object to check.
 * @param {boolean} [checkKeys=true] - Whether to check the keys of the object.
 * @returns {boolean} - Returns `true` if the object contains key/value pairs; otherwise, `false`.
 */
export const isObject = (obj: unknown, checkKeys = true): boolean => {
  const typeIsObject =
    typeof obj === 'object' && obj != null && typeof obj !== 'undefined';
  if (!checkKeys) return typeIsObject;
  else return typeIsObject && !!Object.keys(obj)?.length;
};

/**
 * Builds a filter object from a given filter object.
 * @param {Record<string, unknown>} filter - The filter object to build from.
 * @returns {Record<string, unknown>} The built filter object.
 */
export const buildFilterObject = (
  filter: Record<string, unknown>
): Record<string, unknown> => {
  if (!isObject(filter)) return {};

  const result: Record<string, unknown> = {};

  for (const key in filter) {
    result.field = key;
    result.values = filter[key];
  }

  return isArray(result.values) ? result : {};
};

/**
 * Gets the active filters from a given filter object.
 * @param {string} field - The field to get the active filters from.
 * @param {Record<string, unknown>} filter - The filter object to get the active filters from.
 * @returns {T | []} The active filters; otherwise, an empty array.
 */
export const getActiveFilters = <T = unknown>(
  field: string,
  filter: { field?: string; values?: T }
): T | [] => {
  if (filter?.field === field) {
    return filter.values ?? [];
  }

  return [];
};

/**
 * Checks if a URL is valid.
 * @param {string} url - The URL to check.
 * @returns {boolean} - Returns `true` if the URL is valid; otherwise, `false`.
 */
export const isValidUrl = (url: string): boolean => {
  const re = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+#]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+#=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return re.test(url);
};

/**
 * Checks if a vanity URL is valid.
 * @param {string} domain - The domain to check.
 * @param {string} url - The URL to check.
 * @returns {boolean} - Returns `true` if the vanity URL is valid; otherwise, `false`.
 */
export const isValidVanityUrl = ({
  domain,
  url,
}: {
  url: string;
  domain: string;
}): boolean => {
  const lowercaseUrl = url?.trim()?.toLowerCase();
  if (lowercaseUrl === 'www' || lowercaseUrl === domain) {
    return false;
  }

  const re = /^((?!.*[-]{2})(?=.*[a-z0-9]$)[a-z0-9][a-z0-9-]*$)+/;
  return re.test(url);
};

/**
 * Checks if a text contains special characters.
 * @param {string} text - The text to check.
 * @returns {boolean} - Returns `true` if the text contains special characters; otherwise, `false`.
 */
export const containSpecialCharacters = (text: string): boolean => {
  const re = /[^A-Za-z0-9&,'"""'\'-(){} ]+/;
  return re.test(text);
};

/**
 * Generates a URL-friendly slug from the provided text.
 *
 * This function:
 * 1. Converts text to lowercase
 * 2. Removes special characters and replaces them with hyphens
 * 3. Removes leading/trailing hyphens
 * 4. Replaces multiple consecutive hyphens with a single hyphen
 * 5. Handles non-Latin characters by transliterating them when possible
 *
 * @param {string} text - The text to convert into a slug
 * @param {Object} options - Optional configuration
 * @param {boolean} options.lowercase - Whether to convert to lowercase (default: true)
 * @param {string} options.separator - Character to use as separator (default: '-')
 * @param {boolean} options.trim - Whether to trim leading/trailing separators (default: true)
 * @returns {string | undefined} The generated slug or undefined if input is falsy
 */
export const generateSlug = ({
  options = {},
  text,
}: {
  text: string;
  options?: {
    lowercase?: boolean;
    separator?: string;
    trim?: boolean;
  };
}): string | undefined => {
  if (!text) return undefined;

  const { lowercase = true, separator = '-', trim = true } = options;

  // Handle common accented characters and transliterate them
  const charMap: Record<string, string> = {
    à: 'a',
    á: 'a',
    â: 'a',
    ã: 'a',
    ä: 'a',
    å: 'a',
    è: 'e',
    é: 'e',
    ê: 'e',
    ë: 'e',
    ì: 'i',
    í: 'i',
    î: 'i',
    ï: 'i',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ø: 'o',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ü: 'u',
    ñ: 'n',
    ç: 'c',
    ß: 'ss',
    æ: 'ae',
    œ: 'oe',
  };

  let result = text.trim();

  // Convert accented characters
  result = result.replace(/[àáâãäåèéêëìíîïòóôõöøùúûüñçßæœ]/gi, (match) => {
    const char = match.toLowerCase();
    return charMap[char] || match;
  });

  // Replace non-alphanumeric characters with separator
  result = result.replace(/[^a-z0-9]/gi, separator);

  // Replace multiple consecutive separators with a single one
  const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const multiSeparatorRegex = new RegExp(`${escapedSeparator}+`, 'g');
  result = result.replace(multiSeparatorRegex, separator);

  // Apply lowercase if needed
  if (lowercase) {
    result = result.toLowerCase();
  }

  // Trim separators from start and end if needed
  if (trim) {
    const trimRegex = new RegExp(
      `^${escapedSeparator}|${escapedSeparator}$`,
      'g'
    );
    result = result.replace(trimRegex, '');
  }

  return result;
};

/**
 * Checks if a string contains invalid characters for email or company name
 *
 * @param {string} input - The string to check for invalid characters
 * @param {'email' | 'companyName'} type - The type of validation to perform
 * @returns {{ isValid: boolean; invalidChars: string[] }} - Object containing validation result and list of invalid characters
 */
export const validateInputCharacters = ({
  input,
  type,
}: {
  input: string;
  type: 'email' | 'name';
}): { isValid: boolean; invalidChars: string[]; validatedValue: string } => {
  if (!input) {
    return { isValid: true, invalidChars: [], validatedValue: '' };
  }

  let invalidRegex: RegExp;

  if (type === 'email') {
    // RFC 5322 compliant email validation, but we're checking for invalid characters only
    // Disallowed: spaces, quotes, backslashes, commas, etc. that aren't valid in email addresses
    invalidRegex = /[^\w.!#$%&'*+/=?^`{|}~@-]/g;
  } else if (type === 'name') {
    // For company names, we want to be more permissive but still restrict certain characters
    // Disallowed: special characters that could cause issues in URLs, databases, or display
    invalidRegex = /[<>\\^`{|}~]/g;
  } else {
    return { isValid: true, invalidChars: [], validatedValue: input };
  }

  const matches = input.match(invalidRegex);
  const invalidChars = matches ? [...new Set(matches)] : [];

  // Remove invalid characters to create the validated value
  const validatedValue = input.replace(invalidRegex, '');

  return {
    isValid: invalidChars.length === 0,
    invalidChars,
    validatedValue,
  };
};

/**
 * Gets the base64 URL of an image file.
 * @param {File} file - The image file to get the base64 URL of.
 * @returns {Promise<unknown>} The base64 URL of the image file.
 */
export const getImageBase64Url = (file: File): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Checks if a URL contains query parameters.
 * @param {string} url - The URL to check.
 * @returns {boolean | ''} - Returns `true` if the URL contains query parameters; otherwise, `false`.
 */
export const containQueryParams = (url: string): boolean | '' => {
  const queryParams = ['?', '&', '#'];
  return url && queryParams?.some((param) => url?.includes(param));
};

/**
 * Gets the value of a key from an object.
 * @param {any} obj - The object to get the value from.
 * @param {string} key - The key to get the value from.
 * @param {any} [defaultValue=null] - The default value to return if the key does not exist.
 * @param {boolean} [checkNull=true] - Whether to check if the key is null.
 * @returns {any} The value of the key; otherwise, the default value.
 */
export const getObjectKey = (
  obj: any,
  key: string,
  defaultValue: any = null,
  checkNull: boolean = true
): any => {
  if (checkIfKeyExists(obj, key, checkNull)) {
    return obj[key];
  } else {
    return defaultValue;
  }
};

/**
 * Checks if a key exists in an object.
 * @param {Record<string, unknown>} obj - The object to check.
 * @param {string} key - The key to check.
 * @param {boolean} [checkNull=false] - Whether to check if the key is null.
 * @returns {boolean} - Returns `true` if the key exists; otherwise, `false`.
 */
export const checkIfKeyExists = (
  obj: Record<string, unknown>,
  key: string,
  checkNull = false
): boolean => {
  if (
    isObject(obj, true) &&
    Object.hasOwnProperty.call(obj, key) &&
    obj[key] !== undefined
  ) {
    return checkNull ? obj[key] !== null : true;
  }
  return false;
};

/**
 * Checks if two values are equal.
 * @param {any} x - The first value to check.
 * @param {any} y - The second value to check.
 * @returns {boolean} - Returns `true` if the values are equal; otherwise, `false`.
 */
export const isEqual = (x: any, y: any): boolean => {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false;
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (const p in x) {
    if (!Object.hasOwnProperty.call(x, p)) continue;
    // other properties were tested using x.constructor === y.constructor

    if (!Object.hasOwnProperty.call(y, p)) return false;
    // allows to compare x[p] and y[p] when set to undefined

    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal

    if (typeof x[p] !== 'object') return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!isEqual(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }

  for (const p in y) {
    if (Object.hasOwnProperty.call(y, p) && !Object.hasOwnProperty.call(x, p)) {
      return false;
    }
  }
  // allows x[p] to be set to undefined

  return true;
};

/**
 * Converts a value to radians.
 * @param {number} Value - The value to convert to radians.
 * @returns {number} The value in radians.
 */
export const toRad = (Value: number): number => {
  return (Value * Math.PI) / 180;
};

/**
 * Calculates the distance between two points on the Earth.
 * @param {number} lat1 - The latitude of the first point.
 * @param {number} lng1 - The longitude of the first point.
 * @param {number} lat2 - The latitude of the second point.
 * @param {number} lng2 - The longitude of the second point.
 * @returns {number} The distance between the two points in kilometers.
 */
export const calcCrow = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

/**
 * Truncates a string to a specified length.
 * @param {string} text - The text to truncate.
 * @param {number} [length=10] - The length to truncate the text to.
 * @returns {string} The truncated text.
 */
export const truncateString = (text: string, length: number = 10): string => {
  if (!text) return '';
  return text?.length > length
    ? `${text?.slice(0, length) ?? ''}...`
    : text ?? '';
};

/**
 * Truncates a string with configurable options.
 * @param {string} text - The text to truncate.
 * @param {ITruncateStringOptions} options - Truncation options.
 * @returns {string} The truncated string.
 */
export const truncateStringV2 = (
  text: string,
  options?: ITruncateStringOptions
): string => {
  const defaultOptions: ITruncateStringOptions = {
    length: 10,
    ellipsis: '...',
    position: 'end',
    preserveWords: false,
  };

  const config = { ...defaultOptions, ...options };
  const maxLength = config.length || 10;
  const ellipsis = config.ellipsis || '...';

  if (!text || text.length <= maxLength) {
    return text || '';
  }

  if (config.position === 'middle') {
    const halfLength = Math.floor((maxLength - ellipsis.length) / 2);
    const start = text.slice(0, halfLength);
    const end = text.slice(-halfLength);
    return `${start}${ellipsis}${end}`;
  }

  if (config.position === 'start') {
    return `${ellipsis}${text.slice(-(maxLength - ellipsis.length))}`;
  }

  // Default to 'end'
  let truncated = text.slice(0, maxLength - ellipsis.length);

  // Preserve word boundaries if requested
  if (config.preserveWords || config.wordBoundary) {
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      truncated = truncated.slice(0, lastSpace);
    }
  }

  return `${truncated}${ellipsis}`;
};

/**
 * Detects the device and view mode.
 * @returns {Object} The device and view mode.
 */
export const detectDeviceAndViewMode = (): {
  webkitVer: number;
  isGoogle: boolean | 0;
  isAndroid: boolean | 0;
  androidDesktopMode: boolean | 0;
} => {
  // Return default values if not in browser environment
  if (!isBrowser()) {
    return { webkitVer: 0, isGoogle: 0, isAndroid: 0, androidDesktopMode: 0 };
  }

  const match = /WebKit\/([0-9]+)|$/.exec(navigator.appVersion);
  const webkitVer = match ? parseInt(match[1], 10) : 0; // also matches AppleWebKit
  const isGoogle = webkitVer && navigator.vendor.indexOf('Google') === 0; // Also true for Opera Mobile and maybe others
  const isAndroid = isGoogle && navigator.userAgent.indexOf('Android') > 0; // Careful - Firefox and Windows Mobile also have Android in user agent
  const androidDesktopMode =
    !isAndroid &&
    isGoogle &&
    navigator.platform.indexOf('Linux') === 0 &&
    'ontouchstart' in document.documentElement;

  return { webkitVer, isGoogle, isAndroid, androidDesktopMode };
};

/**
 * Checks if two arrays are equal.
 * @param {Array<unknown>} arrOne - The first array to check.
 * @param {Array<unknown>} arrTwo - The second array to check.
 * @returns {boolean} - Returns `true` if the arrays are equal; otherwise, `false`.
 */
export const checkEqualityOfTwoArray = (
  arrOne: Array<unknown>,
  arrTwo: Array<unknown>
): boolean => {
  const result = arrOne?.every((element) => {
    return arrTwo?.includes(element);
  });
  return result;
};

/**
 * Checks if a file type is allowed.
 * @param {File} file - The file to check.
 * @param {string} type - The type of file to check.
 * @returns {boolean} - Returns `true` if the file type is allowed; otherwise, `false`.
 * @deprecated Use isFileTypeAllowedV2 with options parameter instead
 */
export const isFileTypeAllowed = (file: File, type = 'svg'): boolean => {
  if (type === 'svg') {
    return svgIconTypes?.includes(file?.type?.toLowerCase());
  } else if (type === 'other') {
    return (allowedImageTypes as readonly string[])?.includes(
      file?.type?.toLowerCase()
    );
  }
  return false;
};

/**
 * Checks if a file type is allowed with configurable options.
 * @param {File} file - The file to check.
 * @param {IFileTypeOptions} options - Configuration options.
 * @returns {boolean} - Returns `true` if the file type is allowed; otherwise, `false`.
 */
export const isFileTypeAllowedV2 = (
  file: File,
  options?: IFileTypeOptions
): boolean => {
  if (!file || !file.type) return false;

  const defaultOptions: IFileTypeOptions = {
    allowedTypes: [...allowedImageTypes],
    caseInsensitive: true,
    allowWildcard: false,
  };

  const config = { ...defaultOptions, ...options };
  const fileType = config.caseInsensitive ? file.type.toLowerCase() : file.type;

  // Check if file type is in allowed types
  return (
    config.allowedTypes?.some((allowedType) => {
      const compareType = config.caseInsensitive
        ? allowedType.toLowerCase()
        : allowedType;

      if (config.allowWildcard && compareType.includes('*')) {
        // Handle wildcard matching (e.g., 'image/*')
        const [prefix] = compareType.split('*');
        return fileType.startsWith(prefix);
      }

      return fileType === compareType;
    }) || false
  );
};

/**
 * Gets the dimensions of an image file.
 * @param {File} file - The image file to get the dimensions of.
 * @returns {Promise<{ width: number; height: number } | null>} The dimensions of the image file; otherwise, `null`.
 */
export const getImageDimensions = async (
  file: File
): Promise<{ width: number; height: number } | null> => {
  if (!file) return null;

  // Check if running in browser environment
  if (!isBrowser()) {
    console.warn(
      'getImageDimensions: This function requires a browser environment'
    );
    return null;
  }

  return await new Promise((resolve) => {
    const img = document.createElement('img');
    const objectUrl = window.URL.createObjectURL(file);
    let height: number, width: number;

    img.onload = function (event: Event) {
      const imageElement = event?.target as HTMLImageElement;
      height = imageElement.naturalHeight;
      width = imageElement.naturalWidth;
      URL.revokeObjectURL(objectUrl);

      resolve({ width, height });
    };

    img.src = objectUrl;
  });
};

/**
 * Gets the aspect ratio of an image.
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 * @returns {number[] | null} The aspect ratio of the image; otherwise, `null`.
 */
export const getImageAspectRatio = (
  width: number,
  height: number
): number[] | null => {
  // return type (aspect ratio with [width, height] [1,1])
  if (width === height) {
    return [1, 1];
  } else if (width > height) {
    return [Math.round(width / height), Math.round(height / height)];
  } else if (width < height) {
    return [Math.round(width / width), Math.round(height / width)];
  } else {
    return null;
  }
};

/**
 * Checks the type of a variable.
 * @param {unknown} val - The variable to check.
 * @param {string} type - The type to check.
 * @returns {boolean} - Returns `true` if the variable is of the specified type; otherwise, `false`.
 */
export const checkVariableType = (val: unknown, type = 'string'): boolean => {
  switch (type) {
    case 'string':
      return typeof val === 'string' && typeof val !== 'undefined';
    case 'number':
      return typeof val === 'number' && typeof val !== 'undefined';
    case 'boolean':
      return typeof val === 'boolean' && typeof val !== 'undefined';
    case 'object':
      return isObject(val, true);
    case 'array':
      return isArray(val, true);
    case 'function':
      return typeof val === 'function' && typeof val !== 'undefined';
    case 'undefined':
      return typeof val === 'undefined';
    default:
      return false;
  }
};

/**
 * Checks if a value is a string.
 * @param {unknown} val - The value to check.
 * @returns {boolean} - Returns `true` if the value is a string; otherwise, `false`.
 */
export const isStringVariable = (val?: unknown): boolean => {
  return checkVariableType(val, 'string');
};

/**
 * Checks if a value is a function.
 * @param {unknown} val - The value to check.
 * @returns {boolean} - Returns `true` if the value is a function; otherwise, `false`.
 */
export const isFunction = (val: unknown): boolean => {
  return checkVariableType(val, 'function');
};

/**
 * Checks if an image type is allowed.
 * @param {File} file - The file to check.
 * @returns {boolean} - Returns `true` if the image type is allowed; otherwise, `false`.
 * @deprecated Use imageTypeAllowedV2 with options parameter instead
 */
export const imageTypeAllowed = (file: any): boolean => {
  return allowedImageTypes?.includes(file?.type?.toLowerCase());
};

/**
 * Checks if an image type is allowed with configurable options.
 * @param {File} file - The file to check.
 * @param {IFileTypeOptions} options - Configuration options.
 * @returns {boolean} - Returns `true` if the image type is allowed; otherwise, `false`.
 */
export const imageTypeAllowedV2 = (
  file: File,
  options?: IFileTypeOptions
): boolean => {
  return isFileTypeAllowedV2(file, {
    allowedTypes: [...allowedImageTypes],
    ...options,
  });
};

/**
 * Validates a file before upload.
 * @param {File} file - The file to validate.
 * @param {number} sizeLimit - The size limit of the file.
 * @returns {Object} The status and type of the file.
 */
export const validateFileBeforeUpload = ({
  file,
  sizeLimit,
}: {
  file: File;
  sizeLimit: number;
}): { status: string; type: string } => {
  // check file size
  const fileSize = parseFloat(`${file.size / 1024 / 1024}`) > sizeLimit;

  // show warning alert
  if (fileSize) return { status: 'error', type: 'FILE_SIZE_LIMIT' } as const;

  // check if selected file is valid
  const allowed = imageTypeAllowed(file);

  // show warning alert
  if (!allowed) return { status: 'error', type: 'INVALID_FILE_TYPE' } as const;

  return { status: 'success', type: 'SUCCESS' } as const;
};

/**
 * Validates a file before upload with configurable options.
 * @param {File} file - The file to validate.
 * @param {IValidateFileOptions} options - Configuration options.
 * @returns {Object} The validation result.
 */
export const validateFileBeforeUploadV2 = (
  file: File,
  options?: IValidateFileOptions
): {
  status: 'success' | 'error';
  type: 'SUCCESS' | 'FILE_SIZE_LIMIT' | 'INVALID_FILE_TYPE' | 'CUSTOM_ERROR';
  message?: string;
} => {
  const defaultOptions: IValidateFileOptions = {
    maxSize: 5, // 5MB default
    allowedTypes: [...allowedImageTypes],
    errorMessages: {
      fileSize: 'File size exceeds the maximum allowed size',
      fileType: 'File type is not allowed',
      custom: 'File validation failed',
    },
  };

  const config = { ...defaultOptions, ...options };
  const errorMessages = {
    ...defaultOptions.errorMessages,
    ...options?.errorMessages,
  };

  // Check file size
  const fileSizeInMB = file.size / 1024 / 1024;
  if (config.maxSize && fileSizeInMB > config.maxSize) {
    return {
      status: 'error',
      type: 'FILE_SIZE_LIMIT',
      message: errorMessages.fileSize,
    };
  }

  // Check file type
  const isTypeAllowed = isFileTypeAllowedV2(file, {
    allowedTypes: config.allowedTypes,
    caseInsensitive: true,
    allowWildcard: true,
  });

  if (!isTypeAllowed) {
    return {
      status: 'error',
      type: 'INVALID_FILE_TYPE',
      message: errorMessages.fileType,
    };
  }

  // Run custom validator if provided
  if (config.customValidator) {
    const customResult = config.customValidator(file);
    if (customResult !== true) {
      return {
        status: 'error',
        type: 'CUSTOM_ERROR',
        message:
          typeof customResult === 'string'
            ? customResult
            : errorMessages.custom,
      };
    }
  }

  return { status: 'success', type: 'SUCCESS' };
};

/**
 * Checks if an email is valid.
 * @param {string} email - The email to check.
 * @returns {boolean | ''} - Returns `true` if the email is valid; otherwise, `false`.
 */
export const isValidEmail = (email: string): boolean | '' => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email && re?.test(String(email)?.toLowerCase());
};

/**
 * Generates a UUID.
 * @returns {string} The generated UUID.
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'?.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v?.toString(16);
  });
};

/**
 * Flattens an array.
 * @param {any[]} arr - The array to flatten.
 * @returns {T[]} The flattened array.
 */
export const flattenArray = <T>(arr: any[]): T[] => {
  return arr.reduce((flat: T[], item: any) => {
    return flat.concat(Array.isArray(item) ? flattenArray<T>(item) : item);
  }, []);
};

/**
 * Normalizes a type string to match a given enum value.
 * Handles case-insensitive matching.
 *
 * @template T Enum type
 * @param {string} type - The type string to normalize
 * @param {T} enumObject - The enum to match against
 * @returns {T[keyof T] | null} The matched enum value or null if no match
 */
export const normalizeEnumValue = <T extends Record<string, string | number>>(
  type: string,
  enumObject: T
): T[keyof T] | null => {
  const normalizedType = type?.toLowerCase();
  const matchedEntry = Object.entries(enumObject).find(
    ([_, value]) => String(value)?.toLowerCase() === normalizedType
  );
  return matchedEntry ? (matchedEntry[1] as T[keyof T]) : null;
};

/**
 * Checks if a file type is valid.
 * @param {string} filename - The filename to check.
 * @param {string | RegExp} filetype - The filetype to check.
 * @returns {boolean} - Returns `true` if the file type is valid; otherwise, `false`.
 */
export const isFileTypeValid = (
  filename: string,
  filetype: string | RegExp
): boolean => {
  const pattern =
    typeof filetype === 'string' ? new RegExp(filetype) : filetype;
  return pattern.test(filename);
};

/**
 * Gets the text only from a string.
 * @param {string} text - The text to get the text only from.
 * @returns {string} The text only from the string.
 */
export const getTextOnly = (text: string): string => {
  return (
    text &&
    text
      ?.toLowerCase()
      ?.replace(/[^\w ]+/g, '')
      ?.trim()
      ?.replace(/ +/g, '')
  );
};

/**
 * Gets the pagination parameters.
 * @param {IPaginationOptions} pagination - The pagination options.
 * @param {boolean} [returnDefaultValues=true] - Whether to return the default values.
 * @param {number} [defaultOffset=0] - The default offset.
 * @param {number} [defaultLimit=10] - The default limit.
 * @returns {Object} The pagination parameters.
 */
export const getPaginationParams = ({
  pagination,
  returnDefaultValues = true,
  defaultOffset = 0,
  defaultLimit = 10,
}: {
  pagination?: IPaginationOptions;
  returnDefaultValues?: boolean;
  defaultOffset?: number;
  defaultLimit?: number;
}): {
  offset: number | null;
  limit: number | null;
} => {
  let offset: number | null = returnDefaultValues ? defaultOffset : null;
  let limit: number | null = returnDefaultValues ? defaultLimit : null;

  if (pagination) {
    offset = pagination?.offset ?? offset;
    limit = pagination?.limit ?? limit;
  }

  return { offset, limit };
};

/**
 * Creates a regex match for a given search query.
 * @param {string} searchQuery - The search query to create a regex match for.
 * @returns {Object} The regex match.
 */
export const createRegexMatch = (
  searchQuery = ''
): {
  $regex: RegExp;
} => {
  return {
    $regex: new RegExp(searchQuery?.trim()?.toLowerCase(), 'i'),
  };
};

/**
 * Formats a stripe amount to a USD string.
 * @param {number} stripeAmount - The stripe amount to format.
 * @returns {string} The formatted USD string.
 */
export const formatUSD = (stripeAmount: number) => {
  return `$${(stripeAmount / 100).toFixed(2)}`;
};

/**
 * Formats a stripe amount to a currency string with configurable options.
 * @param {number} stripeAmount - The amount in stripe format (cents).
 * @param {ICurrencyFormatOptions} options - Currency formatting options.
 * @returns {string} The formatted currency string.
 */
export const formatUSDV2 = (
  stripeAmount: number,
  options?: ICurrencyFormatOptions
): string => {
  const defaultOptions: ICurrencyFormatOptions = {
    currency: 'USD',
    symbol: '$',
    divideBy: 100,
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolPosition: 'before',
    includeSpace: false,
  };

  const config = { ...defaultOptions, ...options };

  const amount = stripeAmount / (config.divideBy || 100);
  let formattedAmount = amount.toFixed(config.decimalPlaces || 2);

  // Add thousands separator if enabled
  if (config.thousandsSeparator) {
    const parts = formattedAmount.split('.');
    parts[0] = parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      config.thousandsSeparator
    );
    formattedAmount = parts.join(config.decimalSeparator || '.');
  }

  // Apply symbol position
  const space = config.includeSpace ? ' ' : '';
  const symbol = config.symbol || '$';
  if (config.symbolPosition === 'before') {
    return `${symbol}${space}${formattedAmount}`;
  } else {
    return `${formattedAmount}${space}${symbol}`;
  }
};

/**
 * Formats a stripe amount to a USD string.
 * @param {string} USDString - The USD string to format.
 * @returns {number} The formatted stripe amount.
 */
export const formatStripeAmount = (USDString: string): number => {
  return parseFloat(USDString) * 100;
};

/**
 * Removes leading and trailing characters from a string.
 * By default removes backslashes, but can be configured to remove any character(s).
 *
 * @param {Object} params - The parameters object
 * @param {string} params.input - The input string to process
 * @param {string | string[]} [params.characters='\\'] - Character(s) to remove from start/end
 * @param {boolean} [params.onlyLeading=false] - If true, only removes from the beginning
 * @param {boolean} [params.onlyTrailing=false] - If true, only removes from the end
 * @param {boolean} [params.trimWhitespace=false] - If true, also trims whitespace
 * @returns {string} The processed string with specified characters removed from start/end
 *
 * @example
 * // Remove backslashes (default behavior)
 * removeLeadingTrailingChars({ input: '\\test\\' }) // 'test'
 *
 * // Remove specific characters
 * removeLeadingTrailingChars({ input: '/path/', characters: '/' }) // 'path'
 *
 * // Remove multiple characters
 * removeLeadingTrailingChars({ input: '///test///', characters: ['/'] }) // 'test'
 *
 * // Only remove from start
 * removeLeadingTrailingChars({ input: '\\test\\', onlyLeading: true }) // 'test\\'
 */
export const removeLeadingTrailingChars = ({
  input,
  characters = '\\',
  onlyLeading = false,
  onlyTrailing = false,
  trimWhitespace = false,
}: {
  input: string;
  characters?: string | string[];
  onlyLeading?: boolean;
  onlyTrailing?: boolean;
  trimWhitespace?: boolean;
}): string => {
  // Handle null/undefined input
  if (!input || typeof input !== 'string') return '';

  // Trim whitespace first if requested
  let result = trimWhitespace ? input.trim() : input;

  // Handle empty result after trimming
  if (!result) return '';

  // Normalize characters to array and escape for regex
  const charArray = Array.isArray(characters) ? characters : [characters];
  const escapedChars = charArray
    .filter((char) => char && typeof char === 'string')
    .map((char) => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('');

  // Early return if no valid characters to remove
  if (!escapedChars) return result;

  // Build regex pattern based on options
  let pattern = '';
  if (!onlyTrailing) {
    pattern += `^[${escapedChars}]+`; // Leading characters
  }
  if (!onlyLeading && !onlyTrailing) {
    pattern += '|'; // OR operator between leading and trailing
  }
  if (!onlyLeading) {
    pattern += `[${escapedChars}]+$`; // Trailing characters
  }

  // Apply the regex replacement
  if (pattern) {
    const regex = new RegExp(pattern, 'g');
    result = result.replace(regex, '');
  }

  return result;
};

/**
 * Checks if a string starts or ends with a forward slash ('/').
 *
 * @param input - The input string to validate.
 * @returns True if the string starts or ends with '/', otherwise false.
 */
export const hasLeadingOrTrailingSlash = (input: string): boolean => {
  return /^\/|\/$/?.test(input);
};

/**
 * Escapes special regex characters in a string by adding backslashes before them.
 * Preserves all safe characters that can be used in emails, usernames, product titles, etc.
 * Only escapes characters that would cause issues when passed to new RegExp().
 *
 * @param {Object} params - The parameters object
 * @param {string} params.input - The string to escape special regex characters in
 * @param {boolean} [params.removeLeadingTrailing=false] - Whether to remove leading and trailing backslashes
 * @returns {string} The string with special regex characters properly escaped with backslashes
 */
export const escapeRegex = ({
  input,
  removeLeadingTrailing = false,
}: {
  input: string;
  removeLeadingTrailing?: boolean;
}): string => {
  // Handle null/undefined input
  if (!input) return '';

  // Escape ALL regex special characters that would cause issues in new RegExp()
  // These characters have special meaning in regex and must be escaped:
  // . * + ? ^ $ { } ( ) | [ ] \ - (hyphen can be special in character classes)
  // We add a backslash before each of these characters to treat them as literals
  //
  // Safe characters that DON'T need escaping: & % # " : < > / , ; ' = ~ ` ! @
  const escaped = input.replace(/[*?^${}()|[\]\\/-]/g, '');

  // Remove leading and trailing backslashes if requested
  return removeLeadingTrailing
    ? removeLeadingTrailingChars({ input: escaped })
    : escaped;
};

/**
 * Formats a camelCase string to title case.
 * Adds spaces before capital letters and capitalizes the first letter of each word.
 * @param str - The camelCase string to format.
 * @returns The title case string.
 */
export const formatCamelCaseToTitle = (str: string): string => {
  // First, add space before capital letters and convert to lowercase
  const withSpaces = str.replace(/([A-Z])/g, ' $1').toLowerCase();

  // Capitalize first letter of each word
  return withSpaces
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
};

/**
 * Converts a value from one time unit to another.
 * @param {TimeUnitEnum} valueUnit - The unit of the input value.
 * @param {number} value - The value to convert.
 * @param {TimeUnitEnum} outputUnit - The unit of the output value.
 * @returns {number} The converted value.
 */
export const getTimeInUnit = ({
  valueUnit,
  value,
  outputUnit,
}: {
  valueUnit: TimeUnitEnum;
  value: number;
  outputUnit: TimeUnitEnum;
}): number => {
  // Convert input value to seconds as base unit
  let valueInSeconds = value;

  switch (valueUnit) {
    case TimeUnitEnum.Years:
      valueInSeconds = value * 365 * 24 * 60 * 60;
      break;
    case TimeUnitEnum.Months:
      valueInSeconds = value * 30 * 24 * 60 * 60;
      break;
    case TimeUnitEnum.Days:
      valueInSeconds = value * 24 * 60 * 60;
      break;
    case TimeUnitEnum.Hours:
      valueInSeconds = value * 60 * 60;
      break;
    case TimeUnitEnum.Minutes:
      valueInSeconds = value * 60;
      break;
    case TimeUnitEnum.Seconds:
      valueInSeconds = value;
      break;
    case TimeUnitEnum.Milliseconds:
      valueInSeconds = value / 1000;
      break;
  }

  // Convert from seconds to output unit
  switch (outputUnit) {
    case TimeUnitEnum.Years:
      return valueInSeconds / (365 * 24 * 60 * 60);
    case TimeUnitEnum.Months:
      return valueInSeconds / (30 * 24 * 60 * 60);
    case TimeUnitEnum.Days:
      return valueInSeconds / (24 * 60 * 60);
    case TimeUnitEnum.Hours:
      return valueInSeconds / (60 * 60);
    case TimeUnitEnum.Minutes:
      return valueInSeconds / 60;
    case TimeUnitEnum.Seconds:
      return valueInSeconds;
    case TimeUnitEnum.Milliseconds:
      return valueInSeconds * 1000;
    default:
      return valueInSeconds;
  }
};

/**
 * Checks if the code is running in a browser environment.
 * @returns {boolean} - Returns `true` if running in browser; otherwise, `false`.
 */
export const isBrowser = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof navigator !== 'undefined'
  );
};

/**
 * Checks if an email is a private relay email for Apple ID.
 *
 * @param {string} email - The email address to check.
 * @returns {boolean} True if the email is a private relay email, false otherwise.
 */
export const isApplePrivateEmail = ({
  email = '',
  pattern = /^[a-zA-Z0-9._%+-]+@privaterelay\.appleid\.com$/,
}: {
  email: string;
  pattern?: RegExp;
}): boolean => {
  return pattern.test(email);
};
