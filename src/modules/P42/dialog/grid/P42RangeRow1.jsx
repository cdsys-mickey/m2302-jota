import { FlexTable, FlexTableCell, FlexTableRow, FormFieldLabel } from "@/shared-components";
import { memo } from "react";

const P42RangeRow1ViewComponent = (props) => {
	const { ...rest } = props;
	return (
		<FlexTable border={0} {...rest}>
			<FlexTableRow>
				<FlexTableCell align="right" alignItems="flex-end">
					<FormFieldLabel
						name="SalCount"
						label="筆數："
						inline
					/>
				</FlexTableCell>
			</FlexTableRow>
		</FlexTable>
	);
}

P42RangeRow1ViewComponent.propTypes = {

}
const P42RangeRow1View = memo(P42RangeRow1ViewComponent);
export default P42RangeRow1View;