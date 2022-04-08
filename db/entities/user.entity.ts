import {
  AllowNull,
  Column,
  DataType,
  Default,
  Index,
  Model,
  Table,
  Comment,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Constants from '../../constants/model';
import { Company } from './company.entity';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  freezeTableName: false,
})
export class User extends Model {
  @AllowNull(false)
  @Index
  @ForeignKey(() => Company)
  @Column(DataType.INTEGER.UNSIGNED)
  companyId: string;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @AllowNull(true)
  @Column(DataType.DATEONLY)
  dateOfBirth: Date;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING)
  countryCallingCode: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING)
  phoneNumber: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Default(Constants.ROLE.ADMIN)
  @Column(DataType.ENUM(...Object.values(Constants.ROLE)))
  role: string;

  @Default(0.0)
  @Comment('Sum of cards spentAmount')
  @Column(DataType.DECIMAL(30, 2))
  spentAmount: string;

  @Default(0.0)
  @Comment('Spending Limit')
  @Column(DataType.DECIMAL(30, 2).UNSIGNED)
  spendLimit: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isSetSpendLimit: boolean;

  @Column(DataType.STRING)
  qrCodeUrl: string;

  @Column(DataType.STRING)
  twoFactorAuthSecret: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isTwoFactorAuth: boolean;

  @Default(Constants.STATUS.PENDING)
  @Column(DataType.ENUM(...Object.values(Constants.STATUS)))
  status: string;

  @Column(DataType.STRING)
  resetPasswordToken: string;

  @Column(DataType.STRING)
  resetPasswordExpiresIn: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isDeletedForce: boolean;

  @BelongsTo(() => Company)
  company: Company;
}
