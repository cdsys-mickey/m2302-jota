import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useContext } from "react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function useDebugDialog() {
	const dialogs = useContext(DialogsContext);

	const copyToClipboard = useCallback((message) => {
		navigator.clipboard.writeText(message);
		toast.info("報表資訊已複製到剪貼簿");
	}, []);

	const show = useCallback(({ data, url }) => {
		const message =
			"呼叫網址:\n" +
			`\t${url}\n` +
			" \n" +
			"使用參數:\n" +
			JSON.stringify(data, null, 2);

		dialogs.create({
			title: "報表",
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
						<li>{JSON.stringify(data, null, 2)}</li>
					</ul>
				</div>
			),
		});
	}, [copyToClipboard, dialogs]);

	return {
		show
	}

}