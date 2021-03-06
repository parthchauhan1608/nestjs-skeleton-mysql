import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  Table,
  Comment,
  AutoIncrement,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import Constants from '../../constants/model';
import { User } from './user.entity';

@Table({
  tableName: 'companies',
  timestamps: true,
  paranoid: true,
  freezeTableName: false,
})
export class Company extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER.UNSIGNED)
  id: number;

  @AllowNull(true)
  @Column(DataType.STRING(30))
  referenceId: string;

  @Comment('AutoGenerated')
  @Column(DataType.STRING(30))
  extensionId: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  website: string;

  @Column(DataType.STRING)
  legalName: string;

  @Column(DataType.STRING)
  businessAddress: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  unitNumber: string;

  @AllowNull(true)
  @Column(DataType.INTEGER.UNSIGNED)
  cityId: number;

  @AllowNull(true)
  @Column(DataType.INTEGER.UNSIGNED)
  stateId: number;

  @Column(DataType.SMALLINT({ length: 4 }).UNSIGNED)
  countryCode: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isRushShipment: boolean;

  @Column(DataType.SMALLINT({ length: 4 }).UNSIGNED)
  geoCountryCode: number;

  @Column(DataType.SMALLINT({ length: 4 }).UNSIGNED)
  billingCurrency: number;

  @Default(Constants.BILLING_METHOD.USD)
  @Column(DataType.ENUM(...Object.values(Constants.BILLING_METHOD)))
  billingMethod: string;

  @Default(Constants.BILLING_METHOD.USD)
  @Column(DataType.ENUM(...Object.values(Constants.BILLING_METHOD)))
  nextBillingMethod: string;

  @Column(DataType.STRING(10))
  zipcode: string;

  @Column(DataType.BOOLEAN)
  isBusinessCreditCard: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isTest: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isStpAvailable: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isJeevesAddress: boolean;

  @Column(DataType.STRING)
  EIN: string;

  @Comment("Status of the company's EIN approval")
  @Default(Constants.EIN_APPROVAL_STATUS.NONE)
  @Column(DataType.ENUM(...Object.values(Constants.EIN_APPROVAL_STATUS)))
  approvalStatusEIN: string;

  @Default(null)
  @Column(DataType.INTEGER)
  businessType: number;

  @Column(DataType.STRING)
  otherBusinessType: string;

  @AllowNull(false)
  @Default(null)
  @Column(DataType.STRING)
  businessName: string;

  @Column(DataType.STRING)
  incorporationYear: string;

  @Column(DataType.STRING)
  incorporationState: string;

  @Column(DataType.STRING)
  businessDescription: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.TEXT)
  monthlySpend: string;

  @Column(DataType.STRING)
  referralCode: string;

  @Comment('Sum Of Users spentAmount')
  @Default(0.0)
  @Column(DataType.DECIMAL(30, 2))
  spentAmount: string;

  @Default(Constants.COMPANY_TWO_FACTOR_AUTH_STATUS.DISABLE)
  @AllowNull(false)
  @Column(
    DataType.ENUM(...Object.values(Constants.COMPANY_TWO_FACTOR_AUTH_STATUS)),
  )
  adminTwoFactorAuth: string;

  @AllowNull(false)
  @Default(Constants.COMPANY_TWO_FACTOR_AUTH_STATUS.DISABLE)
  @Column(
    DataType.ENUM(...Object.values(Constants.COMPANY_TWO_FACTOR_AUTH_STATUS)),
  )
  employeeTwoFactorAuth: string;

  @AllowNull(false)
  @Default(Constants.COMPANY_TWO_FACTOR_AUTH_STATUS.DISABLE)
  @Column(
    DataType.ENUM(...Object.values(Constants.COMPANY_TWO_FACTOR_AUTH_STATUS)),
  )
  bookkeeperTwoFactorAuth: string;

  @Default(Constants.STATUS.PENDING)
  @Column(DataType.ENUM(...Object.values(Constants.STATUS)))
  status: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.SMALLINT({ length: 4 }).UNSIGNED)
  platformCurrency: number;

  @HasMany(() => User)
  users: User[];
}
