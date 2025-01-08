import { toastEx } from "@/helpers/toast-ex";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useCallback, useContext } from "react";

export default function useDebugDialog() {
	const dialogs = useContext(DialogsContext);

	const copyToClipboard = useCallback((message) => {
		navigator.clipboard.writeText(message);
		toastEx.info("報表資訊已複製到剪貼簿");
	}, []);

	const show = useCallback(({ data, url, title = "報表資訊" }) => {
		const message =
			"呼叫網址:\n" +
			`\t${url}\n` +
			" \n" +
			"使用參數:\n" +
			JSON.stringify(data, null, 2);

		dialogs.create({
			title: title,
			onConfirm: () => {
				copyToClipboard(message);
			},
			confirmText: "複製到剪貼簿",
			confirmButtonProps: {
				startIcon: <ContentCopyIcon />,
			},
			buttonProps: {
				color: "secondary",
			},
			children: (
				<div>
					<b>呼叫網址:</b>
					<ul style={{ listStyle: "none" }}>
						<li>{url}</li>
					</ul>
					<br />
					<b>使用參數:</b>
					<ul style={{ listStyle: "none" }}>
						<li>
							<pre>
								{JSON.stringify(data, null, 2)}
							</pre>
						</li>
					</ul>
				</div>
			),
		});
	}, [copyToClipboard, dialogs]);

	return {
		show
	}

}