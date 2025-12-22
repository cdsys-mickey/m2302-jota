function addEntries(map, obj, opts = { clear: false }) {
	if (opts.clear) {
		map.clear();
	}
	Object.entries(obj).forEach(([key, value]) => {
		map.set(key, value);
	});
}

function resetEntries(map, obj) {
	addEntries(map, obj, { clear: true });
}

function resetEntriesByRef(mapRef, obj) {
	mapRef.current = new Map(Object.entries(obj));
}

function isEmpty(map) {
	return map.size === 0;
}

const Maps = {
	addEntries,
	resetEntries,
	resetEntriesByRef,
	isEmpty,
};

export default Maps;
