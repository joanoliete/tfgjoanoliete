import qs from 'qs';
import { Location } from './searchContextTypes';

type ParserType = 'Location' | 'Date' | 'number' | 'string' | 'boolean';

export const PARSER_CONFIG = {
	travelFrom: 'Location',
	travelTo: 'Location',
	travelFromName: 'string',
	travelToName: 'string',
	sortBy: 'string',
	limit: 'number',
	adults: 'number',
	infants: 'number',
	dateFrom: 'Date',
	dateTo: 'Date',
	returnDateFrom: 'Date',
	returnDateTo: 'Date',
	bookingToken: 'string',
	tripType: 'string',
	nightsInDestinationFrom: 'number',
	nightsInDestinationTo: 'number',
	isNightsInDestinationSelected: 'boolean',
};

export function getParser(parserType: ParserType) {
	switch (parserType) {
		case 'Location': {
			return locationParser;
		}
		case 'Date': {
			return dateParser;
		}
		case 'string': {
			return stringParser;
		}
		case 'number': {
			return numberParser;
		}
		case 'boolean': {
			return booleanParser;
		}
		default: {
			return (value: any) => value;
		}
	}
}

//Testejar si funciona
export function locationParser(query: string) {
	const locationsObject = qs.parse(query) as any;
	const locationsArray = Object.keys(locationsObject).map<Location>(
		key => locationsObject[key]
	);
	return locationsArray;
}

function dateParser(date: string) {
	return new Date(date);
}

function numberParser(number: string) {
	return parseInt(number, 10);
}

function stringParser(string: string) {
	return string;
}

function booleanParser(boolean: boolean) {
	return boolean;
}
