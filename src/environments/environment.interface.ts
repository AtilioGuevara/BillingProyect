export interface Environment {
  production: boolean;
  apiCreateUrl: string;
  apiReadUrl: string;
  inventoryApiUrl: string;
  authApiUrl: string;
  clientApiUrl: string;
  authEndpoints: {
    login: string;
    verify: string;
    logout: string;
  };
  database: {
    host: string;
    name: string;
  };
  enableHttps: boolean;
  auth: {
    enabled: boolean;
    externalLoginUrl: string;
    callbackUrl: string;
    localCallbackUrl: string;
  };
  endpoints: {
    finalConsumerBill: {
      create: string;
      getAll: string;
      getByGenerationCode: string;
      getReturnInfo: string;
      createReturn: string;
    };
  };
  vps: {
    ip: string;
    port: number;
    sshCommand: string;
  };
}