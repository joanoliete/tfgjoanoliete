
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class FlightCreateDto {
    url_reference: string;
    fly_from: string;
    fly_to: string;
    date_from: DateTime;
    date_to: DateTime;
    adults: number;
    children: number;
    price: number;
}

export class Flight {
    url_reference: string;
    fly_from: string;
    fly_to: string;
    date_from: DateTime;
    date_to: DateTime;
    adults: number;
    children: number;
    price: number;
}

export class User {
    email: string;
    emailverified: boolean;
    createdAt: DateTime;
    udaptedAt: DateTime;
    savedFlights: Flight[];
    searchQueries: string;
    userTrips: string;
}

export abstract class IQuery {
    abstract favourite_flights_by_user_find_all(email: string): Flight[] | Promise<Flight[]>;
    abstract getAllFlights(): Flight[] | Promise<Flight[]>;
    abstract getAllUsers(): User[] | Promise<User[]>;
}

export abstract class IMutation {
    abstract flight_create_and_user_addition(flightData: FlightCreateDto, email: string): boolean | Promise<boolean>;
}

export type DateTime = any;
