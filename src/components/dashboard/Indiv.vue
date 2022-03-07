<template>
    <div>
        <br>
        <h2>Welcome to {{this.title}}</h2>
        <v-container>
            <span>
                <v-avatar
                    color="primary"
                    size="56"
                >
                    <v-img :src="this.blogs[0].createdBy_user.photo"></v-img>
                </v-avatar>
                &emsp;
            </span>
        </v-container>
        <v-toolbar flat>
            <template v-slot:extension>
                <v-tabs
                    align-with-title
                    v-model="tabs"
                >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#mobile-tabs-5-1">
                        <h4>Home</h4>
                    </v-tab>
                    <v-tab href="#mobile-tabs-5-2">
                        <h4>About</h4>
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>
        <v-tabs-items  v-model="tabs">
            <v-tab-item :value="'mobile-tabs-5-1'">
                <v-container>
                    <v-row>
                        <v-col
                            v-for="(blog, i) in this.blogs" 
                            :key="i"
                            cols="12"
                        >
                            <v-card
                                class="mx-auto"
                                max-width="840"
                                outlined
                            >
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <v-img :src="blog.createdBy_user.photo"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-html="blog.createdBy_user.name"></v-list-item-title>
                                        <v-list-item-subtitle v-html="blog.createdAt"></v-list-item-subtitle>
                                        <v-list-item-subtitle class="text-h5 mb-1">{{blog.topic}}</v-list-item-subtitle>
                                        <v-list-item-subtitle>
                                            <div v-if="blog.content.length<10">{{blog.content}}</div>
                                            <div v-else>{{blog.content.substring(0, 10)+"..."}}</div>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <br>

                                    <v-list-item-avatar
                                        tile
                                        size="48"
                                        color="primary"
                                    ></v-list-item-avatar>
                                </v-list-item>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
            <v-tab-item :value="'mobile-tabs-5-2'">
                <div>this is test2</div>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            tabs: null,
            title: ''
        }
    },
    name: 'Indiv',
    components: {
    },
    async created() {
        await this.$store.dispatch('getOtherBlogs', this.$route.query.userId)
        .then((res) => {
            this.title = this.blogs[0].createdBy_user.name
            // console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    },
    computed: {
        ...mapState(['blogs'])
    },
};
</script>

<style >

</style>