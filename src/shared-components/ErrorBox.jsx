import AlertEx from "@/shared-components/AlertEx";
import { AlertTitle } from "@mui/material";
import { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";

const ErrorBox = memo(
	forwardRef(
		(
			{
				error,
				title = "讀取失敗",
				message,
				defaultMessage = "(請稍後再試)",
				...rest
			},
			ref
		) => {
			const displayedMessage = useMemo(() => {
				return message || error?.message || defaultMessage;
			}, [defaultMessage, error?.message, message]);

			return (
				<AlertEx ref={ref} severity="error" flex={1} {...rest}>
					<AlertTitle>{title}</AlertTitle>
					{displayedMessage}
				</AlertEx>
			);
		}
	)
);

ErrorBox.propTypes = {
	error: PropTypes.object,
	title: PropTypes.string,
	defaultMessage: PropTypes.string,
	message: PropTypes.string,
};
export default ErrorBox;
