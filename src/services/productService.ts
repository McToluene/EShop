import { Service, Inject } from 'typedi';
import { Logger } from 'winston';

@Service()
export default class ProductService {
  constructor(@Inject('logger') private logger: Logger, @Inject('productModel') private usermodel: Models.UserModel) {}
}
