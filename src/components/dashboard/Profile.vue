<template> 
    <v-container>      
        <v-row>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="10">
                <v-row class="pa-md-4 mx-lg-auto">
                    <v-col>
                    <h2 style="border-bottom: 1px solid black !important">About you</h2>
                    </v-col>
                </v-row>
                <v-row class="pa-md-4 mx-lg-auto">
                    <v-col cols="12" md="8">
                        <h2>Name</h2>
                        <v-text-field :readonly="readonly1" v-model="name"></v-text-field>
                        <span class="description">Your name appears on your Profile page, as your byline, and in your responses. It is a required field.</span>
                    </v-col>
                    <v-col cols="12" md="4" >
                        <v-col v-if="readonly1" cols="12" offset="8">
                            <v-btn @click="readonly1=false;readonly2=true;readonly3=true">edit</v-btn>
                        </v-col>
                        <v-col v-else cols="12" offset="4">
                            <v-btn @click="saveProfile()">save</v-btn>&emsp;
                            <v-btn @click="cancelChange()">cancel</v-btn>
                        </v-col>
                    </v-col>
                </v-row>
                <v-row class="pa-md-4 mx-lg-auto">
                    <v-col cols="12" md="8">
                        <h2>Short Bio</h2>
                        <v-text-field :readonly="readonly2" v-model="bio"></v-text-field>
                        <span class="description">Your short bio appears on your Profile and next to your stories. Max 160 characters.</span>
                    </v-col>
                    <v-col cols="12" md="4" >
                        <v-col v-if="readonly2" cols="12" offset="8">
                            <v-btn @click="readonly2=false;readonly1=true;readonly3=true">edit</v-btn>
                        </v-col>
                        <v-col v-else cols="12" offset="4">
                            <v-btn @click="saveProfile()">save</v-btn>&emsp;
                            <v-btn @click="cancelChange()">cancel</v-btn>
                        </v-col>
                    </v-col>
                </v-row>
                <v-row class="pa-md-4 mx-lg-auto">
                    <v-col cols="12" md="8">
                        <h2>Email</h2>
                        <!-- <v-text-field :readonly="readonly3" v-model="getUser.email"></v-text-field> -->
                        <v-text-field :readonly="readonly3" v-model="email"></v-text-field>
                        <span class="description">This is your email account.</span>
                    </v-col>
                    <v-col cols="12" md="4" >
                        <v-col v-if="readonly3" cols="12" offset="8">
                            <v-btn @click="readonly3=false;readonly1=true;readonly2=true;">edit</v-btn>
                        </v-col>
                        <v-col v-else cols="12" offset="4">
                            <v-btn @click="saveProfile()">save</v-btn>&emsp;
                            <v-btn @click="cancelChange()">cancel</v-btn>
                        </v-col>
                    </v-col>
                </v-row>
                <v-row class="pa-md-4 mx-lg-auto">
                    <v-col cols="12" md="8">
                        <h2>Social Notification</h2>              
                        <span class="description">Turn on social notification to get notified.</span>
                    </v-col>
                    <v-col cols="12" md="4" >
                        <v-col cols="12" offset="8">
                            <v-switch
                                flat
                            ></v-switch>
                        </v-col>
                    </v-col>
                </v-row>
                <v-row class="pa-md-4 mx-lg-auto">
                    <v-col cols="12" md="6">
                        <h2>Avatar</h2>
                        <v-file-input                
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Pick an avatar"
                            prepend-icon="mdi-camera"
                            label="Avatar"
                            @change="selectFile"
                            v-model="image"
                        ></v-file-input>
                        <span class="description">Upload your avatar.</span>
                    </v-col>
                    <v-col cols="12" md="4" align="center">
                        <v-avatar
                            color="primary"
                            size="84"
                        >
                            <v-img :src="this.imageSrc"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col cols="12" md="2" >
                        <v-col v-if="isSelected">
                            <v-btn @click="uploadAvatar()">upload</v-btn>
                        </v-col>              
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="1"></v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    .description {
        font-size: 0.8em;
    }
</style>

<script>
    import { mapState } from "vuex";
    export default {
        data() {
            return {
                boxshow: false,
                readonly1: true,        
                readonly2: true,
                readonly3: true,
                switch1: true,
                isSelected: false,
                image: { },
                imageSrc: '',
                name: '',
                bio: '',
                email: '',
                social_notification: false
            }
        },
        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            async saveProfile(){
                this.readonly1 = true;
                this.readonly2 = true;
                this.readonly3 = true;
                const user = {
                    name: this.name,
                    email: this.email,
                    bio: this.bio,
                    photo: this.imageSrc
                }
                this.$store.dispatch('updateProfile', user)
                .then((res) => {
                    alert(res.data.message);
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            cancelChange() {
                this.readonly1 = true;
                this.readonly2 = true;
                this.readonly3 = true;
                // // console.log("getUser:".concat(this.$store.state.user.username));
                // // this.username = this.getUser.username;
                // // this.email = this.getUser.email;
                // // this.bio = this.getUser.bio;
            },
            selectFile(file) {
                this.isSelected = true;
                this.imageSrc = URL.createObjectURL(file);
                this.image = file;
            },
            async uploadAvatar() {
                let params = {
                    imageFile: this.image
                };
                await this.$store.dispatch('uploadImage', params)
                .then(async (res) => {
                    this.imageSrc = res.data.msg;
                    const user = {
                        name: this.name,
                        email: this.email,
                        bio: this.bio,
                        photo: this.imageSrc
                    }
                    await this.$store.dispatch('updateProfile', user)
                    .then((res) => {
                        alert(res.data.message);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                })
                .catch((error) => {
                    console.log(error);
                })

                // try {
                //   const {data} = await this.$Axios.post('http://localhost:3000/api/users/avatar/'.concat(this.getUser.id), formData, {
                //     headers: {
                //       'Content-Type': 'multipart/form-data'
                //       }
                //     });
                //     console.log(data);
                //   this.$store.dispatch('setAvatar', data.photo)
                // } catch(err) {
                //   console.log(err);
                // }
            }
        },
        mounted() {
            this.cancelChange()
        },
        created() {
            this.$store.dispatch('getProfile')
            .then((res) => {
                console.log(this.$store.state.userInfo);
                this.imageSrc = this.userInfo.photo;
                this.name = this.userInfo.name;
                this.email = this.userInfo.email;
                this.bio = this.userInfo.bio;
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
</script>