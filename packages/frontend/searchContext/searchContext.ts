import withApollo from '../lib/apollo/apolloClient';
import React, { createContext, FC, Provider, useEffect, useState } from 'react';
import Head from '../components/utils/head';
import * as DateFNS from 'date-fns';
import {
	ParseFieldsParams,
	Location,
	TRIP_TYPES,
	SearchContextState,
} from './searchContextTypes';
import { getParser, PARSER_CONFIG } from '.';

const defaultDepartureDate = DateFNS.addDays(new Date(), 1);
const defaultReturnDate = DateFNS.addDays(defaultDepartureDate, 2);

const defaultPlaces = {
	origin: {
		id: 'TG9jYXRpb246cHJhZ3VlX2N6',
		locationId: 'prague_cz',
		name: 'Prague',
		type: 'destination',
	},
	departure: {
		id: 'TG9jYXRpb246b3Nsb19ubw==',
		locationId: 'oslo_no',
		name: 'Oslo',
		type: 'destination',
	},
};

export const defaultState: SearchContextState = {
	tripType: TRIP_TYPES.ONEWAY,
	travelFrom: defaultPlaces.origin,
	travelTo: defaultPlaces.departure,
	//isNightsInDestinationSelected: false,
	//nightsInDestinationFrom: 3,
	//nightsInDestinationTo: 6,
	dateFrom: defaultDepartureDate,
	dateTo: defaultDepartureDate,
	//sortBy: 'QUALITY',
	//limit: 20,
	returnDateFrom: defaultReturnDate,
	returnDateTo: defaultReturnDate,
	//adults: 1,
	//infants: 0,
	setTripType: () => undefined,
	setDepartureDate: () => undefined,
	setReturnDate: () => undefined,
	setTravelFrom: () => undefined,
	setTravelTo: () => undefined,
};

//Other way of making searchContext?
export const SearchContextProvider = () => {
	const [tripType, settripType] = useState(defaultState.tripType);
	const [travelFrom, settravelFrom] = useState(defaultState.travelFrom);
	const [travelTo, settravelTo] = useState(defaultState.travelTo);
	const [dateFrom, setdateFrom] = useState(defaultState.dateFrom);
	const [dateTo, setdateTo] = useState(defaultState.dateTo);
	const [returnDateFrom, setreturnDateFrom] = useState(
		defaultState.returnDateFrom
	);
	const [returnDateTo, setreturnDateTo] = useState(defaultState.returnDateTo);
	const setTripType = (tripType: string) => settripType(tripType);
	const setDepartureDate = (dateFrom: Date) => setdateFrom(dateFrom);
	const setReturnDate = (dateTo: Date) => setdateTo(dateTo);
	const setTravelFrom = (travelFrom: Location) => settravelFrom(travelFrom);
	const setTravelTo = (travelTo: Location) => settravelTo(travelTo);

	function getDefaultState(routerQuery?: ParseFieldsParams) {
		const derivedStateFromURL = parseURLqueryToState(routerQuery);
		return {
			...defaultState,
			...derivedStateFromURL,
		};
	}

	function parseURLqueryToState(query: any) {
		const queryKeys = Object.keys(query);

		return queryKeys.reduce((acc, key) => {
			const parserType = PARSER_CONFIG[key];
			if (parserType) {
				const parser = getParser(parserType);

				return { [key]: parser(query[key]), ...acc };
			}
			return acc;
		}, {});
	}

	return {
		tripType,
		travelFrom,
		travelTo,
		dateFrom,
		dateTo,
		returnDateFrom,
		returnDateTo,
		setTripType,
		setDepartureDate,
		setReturnDate,
		setTravelFrom,
		setTravelTo,
	} as SearchContextState;
};

export const SearchContext = createContext<SearchContextState>(defaultState);
