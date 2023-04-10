
<template>

    <div v-if="created">
        <div class="register-success">
            <h2>{{ msg }} created</h2>
        </div>
    </div>

    <form class="form_class" method="POST" @submit="update_blog">

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
        <button type="submit">Update</button>
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
                post_id: '',
                options: '',
                store,
                msg: '',
                created: false,
            }
        },
        methods: {
            update_blog(e){
                e.preventDefault()
                axios.put(`http://127.0.0.1:8000/api/blogs/update/${this.post_id}`, this.post, {
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.store.user_token}`
                        }}).then(result => {
                            debugger
                            this.created = true,
                            this.msg = result.data
                        })
            },
      },
      mounted(){
        this.post_id =this.$router.currentRoute.value.params.id

        axios.get('http://127.0.0.1:8000/api/blogs/category/show', {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization' : `Bearer ${this.store.user_token}`
                }}).then(result => {
                    this.options = result.data
                })
        axios.get(`http://127.0.0.1:8000/api/blogs/get/${this.post_id}`, {
            headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization' : `Bearer ${this.store.user_token}`}}).then(result => {
                this.post = result.data
            })            
      }

}

</script>