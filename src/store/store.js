import { reactive } from 'vue'

export const store = reactive({
    user_token: '',
    setuser_token(token){
        this.user_token = token
    }
})