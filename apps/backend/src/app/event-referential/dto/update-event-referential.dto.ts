import { PartialType } from '@nestjs/mapped-types';
import { CreateEventReferentialDto } from './create-event-referential.dto';

export class UpdateEventReferentialDto extends PartialType(CreateEventReferentialDto) {}
