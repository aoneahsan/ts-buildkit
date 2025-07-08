export const getStripeErrorMessageByErrorCode = (code: string): string => {
  switch (code) {
    case 'invalid_address_city_state_postal_code':
      return 'The combination of the city, state, and postal code in the provided address could not be validated.';
    case 'invalid_street_address':
      return 'The street name and/or number for the provided address could not be validated.';
    // this is a generic error
    case 'invalid_value_other':
      return 'An invalid value was provided for the some field. This is a general error code.';
    case 'verification_document_address_mismatch':
      return 'The address on the document did not match the address on the account. Upload a document with a matching address or update the address on the account.';
    case 'verification_document_address_missing':
      return 'The address was missing on the document. Upload a document that includes the address.';
    case 'verification_document_corrupt':
      return 'The uploaded file for the document was invalid or corrupt. Please upload a new file of the document.';
    case 'verification_document_country_not_supported':
      return 'Sorry The provided document is from an unsupported country :/';
    case 'verification_document_dob_mismatch':
      return 'The date of birth (DOB) on the document did not match the DOB on the account. Upload a document with a matching DOB or update the DOB on the account.';
    case 'verification_document_duplicate_type':
      return 'The same type of document was used twice. Two unique types of documents are required for verification. Upload two different documents.';
    case 'verification_document_expired':
      return 'The document could not be used for verification because it has expired. If it’s an identity document, its expiration date must be after the date the document was submitted. If it’s an address document, the issue date must be within the last six months.';
    case 'verification_document_failed_copy':
      return 'The document could not be verified because it was detected as a copy (e.g., photo or scan). Upload the original document.';
    case 'verification_document_failed_greyscale':
      return 'The document could not be used for verification because it was in greyscale. Upload a color copy of the document.';
    case 'verification_document_failed_other':
      return 'The document could not be verified for an unknown reason. Ensure that the document follows the guidelines for document uploads.';
    case 'verification_document_failed_test_mode':
      return 'A test data helper was supplied to simulate verification failure. Refer to the documentation for test file tokens.';
    case 'verification_document_fraudulent':
      return 'The document was identified as altered or falsified.';
    case 'verification_document_id_number_mismatch':
      return 'The ID number on the account could not be verified. Correct any errors in the ID number field or upload a document that includes the ID number.';
    case 'verification_document_id_number_missing':
      return 'The ID number was missing on the document. Upload a document that includes the ID number.';
    case 'verification_document_incomplete':
      return 'The document was cropped or missing important information. Upload a complete scan of the document.';
    case 'verification_document_invalid':
      return 'The uploaded file was not one of the valid document types. Ensure that the document follows the guidelines for document uploads.';
    case 'verification_document_issue_or_expiry_date_missing':
      return 'The issue or expiry date is missing on the document. Upload a document that includes the issue and expiry dates.';
    case 'verification_document_manipulated':
      return 'The document was identified as altered or falsified.';
    case 'verification_document_missing_back':
      return 'The uploaded file was missing the back of the document. Upload a complete scan of the document.';
    case 'verification_document_missing_front':
      return 'The uploaded file was missing the front of the document. Upload a complete scan of the document.';
    case 'verification_document_name_mismatch':
      return 'The name on the document did not match the name on the account. Upload a document with a matching name or update the name on the account.';
    case 'verification_document_name_missing':
      return 'The name was missing on the document. Upload a document that includes name.';
    case 'verification_document_nationality_mismatch':
      return 'The nationality on the document did not match the stated nationality. Update the stated nationality, or upload a document that matches it.';
    case 'verification_document_not_readable':
      return 'The document could not be read. Ensure that the document follows the guidelines for document uploads.';
    case 'verification_document_not_signed':
      return 'A valid signature is missing on the document. Upload a document that includes a valid signature.';
    case 'verification_document_not_uploaded':
      return 'No document was uploaded. Upload the document again.';
    case 'verification_document_photo_mismatch':
      return 'The document was identified as altered or falsified.';
    case 'verification_document_too_large':
      return 'The uploaded file exceeded the 10 MB size limit. Resize the document and upload the new file.';
    case 'verification_document_type_not_supported':
      return 'The provided document type was not accepted. Ensure that the document follows the guidelines for document uploads.';
    case 'verification_failed_address_match':
      return 'The address on the account could not be verified. Correct any errors in the address field or upload a document that includes the address.';
    case 'verification_failed_business_iec_number':
      return 'The Importer Exporter Code (IEC) number could not be verified. Correct any errors in the IEC number field.';
    case 'verification_failed_document_match':
      return 'The document could not be verified. Upload a document that includes the name, ID number, and address fields.';
    case 'verification_failed_id_number_match':
      return 'The ID number on the account could not be verified. Correct any errors in the ID number field or upload a document that includes the ID number.';
    case 'verification_failed_keyed_identity':
      return 'The keyed-in identity information could not be verified. Correct any errors or upload a document that matches the identity fields (e.g., name and date of birth) entered.';
    case 'verification_failed_keyed_match':
      return 'The keyed-in information on the account could not be verified. Correct any errors in the name, ID number, or address fields. You can also upload a document that includes those fields.';
    case 'verification_failed_name_match':
      return 'The name on the account could not be verified. Correct any errors in the name field or upload a document that includes the name.';
    case 'verification_failed_tax_id_match':
      return 'The tax ID on the account cannot be verified by the IRS. Either correct any possible errors in the name or tax ID, or upload a document that contains those fields.';
    case 'verification_failed_tax_id_not_issued':
      return 'The tax ID on the account was not recognized by the IRS. Refer to the support article for newly-issued tax ID numbers.';
    case 'verification_failed_other':
      return 'Verification failed for an unknown reason. Correct any errors and resubmit the required fields.';
    default:
      return 'Oops, something went wrong :/';
  }
};

export const getStripeErrorMessageByRequirement = (
  requirement: string
): string => {
  switch (requirement) {
    case 'individual.verification.additional_document':
      return 'Some additional verification document might be required';

    case 'individual.verification.document':
      return 'Some verification document might be required';

    default:
      return 'Please try again';
  }
};

export const getStripeErrorMessageByDisabledCode = (code: string): string => {
  switch (code) {
    case 'application.deauthorized':
      return 'You opted to delete your Stripe account.';

    case 'requirements.past_due':
      return 'Your account is disabled because you do not meet Stripe requirements.';

    case 'requirements.pending_verification':
      return 'Your account is not yet enabled because it is being verified.';

    case 'rejected.fraud':
      return 'Your account has been permanently banned because of fraudulent activity.';

    case 'rejected.terms_of_service':
      return 'Your account is not enabled beacause you have rejected Stripe terms of service (TOS).';

    case 'rejected.listed':
      return 'Your account is rejected. Please get in touch for more info.';

    case 'rejected.other':
      return 'Your account is rejected. Please get in touch for more info.';

    case 'listed':
      return 'Your account is disabled. Please get in touch for more info';

    case 'under_review':
      return 'Your account is temporarily disabled and it under review. Sorry for the inconvenience.';

    case 'other':
      return 'Your account is disabled. Please get in touch for more info.';

    default:
      return 'Your account is disabled. Please get in touch for more info.';
  }
};
