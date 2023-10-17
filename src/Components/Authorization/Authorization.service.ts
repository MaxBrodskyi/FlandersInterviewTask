import { beResponseMock } from '../Helpers/helpers';
import { IResponse } from '../Helpers/IHelpers';
import { IAuthorizationPayload } from './IAuthorization';

export const authorize = async (payload: IAuthorizationPayload) => {
  const response = (await beResponseMock(payload)) as IResponse;
  return response;
};

const authorizationService = {
  authorize: authorize,
};

export default authorizationService;
