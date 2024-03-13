import axios from 'axios'

const appID = '65ec1ec9bff0ace5831d4c48'

const addAppIDHeader = (config) => {
	config.headers['app-id'] = appID
	return config
}

const removeAppIDHeader = (config) => {
	delete config.headers['app-id']
	return config
}

axios.interceptors.request.use(addAppIDHeader)
axios.interceptors.request.use(undefined, removeAppIDHeader)

export default axios
