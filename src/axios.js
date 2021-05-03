import axios from 'axios'
const instance = axios.create({
    baseURL:"https://react-burger-app-c147e-default-rtdb.firebaseio.com/"
})
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE'
export default instance