// import useAxiosService from "./useAxiosService";
import useAxiosServiceDotNet from "./useAxiosServiceDotNet";

export const RefreshMode = Object.freeze({
	REFRESH: Symbol(1),
	DONT: Symbol(0),
	AUTO: Symbol(-1),
});

const useApiService = (props) => {
	return useAxiosServiceDotNet({
		...props,
	});
	// return useAxiosService({
	// 	...props,
	// });
};

export default useApiService;
