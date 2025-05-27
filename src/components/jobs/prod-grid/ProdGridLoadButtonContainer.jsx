import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import Objects from "@/shared-modules/Objects.mjs";
import { LoadingButton } from "@mui/lab";
import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import useDebounce from "../../../shared-hooks/useDebounce";

export const ProdGridLoadButtonContainer = (props) => {
	const { ...rest } = props;
	const criteria = useWatch();
	const debouncedCriteria = useDebounce(criteria, 300);
	const prodGrid = useContext(ProdGridContext);
	const { peek, totalElements, loading } = prodGrid;

	useChangeTracking(() => {
		peek(debouncedCriteria);
	}, [debouncedCriteria]);

	// const debouncedValues = useDebounce(criteria, 300);

	// const [prevJson, setPrevJson] = useState();

	// const debouncedJson = useMemo(() => {
	// 	return JSON.stringify(debouncedValues);
	// }, [debouncedValues]);

	// useEffect(() => {
	// 	if (debouncedJson !== prevJson) {
	// 		setPrevJson(debouncedJson);
	// 		console.log("criteria changed", debouncedValues);
	// 		peek(debouncedValues);
	// 	}
	// }, [peek, debouncedValues, prevJson, debouncedJson]);

	const buttonText = useMemo(() => {
		return Objects.isAllPropsEmpty(criteria)
			? "請先輸入篩選條件"
			: totalElements
				? `讀取資料(目前符合${totalElements}筆)`
				: "(查無相符商品)";
	}, [criteria, totalElements]);

	const disabled = useMemo(() => {
		return !totalElements;
	}, [totalElements]);

	return (
		<LoadingButton
			type="submit"
			disabled={disabled}
			size="small"
			loading={loading}
			sx={{
				fontWeight: 600,
			}}
			{...rest}>
			{buttonText}
		</LoadingButton>
	);
};

ProdGridLoadButtonContainer.displayName = "ProdGridLoadButtonContainer";
