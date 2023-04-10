<template>

    <div>
        My blogs:

        <div v-for="each in bloglist">
            <!-- <h3>{{ each.category_id.name }}</h3> -->
            <h3>{{ each.category_id }}</h3>
            <h4>{{ each.title }}</h4>
            <p>{{ each.body }}
                <br/>
                <span style="font-style: italic;">Created by {{ each.author_id }} at {{ each.created_at }}</span></p>
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
        mounted(){
                axios.get('http://127.0.0.1:8000/api/blogs', {
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization' : `Bearer ${this.store.user_token}`
                        }}).then(result => {
                            debugger
                            this.bloglist = result.data
                        })
                },
    }

</script>