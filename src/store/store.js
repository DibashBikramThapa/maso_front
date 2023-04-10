import { reactive } from 'vue'

export const store = reactive({
    user_token: null || localStorage.getItem('user_token'),
    getcurrent_user(){
        let current_user = JSON.parse(localStorage.getItem('current_user'))
        if(current_user){
            return current_user
            
        }else{
            return {
                'id': '',
                'name': '',
                'email': '',
            }
        }
        
    },

    setuser_token(token){
        this.user_token = token
        localStorage.setItem('user_token',token || '')
    },
    setcurrent_user(user){
        localStorage.setItem('current_user',  JSON.stringify(user))
    },

})