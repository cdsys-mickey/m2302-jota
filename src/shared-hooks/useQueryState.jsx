import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * A custom hook to manage state with optional querystring synchronization, integrated with React Hook Form.
 * @param {any} initialState - The initial state (string, number, boolean, array, or object).
 * @param {Object} opts - Options object.
 * @param {boolean} opts.expose - Whether to sync state to querystring.
 * @param {string} [opts.key] - Querystring key for non-object states (required if initialState is not an object).
 * @param {Object} [form] - Optional React Hook Form instance (from useForm).
 * @returns {[any, Function]} - [state, setState]
 */
function useQueryState(initialState, opts = { expose: false }, form = null) {
	// Internal state
	const [state, setState] = useState(initialState);
	const [searchParams, setSearchParams] = useSearchParams();

	// Memoize isObject check
	const isObject = useMemo(
		() => initialState !== null && typeof initialState === 'object' && !Array.isArray(initialState),
		[initialState]
	);

	// Extract keys from initialState or opts.key
	const keys = useMemo(() => {
		return isObject ? Object.keys(initialState) : [opts.key]
	}, [initialState, isObject, opts.key]);

	// Validate key for non-object states
	if (!isObject && !opts.key) {
		throw new Error('opts.key is required for non-object initialState');
	}

	// Sync state to querystring and form
	useEffect(() => {
		if (opts.expose) {
			const newParams = new URLSearchParams(searchParams);

			if (isObject) {
				// Handle object state
				Object.entries(state).forEach(([key, value]) => {
					if (keys.includes(key)) {
						if (value !== undefined && value !== null && value !== '') {
							newParams.set(key, String(value));
						} else {
							newParams.delete(key);
						}
					}
				});
			} else {
				// Handle non-object state (string, number, boolean, array)
				if (state !== undefined && state !== null && state !== '') {
					const value = Array.isArray(state) ? state.join(',') : String(state);
					newParams.set(opts.key, value);
				} else {
					newParams.delete(opts.key);
				}
			}

			setSearchParams(newParams, { replace: true });

			// Sync state to form if provided
			if (form && form.setValue) {
				if (isObject) {
					Object.entries(state).forEach(([key, value]) => {
						if (keys.includes(key) && value !== form.getValues()[key]) {
							form.setValue(key, value, { shouldValidate: false });
						}
					});
				} else {
					const formValue = form.getValues()[opts.key];
					if (state !== formValue) {
						form.setValue(opts.key, state, { shouldValidate: false });
					}
				}
			}
		} else {
			// Remove managed keys from querystring
			const newParams = new URLSearchParams(searchParams);
			keys.forEach((key) => newParams.delete(key));
			setSearchParams(newParams, { replace: true });
		}
	}, [state, opts.expose, opts.key, keys, isObject, searchParams, setSearchParams, form]);

	// Sync querystring and form to state
	useEffect(() => {
		if (opts.expose) {
			let hasChanges = false;

			if (isObject) {
				const newState = { ...state };
				keys.forEach((key) => {
					const formValue = form && form.getValues ? form.getValues()[key] : null;
					const queryValue = searchParams.get(key);
					const newValue = formValue !== undefined && formValue !== null ? formValue : queryValue;

					if (newValue !== null && String(newValue) !== String(state[key])) {
						newState[key] =
							typeof initialState[key] === 'number'
								? Number(newValue)
								: typeof initialState[key] === 'boolean'
									? newValue === 'true' || newValue === true
									: newValue;
						hasChanges = true;
					} else if (newValue === null && state[key] !== initialState[key]) {
						newState[key] = initialState[key];
						hasChanges = true;
					}
				});
				if (hasChanges) {
					setState(newState);
				}
			} else {
				const formValue = form && form.getValues ? form.getValues()[opts.key] : null;
				const queryValue = searchParams.get(opts.key);
				let newValue = formValue !== undefined && formValue !== null ? formValue : queryValue;

				if (newValue !== null && String(newValue) !== String(state)) {
					let convertedValue;
					if (Array.isArray(initialState)) {
						convertedValue = newValue ? newValue.split(',') : initialState;
					} else if (typeof initialState === 'number') {
						convertedValue = Number(newValue);
					} else if (typeof initialState === 'boolean') {
						convertedValue = newValue === 'true' || newValue === true;
					} else {
						convertedValue = newValue;
					}

					if (String(convertedValue) !== String(state)) {
						setState(convertedValue);
						hasChanges = true;
					}
				} else if (newValue === null && state !== initialState) {
					setState(initialState);
					hasChanges = true;
				}
			}
		}
	}, [searchParams, opts.expose, opts.key, keys, isObject, initialState, state, form]);

	// Memoized setState function
	const updateState = useCallback(
		(newState) => {
			setState((prev) => {
				if (isObject) {
					const updated = typeof newState === 'function' ? newState(prev) : newState;
					const filteredState = {};
					keys.forEach((key) => {
						filteredState[key] = updated[key] ?? prev[key] ?? initialState[key];
					});
					return { ...prev, ...filteredState };
				}
				return typeof newState === 'function' ? newState(prev) : newState;
			});
		},
		[keys, isObject, initialState]
	);

	return [state, updateState];
}

export default useQueryState;