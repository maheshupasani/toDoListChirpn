import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

export interface EnvConfig {
  [prop: string]: string;
}

export const MYSQL_DATABASE = 'MYSQL_DATABASE';
export const MYSQL_HOST = 'MYSQL_HOST';
export const MYSQL_USER = 'MYSQL_USER';
export const MYSQL_PASSWORD = 'MYSQL_PASSWORD';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const config = dotenv.config().parsed;
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      MYSQL_DATABASE: Joi.string().required(),
      MYSQL_HOST: Joi.string().required(),
      MYSQL_USER: Joi.string().required(),
      NODE_ENV: Joi.string().required().valid(['production', 'development']),
      MYSQL_PASSWORD: Joi.string().allow('', null),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
