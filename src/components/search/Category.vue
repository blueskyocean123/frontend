<template>
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
</template>

<script>
    import { mapState } from 'vuex'; 
    export default {
        name: 'Category',
        data() {
            return {
                defaultText: 'Make sure all words are spelled correctly. Try different keywords. Try more general keywords.'
            }
        },
        computed: {
            ...mapState(['tagResults'])
        },
        methods: {
            convertPage(tagName) {
                var convertURL = '/tag/?name=' + tagName;
                this.$router.push({ path: convertURL });
            }
        },
        beforeCreate() {
            this.$store.dispatch('searchTag')
            .then(res => { })
            .catch(error => { });
        }
    };
</script>

<style >

</style>