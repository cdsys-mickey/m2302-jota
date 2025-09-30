import { AuthContext } from "@/contexts/auth/AuthContext";
import toastEx from "@/helpers/toastEx";
import Settings from "@/modules/settings/Settings.mjs";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import useHttpPost from "@/shared-hooks/useHttpPost";
import Forms from "@/shared-modules/Forms.mjs";
import { differenceInYears } from "date-fns";
import Cookies from "js-cookie";
import queryString from "query-string";
import { useMemo, useCallback, useContext } from "react";

const DEFAULT_OPTS = {
	checkEvery: false,
	name: "",
};

export default function useJotaReports(props, opts = DEFAULT_OPTS) {
	const fromToPairs = useMemo(() => {
		if (Array.isArray(props)) {
			return props;
		} else {
			const { from, to } = props || {};
			if (from && to) {
				return [{ from, to }];
			}
			return [];
		}
	}, [props]);

	const month = useMemo(() => {
		if (!Array.isArray(props)) {
			return props?.month;
		}
		return undefined;
	}, [props]);

	const dialogs = useContext(DialogsContext);
	const { postToBlank } = useHttpPost();
	const { operator } = useContext(AuthContext);

	const send = useCallback(
		(url, data) => {
			const dontPrompt =
				Cookies.get(Settings.Keys.COOKIE_DOWNLOAD_PROMPT) == 0;

			postToBlank(
				queryString.stringifyUrl({
					url,
					query: {
						LogKey: operator.LogKey,
						...(!dontPrompt && { DontClose: 1 }),
					},
				}),
				{ jsonData: JSON.stringify(data) }
			);

			if (!dontPrompt && data.Action != 1 && data.Action != null) {
				dialogs.confirm({
					message:
						"首次下載必須進行瀏覽器設定，請問您的檔案有正確下載嗎?",
					checkLabel: "不要再提醒",
					check: true,
					defaultChecked: false,
					confirmText: "有",
					cancelText: "沒有",
					onConfirm: (params) => {
						if (params.checked) {
							Cookies.set(
								Settings.Keys.COOKIE_DOWNLOAD_PROMPT,
								0
							);
							dialogs.alert({
								message: Settings.MSG_REMIND,
								confirmText: "知道了",
							});
						}
					},
					onCancel: () => {
						toastEx.warn(Settings.MSG_INSTRUCT);
					},
				});
			}
		},
		[dialogs, operator.LogKey, postToBlank]
	);

	const isDateValidated = useCallback(
		(reportUrl, params, sendOpts) => {
			let anyFilled = false;
			let invalidRangePair = null;
			let emptyPairs = [];

			for (const pair of fromToPairs) {
				const fromVal = params[pair.from];
				const toVal = params[pair.to];

				if (!fromVal && !toVal) {
					emptyPairs.push(pair);
					continue;
				}

				anyFilled = true;

				if (fromVal && toVal) {
					const fromDate = Forms.parseDate(fromVal);
					const toDate = Forms.parseDate(toVal);
					if (!fromDate || differenceInYears(toDate, fromDate) > 0) {
						invalidRangePair = {
							from: fromVal,
							to: toVal,
						};
						break;
					}
				}
			}

			if (invalidRangePair) {
				dialogs.confirm({
					message: `「${invalidRangePair.from} - ${invalidRangePair.to}」的範圍超過一年，確定執行?`,
					onConfirm: () => {
						send(reportUrl, params, sendOpts);
					},
				});
				return false;
			}

			if (
				(fromToPairs.length > 0 && !opts.checkEvery && !anyFilled) ||
				(opts.checkEvery && emptyPairs.length > 0)
			) {
				dialogs.confirm({
					message: `${opts.name}日期區間${
						fromToPairs.length > 1 ? "皆" : ""
					}未輸入，確定執行?`,
					onConfirm: () => {
						send(reportUrl, params, sendOpts);
					},
				});
				return false;
			}

			if (month) {
				const monthString = params[month];
				if (!monthString) {
					dialogs.confirm({
						message: "未輸入資料年月，確定執行?",
						onConfirm: () => {
							send(reportUrl, params, sendOpts);
						},
					});
					return false;
				}
			}

			return true;
		},
		[dialogs, fromToPairs, month, opts.name, opts.checkEvery, send]
	);

	const open = useCallback(
		(reportUrl, data, opts) => {
			if (!isDateValidated(reportUrl, data, opts)) return;
			send(reportUrl, data, opts);
		},
		[isDateValidated, send]
	);

	return { open };
}
