<template>
    <div>
        <div v-if="this.topicResults.length==0">
            <v-card-text v-text="defaultText"></v-card-text>
        </div>
        <div v-else>
            <v-container>
                <v-row>
                    <v-col
                        v-for="(topicResult, i) in this.topicResults" 
                        :key="i"
                        cols="12"
                    >
                        <v-card
                            class="mx-auto"
                            max-width="840"
                            outlined
                        >
                            <v-list-item 
                                :href="blogBaseURL+topicResult.id"
                            >
                                <v-list-item-avatar>
                                    <v-img :src="topicResult.createdBy_user.photo"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-html="topicResult.createdBy_user.name"></v-list-item-title>
                                    <v-list-item-subtitle v-html="topicResult.createdAt"></v-list-item-subtitle>
                                    <v-list-item-subtitle class="text-h5 mb-1">{{topicResult.topic}}</v-list-item-subtitle>
                                    <v-list-item-subtitle>
                                        <div v-if="topicResult.content.length<10">{{topicResult.content}}</div>
                                        <div v-else>{{topicResult.content.substring(0, 10)+"..."}}</div>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <br>

                                <v-avatar
                                    color="primary"
                                    size="108"
                                    tile
                                >
                                    <v-img :src="topicResult.image"></v-img>
                                </v-avatar>
                            </v-list-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'; 

export default {
    name: 'Topic',
    data() {
        return {
            defaultText: 'Make sure all words are spelled correctly. Try different keywords. Try more general keywords.',
            blogBaseURL: '/read/?blogID='
        }
    },
    computed: {
        ...mapState(['topicResults'])
    },
    beforeCreate() {
        this.$store.dispatch('searchTopic')
        .then((res) => { })
        .catch((error) => { });
    }
};
</script>

<style >

</style>