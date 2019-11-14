import { validateEmail, validateContactNumber } from '../helpers';

describe('helpers', () => {
  describe('validateEmail', () => {
    it('should return true when email format is valid', () => {
      expect(validateEmail('test@mail.com')).toBe(true);
      expect(validateEmail('test.mail@mail.com')).toBe(true);
      expect(validateEmail('my_mail@mail.edu')).toBe(true);
    });

    it('should return false when email format is invalid', () => {
      expect(validateEmail('test')).toBe(false);
      expect(validateEmail('test@mail')).toBe(false);
      expect(validateEmail('test.mailcom')).toBe(false);
    });
  });

  describe('validateContactNumber', () => {
    it('should return true when contact number format is valid', () => {
      expect(validateContactNumber('09123456789')).toBe(true);
      expect(validateContactNumber('+639123456789')).toBe(true);
    });

    it('should return false when contact number format is invalid', () => {
      expect(validateContactNumber('wrong_number')).toBe(false);
      expect(validateContactNumber('1234')).toBe(false);
      expect(validateContactNumber('08123456789')).toBe(false);
      expect(validateContactNumber('+638123456789')).toBe(false);
    });
  });
});
