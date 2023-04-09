<script>

  import axios from 'axios';

  export default {
    data() {
      return {
        show_register_msg: false,
        registered_msg: '',
        register_tag: '',
        formClass: 'form_class',
        user:{
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
        userDatas: ''
      }
      },
      methods: {
        increment(){
          this.count++;
        },
        emailhandler(e) {
          this.user.email = e.target.value
        },
        postData(e){
          e.preventDefault()
          axios.post('http://127.0.0.1:8000/create',this.user,{
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(result =>{
            this.show_register_msg = true
            if(result.data){
              this.register_tag = 'register-success'
              this.registered_msg = 'User created '+result.data
            }else{
              this.register_tag = 'register-error'
              this.registered_msg = 'Something went wrong '+result.status

            }
          })
        }
      }
  }
</script>

<template>

  <template v-if="show_register_msg">
    <div :class="register_tag">
      <h2>{{ registered_msg }}</h2>
    </div>
  </template>
    <form :class="formClass" method="POST" @submit="postData">
      <label>Name: </label>
      <input v-model="user.name" placeholder="Name">
      <label>Email: </label>
      <input @input="emailhandler" placeholder="example@gmail.com" name="email" :value="user.email" type="email" required="required">
      <label>Password: </label>
      <input v-model="user.password" placeholder="Type here" type="password">
      <label>Password Confirmation: </label>
      <input v-model="user.password_confirmation" placeholder="Type here" type="password">
      <button type="submit">Submit</button>
    </form>
    <a href="/login" class="login_btn">Already registerd? Login</a>
</template>


<style>
.title {
  color: red;
}
.form_class{
  display: flex;
  flex-direction: column;
  row-gap: 0.3rem;
  width: 20vw;
}

.login_btn{
  margin: 1rem;
  background-color: lightblue;
  padding: 0.5rem;
}
.login_btn:hover{
  background-color: darkcyan;
}
</style>
