<template>
    <div>
        <br>
        <h2>Results for "{{this.keyword}}"</h2>
        <v-toolbar flat>
            <template v-slot:extension>
                <v-tabs
                    align-with-title
                    v-model="tabs"
                >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#mobile-tabs-5-1">
                        <h4>Topic</h4>
                    </v-tab>
                    <v-tab href="#mobile-tabs-5-2">
                        <h4>Content</h4>
                    </v-tab>
                    <v-tab href="#mobile-tabs-5-3">
                        <h4>Catetory</h4>
                    </v-tab>
                    <v-tab href="#mobile-tabs-5-4">
                        <h4>User</h4>
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>
        <v-tabs-items  v-model="tabs">
            <v-tab-item :value="'mobile-tabs-5-1'">
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
                                        href="/read/?blogID=2"
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
                
            </v-tab-item>
            <v-tab-item :value="'mobile-tabs-5-2'">
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
                                        href="/read/?blogID=2"
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
            </v-tab-item>
            <v-tab-item :value="'mobile-tabs-5-3'">
                <v-card flat>
                    <div v-if="this.tagResults.length==0">
                        <v-card-text v-text="defaultText"></v-card-text>
                    </div>
                    <div v-else>
                        <v-container>
                            <v-row>
                                <v-chip
                                    class="ma-2"
                                    color="primary"
                                    v-for="(tagResult, i) in this.tagResults" 
                                    :key="i"
                                    @click="convertPage(tagResult.name)"
                                >
                                    {{tagResult.name}}
                                </v-chip>
                            </v-row>
                        </v-container>
                    </div>
                </v-card>
            </v-tab-item>
            <v-tab-item :value="'mobile-tabs-5-4'">
                <div v-if="this.userbioResults.length==0">
                    <v-card-text v-text="defaultText"></v-card-text>
                </div>
                <div v-else>
                    <v-list three-line>
                        <v-list-item
                            v-for="(userbioResult, i) in this.userbioResults" 
                            :key="i"
                        >
                            <v-list-item-avatar size="58" >
                                <v-img v-bind:src="userbioResult.photo" alt="John" ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-html="userbioResult.name"></v-list-item-title>
                                <v-list-item-subtitle v-html="userbioResult.bio"></v-list-item-subtitle>
                            </v-list-item-content>
                            <div v-if="followFlag[i]==0">
                                <v-btn
                                    color="primary"
                                    depressed
                                    @click="createFollow(userbioResult.id, i)"
                                >
                                    <v-icon left>{{followIcon}}</v-icon>
                                    Follow
                                </v-btn>
                            </div>
                            <div v-else-if="followFlag[i]==1">
                                <div>
                                    <v-icon left color="primary">{{followIcon}}</v-icon>
                                    Following ...
                                </div>
                            </div>
                            <div v-else>
                                <div>
                                    <v-icon left color="primary">{{followIcon}}</v-icon>
                                </div>
                            </div>
                        </v-list-item>
                    </v-list>
                </div>
                
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import { mdiNoteMultiple, mdiAccountTieVoice, mdiAccountMultiplePlus } from '@mdi/js';
import { mapState } from 'vuex'; 

export default {
    name: 'Search',
    data() {
        return {
            tabs: null,
            blogsIcon: mdiNoteMultiple,
            followIcon: mdiAccountMultiplePlus,
            responsesIcon: mdiAccountTieVoice,
            defaultText: 'Make sure all words are spelled correctly. Try different keywords. Try more general keywords.',
            followFlag: { }
        }
    },
    computed: {
        ...mapState(['keyword', 'topicResults', 'contentResults', 'userbioResults', 'tagResults'])
    },
    methods: {
        createFollow(userId, flagId) {
            let params = {
                userId: userId
            }
            this.$store.dispatch('createFollow', params)
            .then(res => {
                this.followFlag[flagId] = 1;
            })
            .catch(err => {
                console.log(err);
            })
        },
        convertPage(tagName) {
            var convertURL = '/tag/?name=' + tagName;
            this.$router.push({ path: convertURL });
        }
    },
    updated() {
        console.log(this.$store.state.tagResults);
        let myFollow = { };
        this.$store.dispatch('getFollow')
        .then((res) => {
            myFollow = res.data;
            for ( var i = 0; i < this.userbioResults.length; i++ ) {
                this.followFlag[i] = 0;
                for ( var j = 0; j < myFollow.length; j++ ) {
                    if (this.userbioResults[i].id == myFollow[j].receiver) {
                        this.followFlag[i] = 1;
                    } else if (this.userbioResults[i].id == myFollow[j].sender) {
                        this.followFlag[i] = 2;
                    }
                }
            }
            // console.log(this.followFlag);
        })
        .catch((err) => {
            console.log(err);
        })
    }
};
</script>

<style >

</style>