import { useWatch } from "react-hook-form";
import useDebounce from "@/shared-hooks/useDebounce";
import { useContext } from "react";
import { B031Context } from "@/contexts/B031/B031Context";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import Objects from "@/shared-modules/Objects";
import ButtonWrapper from "@/shared-components/ButtonWrapper";
import Constants from "@/modules/md-constants";

export const B031ImportProdsButtonContainer = (props) => {
	const { ...rest } = props;
	const criteria = useWatch();
	const b031 = useContext(B031Context);
	const {
		peekProds,
		importProdsWorking,
		ipState: { loading, totalElements },
	} = b031;

	const debouncedValues = useDebounce(criteria, 300);

	const [prevJson, setPrevJson] = useState();

	const debouncedJson = useMemo(() => {
		return JSON.stringify(debouncedValues);
	}, [debouncedValues]);

	useEffect(() => {
		if (debouncedJson !== prevJson) {
			setPrevJson(debouncedJson);
			console.log("criteria changed", debouncedValues);
			peekProds(debouncedValues);
		}
	}, [debouncedValues, prevJson, debouncedJson, peekProds]);

	const buttonText = useMemo(() => {
		return Objects.isAllPropsEmpty(criteria)
			? "請先輸入篩選條件"
			: totalElements
				? `帶入商品(目前符合${totalElements}筆)`
				: "(查無相符商品)";
	}, [criteria, totalElements]);

	const disabled = useMemo(() => {
		return !totalElements;
		// || totalElements > Constants.IMPORT_LIMIT
	}, [totalElements]);

	return (
		<ButtonWrapper
			type="submit"
			disabled={disabled}
			size="small"
			responsive
			loading={loading || importProdsWorking}
			sx={{
				fontWeight: 600,
			}}
			{...rest}>
			{buttonText}
		</ButtonWrapper>
	);
};

B031ImportProdsButtonContainer.displayName = "B031ImportProdsButtonContainer";


