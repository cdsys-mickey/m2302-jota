import { FlexTable, FlexTableCell, FlexTableRow } from "@/shared-components";
import DSGLabelView from "@/shared-components/dsg/DSGLabelView";
import PropTypes from "prop-types";
import { memo } from "react";

const P42CmsRow1ViewComponent = (props) => {
	const { editing, ...rest } = props;
	return (
		<FlexTable border={0} rowHeight={29} {...rest}>
			<FlexTableRow alignItems="center" justifyContent="flex-end">
				{/* 旅行社佣金小計+導遊佣金小計+司機佣金小計 */}
				<FlexTableCell flex={1} align="right" px={1} fullHeight>
					<DSGLabelView
						name="TotCms_N"
						label="佣金小計："
					/>
				</FlexTableCell>
				{/* 消費總額 */}
				<FlexTableCell w={120} align="right" px={1} slotProps={{
					box: {
						sx: {
							backgroundColor: "var(--dsg-cell-disabled-background-color)"
						}
					}
				}}>
					<DSGLabelView
						name="SalTotAmt"
					// label="小計"
					/>
				</FlexTableCell>
				{/* 旅行社佣金小計 */}
				<FlexTableCell w={120} align="right" px={1} slotProps={{
					box: {
						sx: {
							backgroundColor: "var(--dsg-cell-disabled-background-color)"
						}
					}
				}}>
					<DSGLabelView
						name="TrvTotCms"
					// label="小計"
					/>
				</FlexTableCell>
				<FlexTableCell w={25} align="right" slotProps={{
					box: {
						sx: {
							// backgroundColor: "var(--dsg-cell-disabled-background-color)"
						}
					}
				}}>

				</FlexTableCell>
				{/* 導遊佣金小計 */}
				<FlexTableCell w={120} align="right" px={1} slotProps={{
					box: {
						sx: {
							backgroundColor: "var(--dsg-cell-disabled-background-color)"
						}
					}
				}}>
					<DSGLabelView
						name="CndTotCms"
					// label="小計"
					/>
				</FlexTableCell>
				<FlexTableCell w={25} align="right" slotProps={{
					box: {
						sx: {
							// backgroundColor: "var(--dsg-cell-disabled-background-color)"
						}
					}
				}}>

				</FlexTableCell>
				{/* 司機佣金小計 */}
				<FlexTableCell w={120} align="right" px={1} slotProps={{
					box: {
						sx: {
							backgroundColor: "var(--dsg-cell-disabled-background-color)"
						}
					}
				}}>
					<DSGLabelView
						name="DrvTotCms"
						// label="小計"
						inline
						emptyText=""
					/>
				</FlexTableCell>
				<FlexTableCell w={25} align="right" slotProps={{
					box: {
						sx: {
							// backgroundColor: "var(--dsg-cell-disabled-background-color)"
						}
					}
				}}>

				</FlexTableCell>

				{/* PC總額小計 */}
				<FlexTableCell w={120} align="right" px={1} slotProps={{
					box: {
						sx: {
							backgroundColor: "var(--dsg-cell-disabled-background-color)"
						}
					}
				}}>
					<DSGLabelView
						name="SalTotAmtC"
						// label="小計"
						inline
						emptyText=""
					/>

				</FlexTableCell>
				<FlexTableCell w={13} >

				</FlexTableCell>
			</FlexTableRow>
		</FlexTable >
	);
}

P42CmsRow1ViewComponent.propTypes = {
	editing: PropTypes.bool
}
const P42CmsRow1View = memo(P42CmsRow1ViewComponent);
export default P42CmsRow1View;