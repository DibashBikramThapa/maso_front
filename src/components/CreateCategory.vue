
<template>

    <div v-if="created">
        <div class="register-success">
            <h2>{{ msg }} category created</h2>
        </div>
    </div>

    <form class="form_class" method="POST" @submit="create_category">
        <label>Title:</label>
        <input v-model="category.title" placeholder="Title" required="required">
        <button type="submit">Create</button>
    </form>

</template>

<script>

    import axios from 'axios';
    import {store} from '../store/store.js'

        export default{
        data(){
            return{
                category:{
                    title: ''
                },
                store,
                msg: '',
                created: false
            }
        },
        methods: {
            create_category(e){
                e.preventDefault()
                axios.post('http://127.0.0.1:8000/api/blogs/category/create', this.category, {
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.store.user_token}`
                        }}).then(result => {
                            this.created = true,
                            this.msg = result.data.title
                        })
            }
      }

}

</script>