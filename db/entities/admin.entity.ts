import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'admins',
})
export class Admin extends Model {
    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @Column(DataType.STRING)
    email: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING)
    setPasswordToken: string;

    @Column(DataType.STRING)
    resetPasswordToken: string;

    @Column(DataType.STRING)
    resetPasswordExpiresIn: string;
}
