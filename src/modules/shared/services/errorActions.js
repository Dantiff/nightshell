export const cleanFormErrors = errors => {
	const returnBlock = {};

	if (errors !== undefined) {
		errors.map(e => {
			const pointer = e.source.pointer;
			const attr = pointer.substring(pointer.lastIndexOf('/') + 1, pointer.length);

			if (attr.indexOf('.') !== -1) {
				const parent = attr.substring(0, attr.indexOf('.'));
				const child = attr.substring(attr.indexOf('.') + 1, attr.length);

				returnBlock[parent] = {};

				returnBlock[parent][child] = e.detail;

				returnBlock[parent][child + '_key'] = true;
			} else {
				returnBlock[attr] = e.detail;

				returnBlock[attr + '_key'] = true;
			}
			return returnBlock;
		});
	}
	return returnBlock;
};

export default {
	cleanFormErrors,
};
