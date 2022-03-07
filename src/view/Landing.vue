<template>
    <v-app>
        <v-card color="grey lighten-4" flat tile>
            <v-toolbar dense>                 
                <v-toolbar-title><div class="font-weight-medium">Bloghouse</div></v-toolbar-title>         
                <v-spacer></v-spacer>
                <router-link to="/login" tag="div">
                    <v-btn class="ma-2" outlined color="#009688">
                        Log In
                    </v-btn>
                </router-link>
                <router-link to="/signup" tag="div">
                    <v-btn class="ma-2" outlined color="#2979FF">
                        Sign Up
                    </v-btn>
                </router-link>
            </v-toolbar>
        </v-card>
        <v-container fluid>
            <v-row class="blue" style="border-bottom: 1px solid black !important">
                <v-col cols="12" md="2">           
                </v-col>
                <v-col cols="12" md="8">
                    <v-col cols="12" md="6">               
                        <v-row  align="center" style="font-size:3.5em; line-height: 1em;" class="pa-md-4">
                            BlogHouse is a place to write, read, discuss and connect each other.
                        </v-row>
                        <v-row class="pa-md-4 mx-lg-auto" align="center" >
                            It's easy and free to post your thinking on any topic and connect with millions of readers.
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="6">
                    </v-col>
                </v-col>
                <v-col cols="12" md="2"></v-col>
            </v-row>
        </v-container>
        <v-container align="center">
            <v-row class="pa-md-4 mx-lg-auto">
                <h2>Trending Blogs On BlogHouse</h2>
            </v-row>
            <v-row class="pa-md-4 mx-lg-auto">
                <v-col cols="12" md="2"></v-col>
                <v-col cols="12" md="8">
                    <v-row>
                        <v-col
                            v-for="(blog, i) in this.blogs" 
                            :key="i"
                            cols="12" md="4"
                        >
                            <v-card height="120" width="420">
                                <v-col cols="12" md="10">
                                    <v-row dense align="center">
                                        <v-col cols="12" md="2">
                                            <v-avatar size="30">
                                                <img v-bind:src="blog.createdBy_user.photo">
                                            </v-avatar>
                                        </v-col>
                                        <v-col>
                                            <p style="font-size:14px;">{{blog.createdBy_user.name}}</p>
                                        </v-col>                                         
                                    </v-row>
                                    <v-row>
                                        &emsp;<h3>{{blog.topic}}</h3>
                                    </v-row>
                                    <v-row>
                                        &emsp;<p style="font-size:12px;">{{blog.createdAt}}</p>
                                    </v-row>
                                </v-col>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            
            <v-row></v-row>
        </v-container>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Landing',
    computed: {
        ...mapState(['blogs'])
    },
    async beforeCreate() {
        let params = {
            email: null
        };
        await this.$store.dispatch('getGoodBlogs', params)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }
}
</script>

