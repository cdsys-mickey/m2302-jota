/* eslint-disable no-mixed-spaces-and-tabs */

const transformForReading = (payload) => {
	return Object.entries(payload).map(([id, label]) => ({ id, label }));
};

const transformForGridSubmit = (payload) => {
	return payload.reduce((obj, { id, label }) => {
		obj[id] = label;
		return obj;
	}, {});
};

const UserSettingEditors = {
	transformForReading,
	transformForGridSubmit,
};

export default UserSettingEditors;
