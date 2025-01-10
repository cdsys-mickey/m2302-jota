const ZA03ListHeaderContainer = (props) => {
	const { ...rest } = props;

	const showAuthScope = useMemo(() => {
		return auth?.operator?.Class >= 3;
	}, [auth?.operator?.Class])

	return <ZA03ListHeader  {...rest} />
}

ZA03ListHeaderContainer.displayName = "ZA03ListHeaderContainer";
export default ZA03ListHeaderContainer;