import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../services/user.service';

@Injectable()
export class UserGqlAuthGuard implements CanActivate {
	/**
	 * @ignore
	 */
	constructor(private readonly userService: UserService) {}
	/**
	 * Function to guard graphql queries within NextAuth sessio provider
	 *
	 * @param  {ExecutionContext} context
	 */
	async canActivate(context: ExecutionContext) {
		//Es pot fer servir aqui el useSession de nextAuth.js?
		const ctx = GqlExecutionContext.create(context);
		const { req } = ctx.getContext();
		const bearerToken: string = req.headers.authorization;
		if (!bearerToken) throw new UnauthorizedException('Unauthorized');
		return true;
	}
}
