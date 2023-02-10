import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    example: 'Learning',
  })
  name: string;
}

export class UpdateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    example: 'Improvement',
  })
  name: string;
}
