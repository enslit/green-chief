const useTranslateStatus = () => {
	const statuses = {
		pending: {
			status: 'В ожидании оплаты',
			color: '#FFDD00'
		},
		processing: {
			status: 'Обработка',
			color: '#3AE2CE'
		},
		'on-hold': {
			status: 'На удержании',
			color: '#E27896'
		},
		'to-shipment': {
			status: 'Обработан',
			color: '#5083E2'
		},
		completed: {
			status: 'Выполнен',
			color: '#0DE231'
		},
		cancelled: {
			status: 'Отменен',
			color: '#FF0000'
		},
		refunded: {
			status: 'Возвращен',
			color: '#FF0000'
		},
		failed: {
			status: 'Не удался',
			color: '#FF0000'
		},
		trash: {
			status: 'Удален',
			color: '#5C5B53'
		}
	}

	return status => statuses[status]
}

export default useTranslateStatus