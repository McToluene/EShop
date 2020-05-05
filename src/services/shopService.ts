import { Service, Inject } from 'typedi';
import { Logger } from 'winston';
import { IShopDto, IShop } from '../interfaces/IShop';
import { UserType } from '../interfaces/IUser';
import MailerService from './mailerService';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/event';

@Service()
export default class ShopService {
  constructor(
    @Inject('logger') private logger: Logger,
    private mailerService: MailerService,
    @Inject('shopModel') private shopModel: Models.ShopModel,
    @Inject('userModel') private userModel: Models.UserModel,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  async createShop(shopDto: IShopDto, _id: string): Promise<{ shop: IShop }> {
    try {
      this.logger.silly('Checking user type');
      const userRecord = await this.userModel.findOne({ _id });

      if (userRecord && !(userRecord.type === UserType.seller)) {
        throw new Error('Unauthorized');
      }

      this.logger.silly('Checking shop db record');
      const registrationNumber = shopDto.registrationNumber;
      const shopRecord = await this.shopModel.findOne({ registrationNumber });

      if (shopRecord) {
        throw new Error('Registration number used');
      }

      this.logger.silly('Creating shop db record');
      const newShopRecord = await this.shopModel.create(shopDto);

      if (!newShopRecord) {
        throw new Error('Shop cannot be created');
      }

      this.logger.silly('Sending welcome email');
      await this.mailerService.sendWelcomeEmail(userRecord.email, `Shop ${newShopRecord.name} created`, ''); // Todo: Write a better message for shop created
      this.eventDispatcher.dispatch(events.shop.created, { shop: newShopRecord });

      const shop = newShopRecord.toObject();

      return { shop };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
