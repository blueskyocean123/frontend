<template>
    <div>
        <br>
        <h2>Tag : {{this.tagName}}</h2>
        <v-toolbar flat>
            <template v-slot:extension>
                <v-tabs
                    align-with-title
                    v-model="tabs"
                >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#mobile-tabs-5-1">
                        <h4>Trending</h4>
                    </v-tab>
                    <v-tab href="#mobile-tabs-5-2">
                        <h4>Other</h4>
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>
        <v-tabs-items  v-model="tabs">
            <v-tab-item :value="'mobile-tabs-5-1'">
                <div v-if="this.tagBlogs.length==0">
                    <v-card-text v-text="defaultText"></v-card-text>
                </div>
                <div v-else>
                    <v-container>
                        <v-row 
                            v-for="(tagResult, i) in this.tagBlogs" 
                            :key="i"
                        >
                            <v-col
                                v-for="(classify, j) in tagResult.classifies" 
                                :key="j"
                                cols="12"
                            >
                                <v-card
                                    class="mx-auto"
                                    max-width="840"
                                    outlined
                                >
                                    <v-list-item 
                                        href="/read/?blogID=2"
                                    >
                                        <v-list-item-avatar>
                                            <v-img :src="classify.blog.createdBy_user.photo"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title v-html="classify.blog.createdBy_user.name"></v-list-item-title>
                                            <v-list-item-subtitle v-html="classify.blog.createdAt"></v-list-item-subtitle>
                                            <v-list-item-subtitle class="text-h5 mb-1">{{classify.blog.topic}}</v-list-item-subtitle>
                                            <v-list-item-subtitle>
                                                <div v-if="classify.blog.content.length<10">{{classify.blog.content}}</div>
                                                <div v-else>{{classify.blog.content.substring(0, 10)+"..."}}</div>
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                        <br>
                                        <v-avatar
                                            color="primary"
                                            size="108"
                                            tile
                                        >
                                            <v-img :src="classify.blog.image"></v-img>
                                        </v-avatar>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
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
            tagName: ''
        }
    },
    name: 'Tag',
    components: {
    },
    async created() {
        this.tagName = this.$route.query.name;
        await this.$store.dispatch('searchTagBlogs', this.$route.query.name)
        .then((res) => {
            // this.title = this.blogs[0].createdBy_user.name
            console.log(this.$store.state.tagBlogs);
        })
        .catch((err) => {
            console.log(err);
        })
    },
    computed: {
        ...mapState(['tagBlogs'])
    },
};
</script>

<style >

</style>