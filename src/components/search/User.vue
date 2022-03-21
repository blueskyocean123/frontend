<template>
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
                <div v-if="followFlags[i]==0">
                    <v-btn
                        color="primary"
                        depressed
                        @click="createFollow(userbioResult.id, i)"
                    >
                        <v-icon left>{{followIcon}}</v-icon>
                        Follow
                    </v-btn>
                </div>
                <div v-else-if="followFlags[i]==1">
                    <v-btn
                        color="grey"
                        depressed
                        @click="deleteFollow(userbioResult.id, i)"
                    >
                    <v-icon left>{{followIcon}}</v-icon>
                        Following
                    </v-btn>
                </div>
                <div v-else>
                    <h1>what is this</h1>
                </div> 
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
import { mdiAccountMultiplePlus } from '@mdi/js';
import { mapState, mapGetters } from 'vuex'; 
import store from '@/store';

export default {
    name: 'User',
    data() {
        return {
            followIcon: mdiAccountMultiplePlus,
            defaultText: 'Make sure all words are spelled correctly. Try different keywords. Try more general keywords.',
        }
    },
    computed: {
        ...mapState(['userbioResults']),
        ...mapGetters(['followFlags']),
    },
    methods: {
        createFollow(userId, flagId) {
            let params = {
                userId: userId
            }
            this.$store.dispatch('createFollow', params)
            .then(res => {
                this.$router.go();
            })
            .catch(err => {
                console.log(err);
            })
        },
        deleteFollow(userId, flagId) {
            let params = {
                userId: userId
            }
            this.$store.dispatch('deleteFollow', params)
            .then(res => {
                this.$router.go();
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    async beforeRouteEnter(from, to, next) {
        Promise.all([
            store.dispatch('searchUserBioinfo'),
            store.dispatch('getFollow')
        ]).finally(() => {
           return next();
        })
    }
};
</script>

<style >

</style>