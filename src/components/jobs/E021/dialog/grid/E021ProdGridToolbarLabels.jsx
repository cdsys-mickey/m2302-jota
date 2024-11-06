import { E021Context } from "@/contexts/E021/E021Context";
import Strings from "@/modules/md-strings";
import DSGToolbar from "@/shared-components/dsg/DSGToolbar";
import { DSGToolbarLabel } from "@/shared-components/dsg/DSGToolbarLabel";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { memo, useContext } from "react";
import { useFormContext } from "react-hook-form";

const E021ProdGridToolbarLabels = memo(() => {
	const e021 = useContext(E021Context);
	const form = useFormContext();

	return (
		<DSGToolbar>
			<DSGToolbarLabel label="銷貨" name="SalAmt" sx={{ minWidth: "9rem" }} />
			<DSGToolbarLabel label="稅額" name="TaxAmt" sx={{ minWidth: "9rem" }} />
			<DSGToolbarLabel label="總計" name="TotAmt" sx={{ minWidth: "9rem" }} />
			{/* <DSGToolbarLabel label="已收" name="RecdAmt" sx={{ minWidth: "9rem" }} /> */}
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
				name="RecdAmt"
				label="已收："
				type="number"
				renderLabel={Strings.formatPrice}
				sx={{
					width: "9rem",

				}}
				onChange={e021.handleRecdAmtChange({ setValue: form.setValue, getValues: form.getValues })}
			/>
			<DSGToolbarLabel label="應收金額" name="ArecAmt" sx={{ minWidth: "9rem" }} />

		</DSGToolbar>
	);
});
E021ProdGridToolbarLabels.displayName = "E021ProdGridToolbarLabels";
export default E021ProdGridToolbarLabels;
