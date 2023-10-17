import { IAuthorizationPayload } from '../Authorization/IAuthorization';
import { IResponse } from './IHelpers';
const authorizedUser = {
  userName: 'MAINT',
  userPassword: 'safetyiskey',
};
export const beResponseMock = (payloadIn: IAuthorizationPayload) => {
  return new Promise((resolve) => {
    const randomDelay = Math.floor(Math.random() * 600); // Random delay between 100ms and 600ms
    console.log('Calling Back End with Payload');

    const response = {
      statusCode: 401,
      statusMessage: 'Unatuhorized',
      data: null,
    } as IResponse;

    if (
      payloadIn.userName === authorizedUser.userName &&
      payloadIn.userPassword === authorizedUser.userPassword
    ) {
      response.statusCode = 200;
      response.statusMessage = 'Sucesfully Authorized';
      response.data = 'JWTXXXX';
    }

    setTimeout(() => {
      resolve(response);
    }, randomDelay);
  });
};
