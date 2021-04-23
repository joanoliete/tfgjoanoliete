import { FlightCreateDto } from '../dto/flight-create.dto';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

//Falta validar tots els camps
@Injectable()
export class FlightCreatePipe implements PipeTransform {
	transform(value: FlightCreateDto): FlightCreateDto {
		const errors = [];

		if (errors.length > 0) {
			throw new BadRequestException(errors.join('. '));
		}

		return value;
	}
}
