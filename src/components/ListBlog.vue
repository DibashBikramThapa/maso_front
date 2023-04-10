<template>

    <div>
        <div v-for="each in bloglist" class="blog_card" :value=each.id>
            <h1>Category: {{ each.categories.title }} 
            </h1>
            <div class="align-btns">
                <button :value=each.id @click="updateBlog" class="btn-edit">Edit</button>
                <button :value=each.id @click="deleteBlog" class="btn-delete">Delete</button>
            </div>
            <h2>{{ each.title }}</h2>
            <p>{{ each.body }}
                <br/>
                <span style="font-style: italic; float: right; text-decoration: underline;">
                    Created by {{ each.authors.name }} at {{ each.created_at }}</span></p>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    import {store} from '../store/store.js'

    export default{
        data(){
            return{
                store,
                bloglist: ''
            }
        },
        methods: {
            updateBlog(e){
                this.$router.push({
                    name: 'UpdateBlog', 
                    params: {
                        'id': parseInt(e.currentTarget.value)
                    }
                });
            },
            deleteBlog(e){
                axios.delete(`http://127.0.0.1:8000/api/blogs/delete/${parseInt(e.currentTarget.value)}`, {
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.store.user_token}`
                        }}).then(result => {
                        })
            }
        },
        mounted(){
                axios.get('http://127.0.0.1:8000/api/blogs', {
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.store.user_token}`
                        }}).then(result => {
                            this.bloglist = result.data
                        })
                },
    }

</script>