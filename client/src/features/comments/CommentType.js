
export default function CommentType({ comTypes }) {

	const renderTypes = comTypes.map((c) => {
		if (parseInt(c.id) === 1) {
			return (
				<span key={c.id} style={{ color: "#102027", backgroundColor: "#e0e0e0", padding: 7, paddingRight: 11, paddingLeft: 11, marginLeft: 11, borderRadius: "25px", fontSize: 16 }} ><b>{c.name.charAt(0)}</b></span>
			)
		} else if (parseInt(c.id) === 2) {
			return(
				<span key={c.id} style={{ color: "#102027", backgroundColor: "#e0e0e0", padding: 7, paddingRight: 11, paddingLeft: 11, marginLeft: 11, borderRadius: "25px", fontSize: 16 }} ><b>{c.name.charAt(0)}</b></span>
			)
		} else if (parseInt(c.id) === 3) {
			return (
				<span key={c.id} style={{ color: "#102027", backgroundColor: "#e0e0e0", padding: 7, paddingRight: 11, paddingLeft: 11, marginLeft: 11, borderRadius: "25px", fontSize: 16 }} ><b>{c.name.charAt(0)}</b></span>
			)
		} else {
			return (
				<span key={c.id} style={{ color: "#102027", backgroundColor: "#e0e0e0", padding: 7, paddingRight: 11, paddingLeft: 11, marginLeft: 11, borderRadius: "25px", fontSize: 16 }} ><b>{c.name.charAt(0)}</b></span>
			)
		}
	})

	return (
		<span style={{ fontSize: 12, padding: 3, marginLeft: 5, position: "absolute", top: 23, right: 5 }} ><b>
		{renderTypes}
		</b></span>
	)
}