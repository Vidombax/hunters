import userApi from './api_user.js'
import threadApi from './api_thread.js'

export default {
    ...userApi,
    ...threadApi,
}
