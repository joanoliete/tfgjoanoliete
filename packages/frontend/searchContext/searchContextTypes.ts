export type SearchContextState = StateParamsType & StateActionsType;

export interface StateParamsType {
	tripType: string;
	travelFrom: Location;
	travelTo: Location;
	dateFrom: Date;
	//sortBy: string;
	//limit: number;
	dateTo: Date;
	returnDateFrom: Date;
	returnDateTo: Date;
	//infants: number;
	adults: number;
}

export interface StateActionsType {
	setTripType: (tripType: string) => void;
	setDepartureDate: (dateFrom: Date) => void;
	setReturnDate: (dateTo: Date) => void;
	setTravelFrom: (travelFrom: Location) => void;
	setTravelTo: (travelTo: Location) => void;
	setAdults: (adults: number) => void;
}

export interface Passengers {
	adults: number;
	infants: number;
}

export interface ParseFieldsParams {
	adults?: string;
	dateFrom?: string;
	dateTo?: string;
	infants?: string;
	nightsInDestinationFrom?: number;
	nightsInDestinationTo?: number;
	returnDateFrom?: string;
	returnDateTo?: string;
	travelFrom?: string;
	travelTo?: string;
}

export interface Location {
	id: string | number;
	locationId: string;
	name: string;
	type: string;
}

export const TRIP_TYPES = {
	RETURN: 'Return',
	ONEWAY: 'OneWay',
};
