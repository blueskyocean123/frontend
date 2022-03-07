<template>
    <div>
        <br>
        <h2>Home</h2>
        <v-container>
            <span
                v-for="(leaderPhoto, i) in this.leaderPhotos" 
                :key="i"
                cols="12"
            >
                <v-avatar
                    color="primary"
                    size="56"
                    @click="convertPage(i)"
                >
                    <v-img :src="leaderPhoto"></v-img>
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
                        <h4>Followings</h4>
                    </v-tab>
                    <v-tab href="#mobile-tabs-5-2">
                        <h4>Recommended</h4>
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
                                <v-list-item 
                                    :href="blogBaseURL+blog.id"
                                >
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

                                    <v-avatar
                                        color="primary"
                                        size="108"
                                        tile
                                    >
                                        <v-img :src="blog.image"></v-img>
                                    </v-avatar>
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
            leaderArray: [],
            leaderPhotos: [],
            blogBaseURL: '/read/?blogID='
        }
    },
    name: 'Home',
    components: {
    },
    async beforeCreate() {
        await this.$store.dispatch('getFollow')
        .then((res) => {
            // to ban to display the photos of same user
            for (var i = 0; i < res.data.length; i++ ) {
                this.leaderArray.push(res.data[i].receiver_user.id); 
                this.leaderPhotos.push(res.data[i].receiver_user.photo);
            }
        })
        .catch((err) => {
            console.log(err);
        });
        await this.$store.dispatch('getGoodBlogs')
        .then((res) => {
            // console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    },
    computed: {
        ...mapState(['blogs'])
    },
    methods: {
        convertPage(index) {
            var convertURL = '/indiv/?userId=' + this.leaderArray[index];
            this.$router.push({ path: convertURL });
        }
    }
};
</script>

<style >

</style>