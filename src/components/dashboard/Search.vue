<template>
    <div>
        <br>
        <h2>Results for "{{getKeyword}}"</h2>
        <br><br>
        <v-row align="center">
            <v-btn text
                @click="convertToTopic">
                Topic
            </v-btn>
            <v-btn text
                @click="convertToContent">
                Content
            </v-btn>
            <v-btn text
                @click="convertToCategory">
                Category
            </v-btn>
            <v-btn text
                @click="convertToUser">
                User
            </v-btn>
        </v-row><br>
        <v-divider></v-divider>
        <v-container>
            <router-view />
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'; 

export default {
    name: 'Search',
    computed: {
        ...mapGetters(['getKeyword']),
    },    
    methods: {
        convertToUser() {
            if (this.$route.path != '/search/user') this.$router.push({ path: '/search/user' });
        },
        convertToCategory() {
            if (this.$route.path != '/search/category') this.$router.push({ path: '/search/category' });
        },
        convertToTopic() {
            if (this.$route.path != '/search/topic') this.$router.push({ path: '/search/topic' });
        },
        convertToContent() {
            if (this.$route.path != '/search/content') this.$router.push({ path: '/search/content' });
        }
    }
};
</script>