
import Types from "@/shared-modules/Types.mjs";
import { useCallback } from "react";

const DEFAULT_FILENAME = "downloaded_file";

export default function useBlob() {
	/**
	 * 觸發下載
	 */
	const invokeDownload = useCallback(async (response, opts = {}) => {
		const { fileName } = opts;

		const _fileName = fileName
			? (Types.isFunction(fileName) ? fileName(response) : fileName)
			: getFileNameFromDisposition(response);

		let blob = null;
		// fetch response
		if (response instanceof Response) {
			blob = await response.blob()
		} else {
			// axios or WebApiResult
			if (!response.data && !response.payload) {
				throw "no blob detected";
			}
			blob = new Blob([response.data ?? response.payload]);
		}

		// 建立虛擬 object url
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = _fileName;
		document.body.appendChild(link);
		// 點擊
		link.click();
		// 回收 object url
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	}, [getFileNameFromDisposition]);

	const getFileNameFromDisposition = useCallback((response) => {
		let fileName = DEFAULT_FILENAME;
		if (!response.headers) {
			console.error("沒有找到 headers 屬性, 確認是否已將回應 headers 選項打開");
		}
		const disposition = response.headers?.['content-disposition'];
		if (disposition && disposition.toLowerCase().includes('filename')) {
			// 優先檢查 filename* (RFC 5987 格式)
			const matchesStar = disposition.match(/filename\*=UTF-8''([^;\s]+)/);
			if (matchesStar && matchesStar[1]) {
				fileName = decodeURIComponent(matchesStar[1]);
			} else {
				// 處理 filename (有或無雙引號)
				const matches = disposition.match(/filename=(?:"([^"]+)"|([^;\s]+))/);
				if (matches && (matches[1] || matches[2])) {
					fileName = decodeURIComponent(matches[1] || matches[2]);
				}
			}
		}
		console.log("extracted filename=", fileName)
		return fileName;
	}, []);

	return {
		invokeDownload,
		getFileNameFromDisposition
	}

}