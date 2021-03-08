type IErrorType = 'SHORT_NAME_ERROR' | 'DUPLICATION_NAME_ERROR';

export const plansErrorResolver = (errorType: IErrorType) => {
  if (errorType === 'SHORT_NAME_ERROR') {
    return {
      errors: [
        {
          errorType: "Plan's name is too short",
          message: 'Minimal length is 2 characters :)',
        },
      ],
    };
  }
  if (errorType === 'DUPLICATION_NAME_ERROR') {
    return {
      errors: [
        {
          errorType: 'Such plan exists',
          message: 'Looks like a plan with this name already exists... :p',
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
