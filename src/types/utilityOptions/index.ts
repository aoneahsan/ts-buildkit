/**
 * Options for validateFileBeforeUpload function
 */
export interface IValidateFileOptions {
  /** Maximum file size in MB. Default: 5 */
  maxSize?: number;
  /** Array of allowed MIME types. Default: ['image/png', 'image/jpeg', 'image/gif'] */
  allowedTypes?: string[];
  /** Custom validation function that returns true if valid, or error message if invalid */
  customValidator?: (file: File) => boolean | string;
  /** Custom error messages */
  errorMessages?: {
    fileSize?: string;
    fileType?: string;
    custom?: string;
  };
}

/**
 * Options for imageTypeAllowed and isFileTypeAllowed functions
 */
export interface IFileTypeOptions {
  /** Array of allowed MIME types */
  allowedTypes?: string[];
  /** Whether to use case-insensitive comparison. Default: true */
  caseInsensitive?: boolean;
  /** Whether to allow wildcard matching (e.g., 'image/*'). Default: false */
  allowWildcard?: boolean;
}

/**
 * Options for truncateString function
 */
export interface ITruncateStringOptions {
  /** Maximum length of the string. Default: 10 */
  length?: number;
  /** String to append when truncated. Default: '...' */
  ellipsis?: string;
  /** Where to truncate: 'end', 'middle', or 'start'. Default: 'end' */
  position?: 'end' | 'middle' | 'start';
  /** Whether to respect word boundaries. Default: false */
  wordBoundary?: boolean;
}

/**
 * Options for convertToTitleCase function
 */
export interface ITitleCaseOptions {
  /** Words that should remain lowercase. Default: ['a', 'an', 'the', 'and', 'or', 'but', 'for', 'nor', 'so', 'yet', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up'] */
  lowercaseWords?: string[];
  /** Words that should remain uppercase (e.g., acronyms). Default: [] */
  uppercaseWords?: string[];
  /** Custom word separators. Default: [' ', '-', '_'] */
  separators?: string[];
  /** Whether to force first letter uppercase even for exception words. Default: true */
  forceFirstUppercase?: boolean;
  /** Locale for case conversion. Default: 'en-US' */
  locale?: string;
}

/**
 * Options for generateUniqueCode function
 */
export interface IGenerateCodeOptions {
  /** Length of the code. Default: 6 */
  length?: number;
  /** Character set to use. Default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' */
  charset?: string;
  /** Prefix to add to the code. Default: '' */
  prefix?: string;
  /** Suffix to add to the code. Default: '' */
  suffix?: string;
  /** Separator between segments if using segments. Default: '-' */
  separator?: string;
  /** Array of segment lengths (e.g., [3, 3] for 'ABC-DEF'). Default: null */
  segments?: number[];
  /** Whether to exclude ambiguous characters (0, O, I, l). Default: false */
  excludeAmbiguous?: boolean;
}

/**
 * Options for formatUSD and currency formatting functions
 */
export interface ICurrencyFormatOptions {
  /** Currency symbol. Default: '$' */
  symbol?: string;
  /** Symbol position: 'before' or 'after'. Default: 'before' */
  symbolPosition?: 'before' | 'after';
  /** Number of decimal places. Default: 2 */
  decimals?: number;
  /** Decimal separator. Default: '.' */
  decimalSeparator?: string;
  /** Thousands separator. Default: ',' */
  thousandsSeparator?: string;
  /** Whether to include space between symbol and number. Default: false */
  includeSpace?: boolean;
  /** Locale for number formatting. Default: 'en-US' */
  locale?: string;
  /** Whether to show negative values in parentheses. Default: false */
  negativeInParentheses?: boolean;
}

/**
 * Options for getRemainingTimeForCountDown function
 */
export interface ICountdownOptions {
  /** Time format: 'short', 'long', or 'custom'. Default: 'short' */
  format?: 'short' | 'long' | 'custom';
  /** Custom labels for time units */
  labels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
    daysPlural?: string;
    hoursPlural?: string;
    minutesPlural?: string;
    secondsPlural?: string;
  };
  /** Whether to show zero values. Default: false */
  showZeros?: boolean;
  /** Maximum units to show (e.g., 2 shows only days and hours). Default: 4 */
  maxUnits?: number;
  /** Separator between units. Default: ' ' */
  separator?: string;
  /** Locale for formatting. Default: 'en-US' */
  locale?: string;
}

/**
 * Options for date formatting functions
 */
export interface IDateFormatOptions {
  /** Date format string. Default varies by function */
  format?: string;
  /** Timezone. Default: local timezone */
  timezone?: string;
  /** Locale for formatting. Default: 'en-US' */
  locale?: string;
}

/**
 * Options for validation functions
 */
export interface IValidationOptions {
  /** Custom regex pattern for validation */
  pattern?: RegExp;
  /** Custom error message */
  errorMessage?: string;
  /** Whether validation is case sensitive. Default: true */
  caseSensitive?: boolean;
  /** Additional validation function */
  customValidator?: (value: any) => boolean;
}

/**
 * Options for createRegexMatch function
 */
export interface IRegexMatchOptions {
  /** Regex flags (e.g., 'gi' for global case-insensitive). Default: '' */
  flags?: string;
  /** Whether to escape special characters. Default: false */
  escape?: boolean;
  /** Whether to return all matches or just the first. Default: false */
  global?: boolean;
}

/**
 * Options for image dimension functions
 */
export interface IImageDimensionOptions {
  /** What to do on error: 'throw' or 'return-null'. Default: 'throw' */
  onError?: 'throw' | 'return-null';
  /** Maximum time to wait for image load in ms. Default: 5000 */
  timeout?: number;
}

/**
 * Global configuration options for the library
 */
export interface IZTKGlobalConfig {
  /** Secret key for cryptography functions */
  cryptoSecret?: string;
  /** Default file upload configuration */
  fileUpload?: {
    maxSize?: number;
    allowedTypes?: string[];
  };
  /** Default date/time formatting */
  dateTime?: {
    format?: string;
    timezone?: string;
    locale?: string;
  };
  /** Default currency formatting */
  currency?: {
    symbol?: string;
    decimals?: number;
    locale?: string;
  };
  /** Error message templates */
  errorMessages?: {
    [key: string]: string;
  };
  /** Default validation options */
  validation?: {
    emailDomains?: string[];
    phoneCountryCode?: string;
  };
}