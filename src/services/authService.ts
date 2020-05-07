import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import MailerService from './mailerService';
import { IUserRegisterDTO, IUser } from '../interfaces/IUser';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from '../config';
import events from '../subscribers/event';

@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private usermodel: Models.UserModel,
    private mailerService: MailerService,
    @Inject('logger') private logger: any,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  async register(userDto: IUserRegisterDTO): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);

      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userDto.password, { salt });

      this.logger.silly('Creating user db record');
      const userRecord = await this.usermodel.create({
        ...userDto,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });

      this.logger.silly('Generating JWT');
      const token: string = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      this.logger.silly('Sending welcome email');
      await this.mailerService.sendWelcomeEmail(userRecord.email, 'Welcome on board!', 'Good to have you on baord');
      this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return { user, token };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.usermodel.findOne({ email });
    if (!userRecord) {
      throw new Error('User not registered');
    }

    this.logger.silly('Checking password');
    const validatePassword = await argon2.verify(userRecord.password, password);
    if (validatePassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token: string = this.generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return { user, token };
    } else {
      throw new Error('Invalid password!');
    }
  }

  private generateToken(userRecord: IUser): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for ${userRecord._id}`);
    return jwt.sign(
      {
        _id: userRecord._id,
        role: userRecord.type,
        name: userRecord.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
