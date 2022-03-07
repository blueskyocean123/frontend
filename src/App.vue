<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    // created() {
    //   //메인 컴포넌트를 렌더링하면서 토큰체크
    //   let token = this.$store.getters.getToken;
    //   if (token.access == null && token.refresh == null) { //다 없으면 로그인 페이지로
    //     //이미 로그인 페이지가 떠있는 상태에서 새로 고침하면 중복 에러 떠서 이렇게 처리함
    //     this.$router.push({name: 'Login'}).catch(() => {}); 
    //   }
    // }
  }
</script>
