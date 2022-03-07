<template>
  <div>
    <h3> {{ msg }} </h3>
  </div>
</template>

<script>
export default {
  name: 'Confirmed',
  data () {
    return {
      msg: 'Congratulations. Your account is just confirmed.'
    }
  },
  created() {
    let params = {
      authcode: this.$route.query.authcode,
      email: this.$route.query.email
    };
    if (this.$route.query.type == 'login') {
      this.$store.dispatch('emailLogInEnd', params)
      .then((res) => {
        if (res.data.message == 'Auth success') {
          this.$router.push({path: '/home'});
        } else {
          alert('Authentication failed.');
          this.$router.push({name: 'Landing'});
        }
      })
      .catch(({message}) => (alert(message)));
    } else if (this.$route.query.type == 'signup') {
      let params = {
        authcode: this.$route.query.authcode,
        email: this.$route.query.email
      };
      this.$store.dispatch('emailSignUpEnd', params)
      .then((res) => {
        if (res.data.message == 'Auth success') {
          this.$router.push({path: '/home'});
        } else {
          alert('Authentication failed.');
          this.$router.push({name: 'Landing'});
        }      
      })
      .catch(({message}) => (alert(message)));
    } else {
      alert('Sorry. Error occurred.');
    }    
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
