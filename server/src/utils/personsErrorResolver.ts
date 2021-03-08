type IErrorType =
  | 'CARD_LENGTH_ERROR'
  | 'DUPLICATION_NAME_ERROR'
  | 'DUPLICATION_CARD_ERROR'
  | 'PERSON_DOESNOT_EXIST';

export const personErrorResolver = (errorType: IErrorType) => {
  if (errorType === 'CARD_LENGTH_ERROR') {
    return {
      errors: [
        {
          errorType: "Card's length problem",
          message: "Sorry, card's length must be in space from 4 to 8",
        },
      ],
    };
  }
  if (errorType === 'DUPLICATION_NAME_ERROR') {
    return {
      errors: [
        {
          errorType: 'Such person exists',
          message: 'Looks like a person with this BIO already exists... :p',
        },
      ],
    };
  }
  if (errorType === 'DUPLICATION_CARD_ERROR') {
    return {
      errors: [
        {
          errorType: 'Such card number exists',
          message: 'Looks like a person with this card already exists... :p',
        },
      ],
    };
  }
  if (errorType === 'PERSON_DOESNOT_EXIST') {
    return {
      errors: [
        {
          errorType: 'Persons doesnt exist',
          message: 'Sorry, we broke smth :) person not found... :p',
        },
      ],
    };
  }

  return {
    errors: [
      {
        errorType: 'Another server error',
        message: 'And we promise to repair it somewhen :p',
      },
    ],
  };
};
