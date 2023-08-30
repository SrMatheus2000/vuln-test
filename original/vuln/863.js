() {
		// TODO: victoriafrench - is this the correct way to do this? the object
		// should be creating a default md where one does not exist imo.

		const innerHtml = (
			this.props.value !== undefined
			&& this.props.value.md !== undefined
		)
		? this.props.value.md.replace(/\n/g, '<br />')
		: '';

		return (
			<FormInput
				dangerouslySetInnerHTML={{ __html: innerHtml }}
				multiline
				noedit
			/>
		);
	}