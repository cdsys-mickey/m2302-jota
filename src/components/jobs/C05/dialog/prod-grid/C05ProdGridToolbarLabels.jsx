import { C05Context } from "@/contexts/C05/C05Context";
import Strings from "@/modules/md-strings";
import DSGToolbar from "@/shared-components/dsg/DSGToolbar";
import { DSGToolbarLabel } from "@/shared-components/dsg/DSGToolbarLabel";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { memo, useContext } from "react";
import { useFormContext } from "react-hook-form";

const C05ProdGridToolbarLabels = memo(() => {
	const c05 = useContext(C05Context);
	const form = useFormContext();

	return (
		<DSGToolbar>
			<DSGToolbarLabel label="外加稅額" name="TaxAmt" sx={{ minWidth: "9rem" }} />
			<DSGToolbarLabel label="總計金額" name="TotAmt" sx={{ minWidth: "9rem" }} />
			<TextFieldWrapper
				typo
				slotProps={{
					label: {
						flex: true,
						inline: true,
						sx: {
							minWidth: "9rem"
						},
						labelProps: {
							variant: "body1",
						}
					},
				}}
				inline
				dense
				name="RecvAmt"
				label="已收金額："
				type="number"
				renderLabel={Strings.formatPrice}
				sx={{
					width: "9rem",

				}}
				onChange={c05.handleRecvAmtChange({ setValue: form.setValue, getValues: form.getValues })}
			/>
			<DSGToolbarLabel label="應付減額" name="RtnAmt" sx={{ minWidth: "9rem" }} />

		</DSGToolbar>
	);
});
C05ProdGridToolbarLabels.displayName = "C05ProdGridToolbarLabels";
export default C05ProdGridToolbarLabels;
