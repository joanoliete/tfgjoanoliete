/**
 * Email validation
 * @param value Email to validate
 * @returns Is valid
 */
export const emailValidation = (value: string): boolean => {
	const email = value.trim();
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (email.length < 6) return false;
	if (!email.match(regex)) return false;

	return true;
};

/**
 * Name validation
 *
 * - Minimum length 1 character
 * @param value Value to validate
 * @returns Is valid
 */
export const nameValidation = (name: string): boolean => {
	if (name.length < 1) return false;

	return true;
};

/**
 * Name validation
 *
 * - Minimum length 1 character
 * @param value Value to validate
 * @returns Is valid
 */
export const descriptionValidation = (description: string): boolean => {
	if (description.length < 1) return false;

	return true;
};
