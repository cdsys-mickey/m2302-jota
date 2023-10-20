import { AlertTitle } from "@mui/material";
import React from "react";
import AlertEx from "@/shared-components/AlertEx";

const ErrorBox = React.forwardRef(
	(
		{
			error,
			title = "讀取失敗",
			message = import.meta.env.VITE_PROFILE === "prod"
				? "(請稍後再試)"
				: null,
			...rest
		},
		ref
	) => {
		const showMessage = React.useMemo(() => {
			if (message) {
				return message;
			}
			return error?.message;
		}, [error?.message, message]);

		return (
			<AlertEx ref={ref} severity="error" flex={1} {...rest}>
				<AlertTitle>{title}</AlertTitle>
				{showMessage}
			</AlertEx>
		);
	}
);

export default React.memo(ErrorBox);
