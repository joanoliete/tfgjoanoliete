import { Controller, Get } from '@nestjs/common';
import { QueryService } from '../services/query.service';

@Controller('query')
export class QueryController {
	constructor(private readonly queryService: QueryService) {}
}
