/**
 * Constants for API requests.
 */
export const apiConstants = {
  authorizationTokenType: {
    bearer: 'Bearer',
  },
} as const;

/**
 * Constants for default values.
 */
export const defaultValue = {
  fallbackValue: '---',
};

/**
 * Constants for dayjs.
 */
export const dayjs = {
  formate: 'DD-MM-YYYY HH:mm A',
};

/**
 * Constants for date formats.
 */
export const dateFormat = {
  ISODateTimeFormate: 'YYYY-MM-DDTHH:mm',
  fullDateWithTime12Hour: 'MMMM D, h:mm a',
  compactDateTimeWithAMPM: 'DD-MM-YYYY HH:mm A',
  compactDateWithMonthAbbr: 'DD-MMM-YYYY',
};

/**
 * Constants for URL parameters.
 */
export const urlParams = {
  googleMapsApiKey: '{{googleMapsApiKey}}',
} as const;

/**
 * Constants for time units.
 */
export const timeUnitType = {
  MINUTES: 'minutes',
} as const;

/**
 * Constants for URL targets.
 */
export const urlTarget = {
  blank: '_blank',
} as const;

/**
 * Constants for fields validation.
 */
export const fieldsValidation = {
  generic: {
    title: {
      min: {
        val: 1,
        errorMessage: 'Title is required.',
      },
      max: {
        val: 100,
        errorMessage: 'Title max value can not be greater than 100.',
      },
      isOptional: false,
    },
    description: {
      short: {
        max: {
          val: 250,
          errorMessage: 'Description max value allowed is 250 characters.',
        },
        isOptional: true,
      },
      medium: {
        max: {
          val: 500,
          errorMessage: 'Description max value allowed is 500 characters.',
        },
        isOptional: true,
      },
    },
    phoneNumber: {
      min: {
        val: 12,
        errorMessage: 'Phone number min value allowed is 13 characters.',
      },
      max: {
        val: 13,
        errorMessage: 'Phone number max value allowed is 13 characters.',
      },
      startWith: {
        val: '+923',
        errorMessage: 'Phone number must start with +923',
      },
      isOptional: false,
    },
    remarks: {
      short: {
        max: {
          val: 250,
          errorMessage: 'Remarks max value allowed is 250 characters.',
        },
        isOptional: true,
      },
      medium: {
        max: {
          val: 500,
          errorMessage: 'Remarks max value allowed is 500 characters.',
        },
        isOptional: true,
      },
    },
    verificationCode: {
      length: {
        val: 6,
        errorMessage: 'Verification code must contain exactly 6 character(s)',
      },
    },
  },
} as const;

/**
 * Constants for SVG icon types.
 */
export const svgIconTypes: string[] = ['image/svg', 'image/svg+xml'];

/**
 * Constants for allowed image types.
 */
export const allowedImageTypes = ['image/png', 'image/jpeg', 'image/gif'];

/**
 * Default allowed image types as a string (for backward compatibility).
 * @deprecated Use allowedImageTypes array instead
 */
export const allowedImageTypesString = 'image/png, image/jpeg, image/gif';
