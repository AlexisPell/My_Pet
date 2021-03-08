type IErrorType =
  | 'NO_ACCESS_POINT'
  | 'SUCH_ACCESS_POIN_EXISTS'
  | 'SHORT_NAME_ERROR'
  | 'DUPLICATION_NAME_ERROR';

export const errorResolver = (errorType: IErrorType) => {
  if (errorType === 'NO_ACCESS_POINT') {
    return {
      errors: [
        {
          errorType: 'Access point doesnt exist',
          message: 'Sorry, we broke smth :) accessPoint not found... :p',
        },
      ],
    };
  }
  if (errorType === 'SUCH_ACCESS_POIN_EXISTS') {
    return {
      errors: [
        {
          errorType: 'Such accessPoint exists',
          message: 'Looks like a accessPoint with this name already exists... :p',
        },
      ],
    };
  }
  if (errorType === 'SHORT_NAME_ERROR') {
    return {
      errors: [
        {
          errorType: 'Short name',
          message: "Sorry, access point name's length must be greater than 2",
        },
      ],
    };
  }
  if (errorType === 'DUPLICATION_NAME_ERROR') {
    return {
      errors: [
        {
          errorType: 'Such access point exists',
          message: 'Looks like an access point with this name already exists... :p',
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
