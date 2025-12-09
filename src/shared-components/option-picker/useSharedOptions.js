import { useContext } from "react";
import { useCallback, useState } from "react";
import { SharedOptionsContext } from "./SharedOptionsContext";
import { useMemo } from "react";
import { useInit } from "@/shared-hooks/useInit";
import consoleEx from "@/helpers/consoleEx";

export default function useSharedOptions({
	sharedKey,
	defaultOptions,
	onInit,
	onChanged,
}) {
	const [selfOptions, setSelfOptions] = useState(defaultOptions);
	const sharedContext = useContext(SharedOptionsContext);
	const isUseSharedOptions = useMemo(() => {
		return !!sharedContext && !!sharedKey;
	}, [sharedContext, sharedKey]);

	const setOptions = useCallback(
		(newOptions) => {
			if (sharedKey && !sharedContext) {
				consoleEx.error("未發現 SharedContext");
			}
			if (isUseSharedOptions) {
				sharedContext.updateOptions(sharedKey, newOptions);
			} else {
				setSelfOptions(newOptions);
			}
			if (onChanged) {
				onChanged(newOptions);
			}
		},
		[isUseSharedOptions, onChanged, sharedContext, sharedKey]
	);

	const _options = useMemo(() => {
		return isUseSharedOptions
			? sharedContext.getOptions(sharedKey)
			: selfOptions;
	}, [isUseSharedOptions, selfOptions, sharedContext, sharedKey]);

	const resetOptions = useCallback(
		({ includes, excludes } = {}) => {
			sharedContext.resetOptions({ includes, excludes });
		},
		[sharedContext]
	);

	useInit(() => {
		if (
			isUseSharedOptions &&
			onInit &&
			sharedContext.hasOptions(sharedKey)
		) {
			onInit(sharedContext.getOptions(sharedKey));
		}
	}, []);

	return [_options, setOptions, resetOptions];
}
