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

const defaultDepartureDate = DateFNS.addDays(new Date(), 1);
const defaultReturnDate = DateFNS.addDays(defaultDepartureDate, 2);

const defaultPlaces = {
	origin: {
		id: '',
		locationId: 'BCN',
		name: 'Barcelona International Airport',
		type: 'destination',
	},
	departure: {
		id: '',
		locationId: 'MAH',
		name: 'Menorca Airport',
		type: 'destination',
	},
};

export const defaultState: SearchContextState = {
	tripType: TRIP_TYPES.ONEWAY,
	travelFrom: defaultPlaces.origin,
	travelTo: defaultPlaces.departure,
	dateFrom: defaultDepartureDate,
	dateTo: defaultDepartureDate,
	//sortBy: 'QUALITY',
	//limit: 20,
	returnDateFrom: defaultReturnDate,
	returnDateTo: defaultReturnDate,
	adults: 1,
	//infants: 0,
	setTripType: () => undefined,
	setDepartureDate: () => undefined,
	setReturnDate: () => undefined,
	setTravelFrom: () => undefined,
	setTravelTo: () => undefined,
	setAdults: () => undefined,
};

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
	const [adults, setadults] = useState(defaultState.adults);
	const setTripType = (tripType: string) => settripType(tripType);
	const setDepartureDate = (dateFrom: Date) => setdateFrom(dateFrom);
	const setReturnDate = (dateTo: Date) => setdateTo(dateTo);
	const setTravelFrom = (travelFrom: Location) => settravelFrom(travelFrom);
	const setTravelTo = (travelTo: Location) => settravelTo(travelTo);
	const setAdults = (adults: number) => setadults(adults);

	return {
		tripType,
		travelFrom,
		travelTo,
		dateFrom,
		dateTo,
		returnDateFrom,
		returnDateTo,
		adults,
		setTripType,
		setDepartureDate,
		setReturnDate,
		setTravelFrom,
		setTravelTo,
		setAdults,
	} as SearchContextState;
};

export const SearchContext = createContext<SearchContextState>(defaultState);
