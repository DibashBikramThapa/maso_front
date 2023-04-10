<template>

    <form>
        <label>Title:</label>
        <input v-model="title" placeholder="Title">
        <button type="submit">Create</button>
    </form>

</template>

<script>

    import axios from 'axios';

    export default {
        data(){
            title: ''
        },
      methods: {
        postData(e){
            e.preventDefault()
            axios.post('http://127.0.0.1:8000/api/blogs/create',this.title,{
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' : `Bearer ${this.user_token}`

                }
            }).then(result =>{

            })
        }
      }

}

</script>