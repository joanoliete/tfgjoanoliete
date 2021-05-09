
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class QueryCreateDto {
    departure_ap: string;
    arrival_ap: string;
    departure_date: DateTime;
    arrival_date?: DateTime;
    adults?: number;
}

export class FlightCreateDto {
    id: string;
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityTo: string;
    cityCodeFrom: string;
    cityCodeTo: string;
    utc_departure?: string;
    utc_arrival?: string;
    distance: number;
    route: RouteCreateDTO[];
    airlines: string[];
    price: number;
}

export class RouteCreateDTO {
    id?: string;
    flyFrom?: string;
    flyTo?: string;
    cityFrom?: string;
    cityCodeFrom?: string;
    cityTo?: string;
    cityCodeTo?: string;
    airline?: string;
    flight_no?: number;
    local_arrival?: string;
    utc_arrival?: string;
    local_departure?: string;
    utc_departure?: string;
}

export class TripCreateDto {
    name: string;
    description: string;
    destinations?: DestinationCreateDto[];
}

export class DestinationCreateDto {
    _id?: string;
    city: string;
    arrival_date: DateTime;
    flight_associated?: FlightCreateDto;
}

export class TripModifyDto {
    name?: string;
    description?: string;
    destinations?: DestinationModifyDto[];
}

export class DestinationModifyDto {
    _id?: string;
    city?: string;
    arrival_date?: DateTime;
}

export class Flight {
    id: string;
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityTo: string;
    cityCodeFrom: string;
    cityCodeTo: string;
    utc_departure?: string;
    utc_arrival?: string;
    distance: number;
    route: Route[];
    airlines: string[];
    price: number;
}

export class Route {
    id?: string;
    flyFrom?: string;
    flyTo?: string;
    cityFrom?: string;
    cityCodeFrom?: string;
    cityTo?: string;
    cityCodeTo?: string;
    airline?: string;
    flight_no?: number;
    local_arrival?: string;
    utc_arrival?: string;
    local_departure?: string;
    utc_departure?: string;
}

export class QueryObject {
    _id: string;
    departure_ap: string;
    arrival_ap: string;
    departure_date: DateTime;
    arrival_date?: DateTime;
    adults?: number;
}

export class Trip {
    _id: string;
    name: string;
    description: string;
    destinations: Destination[];
}

export class Destination {
    _id: string;
    city: string;
    arrival_date: DateTime;
    flight_associated?: Flight;
}

export class User {
    email: string;
    emailverified: boolean;
    createdAt: DateTime;
    udaptedAt: DateTime;
    savedFlights: Flight[];
    searchQueries: QueryObject[];
    userTrips: Trip[];
}

export abstract class IQuery {
    abstract getAllFlights(): Flight[] | Promise<Flight[]>;
    abstract favourite_flights_by_user_find_all(email: string): Flight[] | Promise<Flight[]>;
    abstract getAllUsers(): User[] | Promise<User[]>;
    abstract query_history_find_all_of_user(email: string): QueryObject[] | Promise<QueryObject[]>;
    abstract query_create_and_user_addition(context: QueryCreateDto, email?: string): Flight[] | Promise<Flight[]>;
    abstract automatize_queries(queries: string[]): Flight[] | Promise<Flight[]>;
    abstract trip_find_all_of_user(email: string): Trip[] | Promise<Trip[]>;
    abstract destination_find_all_of_user(email: string): Destination[] | Promise<Destination[]>;
}

export abstract class IMutation {
    abstract flight_create_and_user_addition(flightData: FlightCreateDto, email: string): boolean | Promise<boolean>;
    abstract user_favourite_flight_delete(id: string, email: string): boolean | Promise<boolean>;
    abstract user_history_query_delete(queryId: string, email: string): boolean | Promise<boolean>;
    abstract trip_create_and_user_addition(tripData: TripCreateDto, email: string): boolean | Promise<boolean>;
    abstract trip_modify(tripData: TripModifyDto, tripId: string): boolean | Promise<boolean>;
    abstract user_trip_delete(tripId: string, email: string): boolean | Promise<boolean>;
    abstract user_destination_add_flight_associated(flightData: FlightCreateDto, destinationId: string): boolean | Promise<boolean>;
    abstract user_trip_destination_delete(destinationId: string, tripId: string): boolean | Promise<boolean>;
}

export type DateTime = any;
