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
    @Inject('addressModel') private addressModel: Models.AddressModel,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  async createShop(shopDto: IShopDto, type: string): Promise<{ shop: IShop }> {
    try {
      this.logger.silly('Checking user type');
      if (type === UserType.seller) {
        throw new Error('Unauthorized');
      }

      this.logger.silly('Checking shop db record');
      const registrationNumber = shopDto.registrationNumber;
      const shopRecord = await this.shopModel.findOne({ registrationNumber });

      if (shopRecord) {
        throw new Error('Registration number used');
      }

      this.logger.silly(`Creating address db for ${shopDto.address.length} record`);

      const addressRecord = await this.addressModel.create(shopDto.address);
      if (!addressRecord) {
        throw new Error('Internal Server Error');
      }

      this.logger.silly('Creating shop db record');
      const buildShop: IShopDto = {
        name: shopDto.name,
        registrationNumber: shopDto.registrationNumber,
        address: [...addressRecord],
        owner: shopDto.owner,
      };
      const newShopRecord = await this.shopModel.create(buildShop);

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

  async updateShop(shopDto: IShopDto, type: string): Promise<{ shop: IShop }> {
    try {
      this.logger.silly('Checking user type');
      if (type === UserType.seller) {
        throw new Error('Unauthorized');
      }

      const newShopRecord = await this.shopModel.findByIdAndUpdate();

      const shop = newShopRecord.toObject();
      return { shop };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
