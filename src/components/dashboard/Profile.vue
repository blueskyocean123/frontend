<template>
    <v-app>
        <v-container  :class="{
            'container pa-4 my-12': $vuetify.breakpoint.smAndDown,
            'container pa-10 my-12': $vuetify.breakpoint.mdAndUp,
        }">
            <v-row class="d-flex justify-center align-center">
                <v-card-text>
                    <v-file-input
                        accept="image/png, image/jpeg, image/bmp"
                        label="Image Input"
                        filled
                        prepend-icon="mdi-camera"
                        v-model="chosenFile"
                        @change="onFileChanged" id="up" ref="file"
                    >                    
                    </v-file-input>
                </v-card-text>
            </v-row>
            <v-row class="d-flex justify-center align-center">
                <v-card-text>
                    <v-text-field
                    value="John Doe"
                    label="Username"
                    filled
                    prepend-icon="mdi-account"
                    v-model="this.userInfo.name"
                ></v-text-field>
                </v-card-text>                
            </v-row>
            <v-row class="d-flex justify-center align-center">
                <v-card-text>
                    <v-text-field
                        filled
                        label="Email"
                        prepend-icon="mdi-email"
                        v-model="this.userInfo.email"
                    ></v-text-field>
                </v-card-text>                
            </v-row>
            <v-row class="d-flex justify-center align-center">
                <v-card-text>
                    <v-text-field
                        label="Bionote"
                        filled
                        prepend-icon="mdi-pencil"
                        v-model="this.userInfo.bio"
                    ></v-text-field>
                </v-card-text>                
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-btn
                        color="secondary"
                        text
                        block
                        tile
                        elevation="0"
                        @click="backToPreviousPage()"
                        class="pa-6 font-weight-bold"
                    >
                    Cancel
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                    <v-btn            
                        class="pa-6 font-weight-bold"
                        block
                        tile
                        elevation="0"
                        @click="updateProfile()"
                    >
                    Update
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            chosenFile: null
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        backToPreviousPage() {
            this.$router.back();
        },
        async onFileChanged() {
            let params = {
                imageFile: this.chosenFile
            };
            await this.$store.dispatch('uploadImage', params)
            .then((res) => {
                console.log(res);
                this.userInfo.photo = res.data.msg;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        updateProfile() {
            // this.$store.dispatch(UPDATE_PROFILE,  {avatar:this.avatar, user: this.currentUser}).then(() => {
            //     // #todo, nice toast and no redirect
            //     this.$router.push({ name: "dashboardWithSignin" });
            // });
        }
    },
    created() {
        // this.$store.dispatch('getProfile')
        // .then((res) => {
        //     console.log(res);
        //     this.photo = res.data.photo;
        //     this.email = res.data.email;
        //     this.username = res.data.name;
        //     this.bionote = res.data.bio;
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
    }
};
</script>

