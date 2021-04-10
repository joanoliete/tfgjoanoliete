export interface SearchContextState {
	StateParams: StateParams;
	actions: StateActions;
}

export interface StateParams {
	travelFrom: ReadonlyArray<Location>;
	travelTo: ReadonlyArray<Location>;
	isNightsInDestinationSelected: boolean;
	nightsInDestinationFrom: number;
	nightsInDestinationTo: number;
	dateFrom: Date;
	sortBy: string;
	limit: number;
	dateTo: Date;
	returnDateFrom: Date;
	returnDateTo: Date;
	tripType: string;
	infants: number;
	adults: number;
}

export interface StateActions {
	switchFromTo: () => void;
	setDepartureDate: (dateFrom: Date, dateTo: Date) => void;
	setReturnDate: (dateFrom: Date, dateTo: Date) => void;
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
