import { BContext } from "@/contexts/B/BContext";
import { B012Context } from "@/contexts/B012/B012Context";
import { B032Context } from "@/contexts/B032/B032Context";
import { ButtonEx } from "@/shared-components";
import useDebounce from "@/shared-hooks/useDebounce";
import Objects from "@/shared-modules/Objects.mjs";
import { useContext, useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";

export const B032ImportCustsButtonContainer = (props) => {
	const { ...rest } = props;
	const criteria = useWatch();
	const b = useContext(BContext);
	const b032 = useContext(b.forNew ? B032Context : B012Context);
	const {
		peekCusts,
		importCustsWorking,
		ipState: { loading, totalElements },
	} = b032;

	const debouncedValues = useDebounce(criteria, 300);

	const [prevJson, setPrevJson] = useState();

	const debouncedJson = useMemo(() => {
		return JSON.stringify(debouncedValues);
	}, [debouncedValues]);

	useEffect(() => {
		if (debouncedJson !== prevJson) {
			setPrevJson(debouncedJson);
			console.log("criteria changed", debouncedValues);
			peekCusts(debouncedValues);
		}
	}, [debouncedValues, prevJson, debouncedJson, peekCusts]);

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
		<ButtonEx
			type="submit"
			disabled={disabled}
			size="small"
			responsive
			loading={loading || importCustsWorking}
			sx={{
				fontWeight: 600,
			}}
			{...rest}>
			{buttonText}
		</ButtonEx>
	);
};

B032ImportCustsButtonContainer.displayName = "B032ImportCustsButtonContainer";



