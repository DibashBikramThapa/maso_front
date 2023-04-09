<template>

    <div v-if="current_user.name">
        Welcome: {{ current_user.name }}
        <button @click="logout">Logout</button>
    </div>
    <div v-else="">
        <form class="form_class" method="POST" @submit="postData">
            <label>Email: </label>
            <input v-model="user.username" placeholder="example@gmail.com" type="email" required="required">
            <label>Password: </label>
            <input v-model="user.password" placeholder="Type here" type="password">
            <button type="submit">Submit</button>
        </form>
    </div>
    <div>
        <button @click="getuserdata">Get users data</button>
        <dd>{{ all_users }}</dd>
    </div>

</template>

<script>
import axios from 'axios';
    export default{
        data(){
            return{
                current_user: {
                    'id': '',
                    'name': '',
                    'email': '',
                },
                user_token: '',
                user:{
                    username:'',
                    password:''
                },
                all_users: null,
            }
        },
        methods: {
            postData(e){
                e.preventDefault()
                axios.post('http://127.0.0.1:8000/api/auth',this.user,{
                    headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(result => {
                if( result.data != "False"){
                    this.user_token = result.data.data
                }else{
                    this.user_token = null
                }
            })
            },
            logout(){
                axios.get('http://127.0.0.1:8000/api/logout',{
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.user_token}`
                }}).then(result => {
                    this.user_token = null
                    this.current_user={
                    'id': '',
                    'name': '',
                    'email': '',
                }
                })
            },
            getuserdata(){
                this.user_token &&
                axios.get('http://127.0.0.1:8000/api/users',{
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.user_token}`
                        }}).then(user_data => {
                            this.all_users = user_data.data
                        })
            }
        },
        watch: {
            user_token: function(){
                this.user_token &&
                axios.get('http://127.0.0.1:8000/api/current_user',{
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.user_token}`
                        }}).then(user_data => {
                            this.current_user = user_data.data
                        })
            }
        }
    }
</script>