import { P42CndPayCheckbox, P42DrvPayCheckbox, P42TrvPayCheckbox } from "@/components";
import { CheckboxEx, FlexTable, FlexTableCell, FlexTableRow, FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo } from "react";

const P42CmsRow1ViewComponent = (props) => {
	const { editing, ...rest } = props;
	return (
		<FlexTable border={0} rowHeight={29} {...rest}>
			<FlexTableRow alignItems="center" justifyContent="flex-end">
				{/* 旅行社佣金小計+導遊佣金小計+司機佣金小計 */}
				<FlexTableCell flex={1} align="right" px={1} fullHeight>
					<FormFieldLabel
						name="TotCms_N"
						label="小計："
						inline
						emptyText=""
					/>
				</FlexTableCell>
				{/* 消費總額 */}
				<FlexTableCell w={120} align="right" px={1}>
					<FormFieldLabel
						name="SalTotAmt"
						// label="小計"
						inline
						emptyText=""
					/>
				</FlexTableCell>
				{/* 旅行社佣金小計 */}
				<FlexTableCell w={120} align="right" px={1}>
					<FormFieldLabel
						name="TrvTotCms"
						// label="小計"
						inline
						emptyText=""
					/>
				</FlexTableCell>
				<FlexTableCell w={25} align="right" >
					<P42TrvPayCheckbox
						name="TrvPay"
					/>
				</FlexTableCell>
				{/* 導遊佣金小計 */}
				<FlexTableCell w={120} align="right" px={1}>
					<FormFieldLabel
						name="CndTotCms"
						// label="小計"
						inline
						emptyText=""
					/>
				</FlexTableCell>
				<FlexTableCell w={25} align="right">
					<P42CndPayCheckbox
						name="CndPay"
					/>
				</FlexTableCell>
				{/* 司機佣金小計 */}
				<FlexTableCell w={120} align="right" px={1}>
					<FormFieldLabel
						name="DrvTotCms"
						// label="小計"
						inline
						emptyText=""
					/>
				</FlexTableCell>
				<FlexTableCell w={25} align="right">
					<P42DrvPayCheckbox
						name="DrvPay"
					/>
				</FlexTableCell>

				{/* PC總額小計 */}
				<FlexTableCell w={120} align="right" px={1}>
					<FormFieldLabel
						name="SalTotAmtC"
						// label="小計"
						inline
						emptyText=""
					/>

				</FlexTableCell>
				<FlexTableCell w={13} >

				</FlexTableCell>
			</FlexTableRow>
		</FlexTable>
	);
}

P42CmsRow1ViewComponent.propTypes = {
	editing: PropTypes.bool
}
const P42CmsRow1View = memo(P42CmsRow1ViewComponent);
export default P42CmsRow1View;