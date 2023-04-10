<template>

    <div v-if="current_user.name">
        Welcome: {{ current_user.name }}
        <button @click="logout">Logout</button>
        <button>Create Categories</button>
        <button>Create Blog</button>
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
import {store} from '../store/store.js'
    export default{
        data(){
            return{
                current_user: {
                    'id': '',
                    'name': '',
                    'email': '',
                },
                store,
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
                    this.store.setuser_token(result.data.data)
                }else{
                    this.store.setuser_token(null)
                }
                console.log(result)
            })
            },
            logout(){
                axios.get('http://127.0.0.1:8000/api/logout',{
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.store.user_token}`
                }}).then(result => {
                    this.store.setuser_token(null)
                    this.current_user={
                    'id': '',
                    'name': '',
                    'email': '',
                }
                })
            },
            getuserdata(){
                this.store.user_token &&
                axios.get('http://127.0.0.1:8000/api/users',{
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.store.user_token}`
                        }}).then(user_data => {
                            this.all_users = user_data.data
                        })
            }
        },
        computed: {
                    user_token(){
                        return this.store.user_token
                    }
                },
        watch: {
            user_token(){
                this.store.user_token &&
                axios.get('http://127.0.0.1:8000/api/current_user',{
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.store.user_token}`
                        }}).then(user_data => {
                            this.current_user = user_data.data
                        })
            },
        }
    }
</script>