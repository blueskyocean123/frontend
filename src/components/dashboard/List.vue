<template>
    <v-container>
        <v-toolbar flat>
            <template v-slot:extension>
                <v-tabs
                    v-model="tabs"
                    fixed-tabs
                >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab
                        href="#mobile-tabs-5-1"
                        class="primary--text"
                    >
                        <v-icon>{{blogsIcon}}</v-icon>
                    </v-tab>
                    <v-tab
                        href="#mobile-tabs-5-2"
                        class="primary--text"
                    >
                        <v-icon>{{responsesIcon}}</v-icon>
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>
        <v-tabs-items v-model="tabs">
            <v-tab-item
                :value="'mobile-tabs-5-1'"
            >
            <br>
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
                                    three-line
                                    :href="blogBaseURL+blog.id"
                                >
                                    <v-list-item-content>
                                        <div class="text-overline mb-4">
                                            {{blog.createdAt}}
                                        </div>
                                        <v-list-item-title class="text-h5 mb-1">
                                            {{blog.topic}}
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            <div v-if="blog.content.length<10">{{blog.content}}</div>
                                            <div v-else>{{blog.content.substring(0, 10)+"..."}}</div>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-avatar
                                        color="primary"
                                        size="108"
                                        tile
                                    >
                                        <v-img :src="blog.image"></v-img>
                                    </v-avatar>
                                </v-list-item>
                                <v-card-actions>
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                icon
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                <v-icon x-large>mdi-dots-horizontal</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item :href="googlehref">
                                                <v-list-item-title><a @click="openEditPage(blog.id)">Edit Blog</a></v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title><a @click="deleteBlog(blog.id)">Delete Blog</a></v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
            <v-tab-item
                :value="'mobile-tabs-5-2'"
            >
                <v-card flat>
                    <v-card-text v-text="text2"></v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { mdiNoteMultiple, mdiAccountTieVoice } from '@mdi/js';

export default {
    name: 'List',
    data() {
        return {
            blogsIcon: mdiNoteMultiple,
            responsesIcon: mdiAccountTieVoice,
            content: 'Your Blogs',
            tabs: null,
            text1: 'This is text 1.',
            text2: 'This is text 2. ',
            googlehref: '',
            blogBaseURL: '/read/?blogID='
        }
    },
    computed: {
        ...mapState(['blogs'])
    },
    beforeCreate() {
        this.$store.dispatch('getMyBlogs')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    },
    methods: {
        openEditPage(blogId) {
            this.$router.push({ path: '/edit/?blogId=' + blogId });
        },
        deleteBlog(blogId) {
            let params = {
                blogId: blogId
            };
            this.$store.dispatch('deleteBlog', params)
            .then((res) => {
                console.log(res);
                this.$router.go();
            })
            .catch((error) => {
                alert(error);
            })
        }
    }
};
</script>

<style >

</style>