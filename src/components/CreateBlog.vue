
<template>

    <div v-if="created">
        <div class="register-success">
            <h2>{{ msg }} created</h2>
        </div>
    </div>

    <form class="form_class" method="POST" @submit="create_blog">

        <label>Category:</label>
        <select v-model="post.categories_id" required="required">
            <option disabled value="">Please Select</option>
            <option v-for="option in options" :value="option.id">{{option.title}}</option>
        </select>
        <label>Title:</label>
        <input v-model="post.title" placeholder="Title" required="required">
        <label>Description:</label>
        <textarea v-model="post.body" placeholder="Description" required="required">
        </textarea>
        <button type="submit">Create</button>
    </form>

</template>

<script>

    import axios from 'axios';
    import {store} from '../store/store.js';

        export default{
        data(){
            return{
                post:{
                    title: '',
                    body: '',
                    categories_id: ''
                },
                options: '',
                store,
                msg: '',
                created: false,
            }
        },
        methods: {
            create_blog(e){
                e.preventDefault()
                axios.post('http://127.0.0.1:8000/api/blogs/create', this.post, {
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.store.user_token}`
                        }}).then(result => {
                            this.created = true,
                            this.msg = result.data
                        })
            },
        },
        mounted(){
            axios.get('http://127.0.0.1:8000/api/blogs/category/show', {
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' : `Bearer ${this.store.user_token}`
                    }}).then(result => {
                        this.options = result.data
                    })
        }

}

</script>