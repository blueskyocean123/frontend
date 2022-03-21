<template>
    <v-app id="inspire">
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12"><br>
                            <h1 class="text-xs-center" align="center">Welcome back.</h1><br><br>
                            <div align="center">
                                <v-btn
                                    rounded
                                    outlined
                                    align="center"
                                    justify="center"
                                    style="width: 240px"
                                    @click="gmailLogIn"
                                >
                                    <v-icon left color="red" size="24">
                                        {{GmailIcon}}
                                    </v-icon>
                                        Sign in with GMAIL
                                </v-btn>
                            </div>
                            <br><br>
                            <div align="center">
                                <v-btn
                                    rounded
                                    outlined
                                    align="center"
                                    justify="center"
                                    style="width: 240px"
                                    @click="emailModal = true"
                                >
                                    <v-icon left color="green" size="24">
                                        {{EmailIcon}}
                                    </v-icon>
                                    Sign in with EMAIL                                        
                                </v-btn>
                                <v-dialog
                                    v-model="emailModal"
                                    max-width="500px"
                                >
                                    <v-card class="elevation-12">
                                        <v-toolbar dark color="primary">
                                            <v-toolbar-title>Log in with email</v-toolbar-title>
                                        </v-toolbar>
                                        <br>
                                        <p class="font-weight-medium" align="center">Enter the email address associated with your account,</p>
                                        <p class="font-weight-medium" align="center">and we’ll send a magic link to your inbox.</p>
                                        <v-card-text>
                                            <v-form>
                                                <v-text-field name="login" label="Login" type="text" ref="user_id" v-model="user_id"></v-text-field>
                                            </v-form>
                                        </v-card-text>
                                        <div class="text-center">
                                            <v-btn tile color="primary" type="submit" rounded @click="emailLogIn">
                                                <v-icon left>
                                                    mdi-email
                                                </v-icon>
                                                Continue
                                            </v-btn>
                                            <br><br>                                                        
                                        </div>
                                    </v-card>
                                </v-dialog>
                            </div>
                            <p align="center" style="margin-top: 60px">
                                No account? 
                                <router-link 
                                    :to="{ path: '/signup' }"
                                    style="text-decoration: none; color: inherit;"
                                >
                                    <a style="color:blue;">Create one.</a>
                                </router-link>
                            </p>
                            <br><br>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mdiGmail, mdiEmail } from '@mdi/js';

export default {
    data () { // 현재 컴포넌트에서 사용할 데이터 Set
        return {
            user_id: '',
            GmailIcon: mdiGmail,
            EmailIcon: mdiEmail,
            emailModal: false
        }
    },
    methods: {
        emailLogIn () {
            let user_id = this.user_id; // input에 v-model은 쌍방향 데이터 바인딩으로 입력되여 있는 데이터를 바로 받을수 있음                
            if (user_id == '') {
                alert('Your email is required.');
                this.$refs.user_id.focus();
                return;
            }
            let params = {
                email: user_id
            };
            this.$store.dispatch('emailLogInInit', params)
            .then((res) => {
                if (res.data.message === 'Email sending') {
                    this.$router.push({name: 'Standby'});
                } else {
                    alert('Login failed');
                    this.$router.push({name: 'Landing'});
                }
            })
            .catch((error) => {
                //on fail do something
                alert(error);
            })
        },
        async gmailLogIn () {
            await this.$gAuth.getAuthCode()
            .then(authCode => {
                //on success
                let params = {
                    code: authCode
                };
                this.$store.dispatch('gmailLogInEnd', params)
                .then((res) => {
                    if (res.data.message == 'OAuth success') {
                        this.$router.push({name: 'Home'});
                    } else if (res.data.message == 'Sign up at first.') {
                        alert('Login failed. Please sign up at first');                            
                        this.$router.push({name: 'Landing'});
                    } else {
                        alert('Login failed');
                        this.$router.push({name: 'Landing'});
                    }
                })
                .catch(message => {
                    alert(message);
                });
            })
            .catch((error) => {
                //on fail do something
            })
        }
    }
}
</script>

<style></style>
