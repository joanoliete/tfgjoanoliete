
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Flight {
    _id: string;
    createdAt?: number;
}

export abstract class IQuery {
    abstract flights_favourites_by_user_find_all(userId: string): Flight[] | Promise<Flight[]>;
}
