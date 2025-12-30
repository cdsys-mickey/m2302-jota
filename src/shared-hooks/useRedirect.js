/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import querystring from "query-string";
import { useContext } from "react";
import { ConfigContext } from "shared-components/config";

/**
 * 配合 rr6 修改
 */
const useRedirect = () => {
	const navigate = useNavigate();
	const config = useContext(ConfigContext);

	/**
	 * deprecated
	 */
	const getFullPath = useCallback((path, isRelative, params) => {
		let result = isRelative
			? // ? `${import.meta.env.VITE_PUBLIC_URL}${
			  `${config.PUB_URL}/${path.startsWith("/") ? "" : "/"}${path}`
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
		(path, { params, replace = false, timeout = -1, ...rest } = {}) => {
			const fullPath = buildPath(path, params);
			console.log(`redirecting to ${fullPath}`);
			if (timeout > -1) {
				return setTimeout(() => {
					navigate(fullPath, {
						replace: replace,
						...rest,
					});
				}, timeout);
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
