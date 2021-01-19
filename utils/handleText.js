// 处理文字
export const handleText = (text, clipLength, multiple = 3) => {
	// 判断text是中文还是英语
	const pattern = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
	if (pattern.exec(text)) {
		// 如果text小于clipLenth不进行切割	
		if (text.length <= clipLength) {
			return text
		} else {
			return text.substr(0, clipLength) + '...'
		}

	} else {
		if (text.length <= clipLength * multiple) {
			return text
		} else {
			return text.substr(0, clipLength * multiple) + '...'
		}
	}
}
