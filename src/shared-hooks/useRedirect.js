import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import querystring from "query-string";

/**
 * 配合 rr6 修改
 */
const useRedirect = () => {
	const navigate = useNavigate();

	/**
	 * deprecated
	 */
	const getFullPath = useCallback((path, isRelative, params) => {
		let result = isRelative
			? `${import.meta.env.VITE_PUBLIC_URL}${
					path.startsWith("/") ? "" : "/"
			  }${path}`
			: path;
		result = `${result}${
			params ? "?" + querystring.stringify(params) : ""
		}`;
		return result;
	}, []);

	const buildPath = useCallback((path, params) => {
		return `${path}${params ? "?" + querystring.stringify(params) : ""}`;
	}, []);

	const redirectStub = useCallback(
		(path, { params, replace = false, interval = -1, ...rest } = {}) => {
			const fullPath = buildPath(path, params);
			console.log(`redirecting to ${fullPath}`);
			if (interval > -1) {
				return setInterval(() => {
					navigate(fullPath, {
						replace: replace,
						...rest,
					});
				}, interval);
			} else {
				navigate(fullPath, {
					replace: replace,
				});
			}
		},
		[buildPath, navigate]
	);

	const redirectTo = useCallback(
		(path, redirectParams) => {
			return redirectStub(path, {
				replace: true,
				...redirectParams,
			});
		},
		[redirectStub]
	);

	const redirectToExternal = useCallback(
		(path, { params } = {}) => {
			const fullPath = buildPath(path, params);
			window.location.href = fullPath;
		},
		[buildPath]
	);

	return {
		redirectTo,
		redirectToExternal,
		getFullPath,
	};
};

export default useRedirect;
