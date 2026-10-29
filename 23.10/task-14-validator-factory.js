/**
 * Задача 14: Каррированная фабрика валидаторов инпута
 * Каррирование (Currying), обработчики форм
 */

function createValidator(ruleName, param) {
  // Возвращаем валидатор, который принимает строку
  return function validate(input) {
    switch (ruleName) {
      case 'minLength':
        return {
          isValid: input.length >= param,
          message: input.length >= param 
            ? '' 
            : `Must be at least ${param} characters`,
        };

      case 'maxLength':
        return {
          isValid: input.length <= param,
          message: input.length <= param 
            ? '' 
            : `Must be no more than ${param} characters`,
        };

      case 'pattern':
        return {
          isValid: param.test(input),
          message: param.test(input) 
            ? '' 
            : 'Invalid format',
        };

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
          isValid: emailRegex.test(input),
          message: emailRegex.test(input) 
            ? '' 
            : 'Invalid email address',
        };

      case 'custom':
        return {
          isValid: param(input),
          message: param(input) ? '' : 'Invalid value',
        };

      default:
        return {
          isValid: true,
          message: '',
        };
    }
  };
}

// Примеры использования:
/*
// Создаём валидаторы
const validateName = createValidator('minLength', 2);
const validateAge = createValidator('minLength', 1);
const validateEmail = createValidator('email');
const validateZipCode = createValidator('pattern', /^\d{5}$/);

// Валидируем
console.log(validateName('A'));     // { isValid: false, message: 'Must be at least 2 characters' }
console.log(validateName('Alice')); // { isValid: true, message: '' }

console.log(validateZipCode('123'));      // { isValid: false, message: 'Invalid format' }
console.log(validateZipCode('12345'));    // { isValid: true, message: '' }

// Композиция валидаторов
const validators = [validateName, validateEmail];

function validateForm(values) {
  const errors = {};
  validators.forEach(validator => {
    const result = validator(values.name);
    if (!result.isValid) {
      errors.name = result.message;
    }
  });
  return errors;
}
*/