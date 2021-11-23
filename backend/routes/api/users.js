const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a name with at least 4 characters.'),
    check('name')
      .not()
      .isEmail()
      .withMessage('name cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, name } = req.body;
      const user = await User.signup({ email, name, password });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user,
      });
    }),
  );

router.get(
  '/', 
  asyncHandler(async (req, res) => {
  const users = await User.findAll();
  return res.json({ users })
}))


module.exports = router;