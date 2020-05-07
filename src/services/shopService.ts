import { Service, Inject } from 'typedi';
import { Logger } from 'winston';
import { IShopDTO, IShop } from '../interfaces/IShop';
import { UserType } from '../interfaces/IUser';
import MailerService from './mailerService';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';

@Service()
export default class ShopService {
  constructor(
    @Inject('logger') private logger: Logger,
    private mailerService: MailerService,
    @Inject('shopModel') private shopModel: Models.ShopModel,
    @Inject('userModel') private userModel: Models.UserModel,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  async createShop(shopDto: IShopDTO, type: string): Promise<{ shop: IShop }> {
    try {
      this.logger.silly('Checking user type');
      if (!(type === UserType.seller)) {
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
        throw (new Error('Shop cannot be created').name = '403');
      }

      const shop = newShopRecord.toObject();
      return { shop };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async updateShop(shopDto: IShopDTO, type: string, _id: string): Promise<{ shop: IShop }> {
    try {
      this.logger.silly('Checking user type');
      if (!(type === UserType.seller)) {
        throw new Error('Unauthorized');
      }

      this.logger.silly('Checking shop db record');
      const registrationNumber = shopDto.registrationNumber;
      const shopRecord = await this.shopModel.findOne({ registrationNumber });

      if (shopRecord && shopRecord.id !== _id) {
        throw new Error('Registration number used');
      }

      const updatedShopRecord = await this.shopModel.findOneAndUpdate({ _id }, { $set: shopDto }, { new: true });

      if (!updatedShopRecord) {
        throw new Error('Shop cannot be updated');
      }
      const shop = updatedShopRecord.toObject();
      return { shop };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
