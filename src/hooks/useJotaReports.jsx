import { AuthContext } from "@/contexts/auth/AuthContext";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useContext } from "react";
import { useCallback, useState } from "react";
import queryString from "query-string";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { differenceInYears } from "date-fns";
import Forms from "@/shared-modules/sd-forms";

export default function useJotaReports(props) {
	const { from, to } = props || {};

	// const [reportUrl, setReportUrl] = useState();
	// const [formData, setFormData] = useState();
	// const [data, setData] = useState();

	const dialogs = useContext(DialogsContext);
	const { postToBlank } = useHttpPost();
	const { operator } = useContext(AuthContext);

	const send = useCallback((url, params) => {
		// const _url = url || data?.url;
		// const _params = params || data?.params;
		postToBlank(
			queryString.stringifyUrl({
				url: url,
				query: {
					LogKey: operator.LogKey
				}
			}),
			{
				jsonData: JSON.stringify(params),
			}
		);
	}, [operator.LogKey, postToBlank]);

	const isDateValidated = useCallback((reportUrl, params) => {
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
							send(reportUrl, params);
						}
					});
					return false;
				}
			}

		}
		return true;
	}, [dialogs, from, send, to]);

	const open = useCallback((reportUrl, params) => {
		// setData({
		// 	url: reportUrl,
		// 	params: params
		// })

		if (isDateValidated(reportUrl, params)) {
			send(reportUrl, params);
		}

	}, [isDateValidated, send]);

	return {
		open
	}

}