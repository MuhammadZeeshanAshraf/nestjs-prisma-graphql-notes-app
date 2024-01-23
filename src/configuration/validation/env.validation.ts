import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.number().port().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.string().required()
});
