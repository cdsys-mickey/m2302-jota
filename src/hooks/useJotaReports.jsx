import { AuthContext } from "@/contexts/auth/AuthContext";
import { toastEx } from "@/helpers/toast-ex";
import Settings from "@/modules/settings/Settings.mjs";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import useHttpPost from "@/shared-hooks/useHttpPost";
import Forms from "@/shared-modules/sd-forms";
import { differenceInYears } from "date-fns";
import Cookies from "js-cookie";
import queryString from "query-string";
import { useCallback, useContext } from "react";


export default function useJotaReports(props) {
	const { from, to, month } = props || {};

	// const [reportUrl, setReportUrl] = useState();
	// const [formData, setFormData] = useState();
	// const [data, setData] = useState();

	const dialogs = useContext(DialogsContext);
	const { postToBlank } = useHttpPost();
	const { operator } = useContext(AuthContext);


	const send = useCallback((url, data, opts = {}) => {
		const dontPrompt = Cookies.get(Settings.Keys.COOKIE_DOWNLOAD_PROMPT) == 0;
		postToBlank(
			queryString.stringifyUrl({
				url: url,
				query: {
					LogKey: operator.LogKey,
					...((!dontPrompt) && {
						DontClose: 1
					})
				}
			}),
			{
				jsonData: JSON.stringify(data),
			}
		);


		if (!dontPrompt && data.Action != 1) {
			dialogs.confirm({
				message: "首次下載必須進行瀏覽器設定，請問您的檔案有正確下載嗎?",
				checkLabel: "不要再提醒",
				check: true,
				defaultChecked: false,
				confirmText: "有",
				cancelText: "沒有",
				onConfirm: (params) => {
					console.log("params", params);
					if (params.checked) {
						Cookies.set(Settings.Keys.COOKIE_DOWNLOAD_PROMPT, 0);
						dialogs.alert({
							message: Settings.MSG_REMIND,
							confirmText: "知道了"
						});
					}
				},
				onCancel: (params) => {
					// if (params.value === "ON") {
					// 	Cookies.set(COOKIE_DOWNLOAD_PROMPT, 0);
					// }
					toastEx.warn(Settings.MSG_INSTRUCT);
				}
			})
		}

	}, [dialogs, operator.LogKey, postToBlank]);

	const isDateValidated = useCallback((reportUrl, params, opts) => {
		if (from && to) {
			const fromDateString = params[from];
			const toDateString = params[to];
			if (!fromDateString && !toDateString) {
				dialogs.confirm({
					message: "未輸入日期區間，確定執行?",
					onConfirm: () => {
						send(reportUrl, params);
					}
				});
				return false;
			} else if (toDateString) {
				const fromDate = Forms.parseDate(fromDateString);
				const toDate = Forms.parseDate(toDateString);
				if (!fromDate || differenceInYears(toDate, fromDate) > 0) {
					dialogs.confirm({
						message: "您輸入的日期區間超過一年，確定執行?",
						onConfirm: () => {
							send(reportUrl, params, opts);
						}
					});
					return false;
				}
			}

		} else if (month) {
			const monthString = params[month];
			if (!monthString) {
				dialogs.confirm({
					message: "未輸入資料年月，確定執行?",
					onConfirm: () => {
						send(reportUrl, params);
					}
				});
				return false;
			}
		}
		return true;
	}, [dialogs, from, month, send, to]);

	const open = useCallback((reportUrl, data, opts) => {
		if (!isDateValidated(reportUrl, data, opts)) {
			return;
		}
		send(reportUrl, data, opts);
	}, [isDateValidated, send]);

	return {
		open
	}

}