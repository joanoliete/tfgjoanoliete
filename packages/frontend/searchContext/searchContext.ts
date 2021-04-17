import withApollo from '../lib/apollo/apolloClient';
import React, { createContext, FC, Provider, useEffect, useState } from 'react';
import Head from '../components/utils/head';
import * as DateFNS from 'date-fns';
import {
	ParseFieldsParams,
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
	isNightsInDestinationSelected: false,
	nightsInDestinationFrom: 3,
	nightsInDestinationTo: 6,
	dateFrom: defaultDepartureDate,
	dateTo: defaultDepartureDate,
	sortBy: 'QUALITY',
	limit: 20,
	returnDateFrom: defaultReturnDate,
	returnDateTo: defaultReturnDate,
	adults: 1,
	infants: 0,
	switchFromTo: () => null,
	setDepartureDate: () => null,
	setReturnDate: () => null,
	setTravelFrom: () => null,
	setTravelTo: () => null,
};

//Other way of making searchContect?
const SearchContextProvider = ({ children }) => {
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
};

export const SearchContext = createContext<SearchContextState>(defaultState);
