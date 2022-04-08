import { ApiProperty } from '@nestjs/swagger';
export class UpdateSampleDto {
    @ApiProperty({
        description: 'firstName',
        example: 'john',
    })
    firstName: string;

    @ApiProperty({
        description: 'lastName',
        example: 'John',
    })
    lastName: string;

    @ApiProperty({
        description: 'dateOfBirth',
        example: '2021-05-05',
    })
    dateOfBirth: number;

    @ApiProperty({
        description: 'email',
        example: 'john@gmail.com',
    })
    email: string;
}
export default UpdateSampleDto;