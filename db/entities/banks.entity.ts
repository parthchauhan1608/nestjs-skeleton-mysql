import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'banks',
})
export class Bank extends Model {
  @Column(DataType.STRING)
  bankName: string;

  @Column(DataType.INTEGER)
  institutionNumber: number;
}
