import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
  MONGO_DB_NAME: Joi.string().required(),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_SYNCHRONIZE: Joi.boolean().required(),
});
