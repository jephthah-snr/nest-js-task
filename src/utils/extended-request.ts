import { Request } from 'express';
import { User } from './types';

interface ExtendedRequest extends Request {
  user: User;
}


export default ExtendedRequest;