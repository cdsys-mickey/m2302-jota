import { LoadingButton } from "@mui/lab";
import { useMemo } from "react";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";

export const A011LoadingButtonContainer = () => {
	const values = useWatch();
	useEffect(() => {
		console.debug("values changed", values);
	}, [values]);

	const buttonText = useMemo(() => {
		return "讀取資料";
	}, []);
	return (
		<LoadingButton
			type="submit"
			variant="contained"
			// size="small"
			fullWidth>
			{buttonText}
		</LoadingButton>
	);
};

A011LoadingButtonContainer.displayName = "A011LoadingButtonContainer";
