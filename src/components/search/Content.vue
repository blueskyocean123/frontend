<template>
    <div>
        <div v-if="this.contentResults.length==0">
            <v-card-text v-text="defaultText"></v-card-text>
        </div>
        <div v-else>
            <v-container>
                <v-row>
                    <v-col
                        v-for="(contentResult, i) in this.contentResults" 
                        :key="i"
                        cols="12"
                    >
                        <v-card
                            class="mx-auto"
                            max-width="840"
                            outlined
                        >
                            <v-list-item 
                                :href="blogBaseURL+contentResult.id"
                            >
                                <v-list-item-avatar>
                                    <v-img :src="contentResult.createdBy_user.photo"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-html="contentResult.createdBy_user.name"></v-list-item-title>
                                    <v-list-item-subtitle v-html="contentResult.createdAt"></v-list-item-subtitle>
                                    <v-list-item-subtitle class="text-h5 mb-1">{{contentResult.topic}}</v-list-item-subtitle>
                                    <v-list-item-subtitle>
                                        <div v-if="contentResult.content.length<10">{{contentResult.content}}</div>
                                        <div v-else>{{contentResult.content.substring(0, 10)+"..."}}</div>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <br>
                                <v-avatar
                                    color="primary"
                                    size="108"
                                    tile
                                >
                                    <v-img :src="contentResult.image"></v-img>
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
    name: 'Content',
    data() {
        return {
            defaultText: 'Make sure all words are spelled correctly. Try different keywords. Try more general keywords.',
            blogBaseURL: '/read/?blogID='
        }
    },
    computed: {
        ...mapState(['contentResults'])
    },
    beforeCreate() {
        this.$store.dispatch('searchContent')
        .then( res => { })
        .catch( error => { });
    }
};
</script>

<style >

</style>