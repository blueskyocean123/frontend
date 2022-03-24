<template>
    <div id="inspire">
        <v-navigation-drawer 
            v-model="drawer"         
            app
        >
            <v-sheet 
                class="pa-4" 
                align="center"
                justify="center"
            >
                <v-avatar 
                    class="mb-4"
                    color="primary"
                    size="64" 
                >
                    <v-icon x-large dark>widgets</v-icon>
                </v-avatar>                
                <h1>Blog House</h1>
            </v-sheet>
            <br><br><br>
            <main>
                <v-list>
                <v-list-item
                    v-for="[icon, text, href] in links"
                    :key="icon"
                    link
                    :href="href"
                    color="primary darken-1" 
                >
                    <v-list-item-icon color="primary darken-1" >
                        <v-icon color="primary darken-1" >{{icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content color="primary darken-1" >
                        <v-list-item-title color="primary darken-1" >{{text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            </main>
            <template v-slot:append>
                <v-sheet
                    align="center"
                    justify="center"
                >
                    <v-menu bottom>
                        <template v-slot:activator="{on,attrs}">
                            <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                height=48
                                width=48
                            >
                                <v-avatar 
                                    color="primary"
                                    size="48" 
                                >
                                    <v-img
                                        :src="thename"
                                    ></v-img>
                                </v-avatar>
                            </v-btn>
                            <br><v-spacer></v-spacer><br>
                        </template>
                        <v-list>
                            <v-list-item :href="googlehref">
                                <v-list-item-title>Profile Setting</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="logout">
                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-sheet>
            </template>
        </v-navigation-drawer>
        <v-container>
            <router-view />
        </v-container>
        <v-navigation-drawer
            app
            clipped
            right
            width=360
        >
            <br>
            <v-list>
                <v-list-item>
                    <v-text-field 
                        label="Search Word" 
                        outlined
                        rounded
                        :prepend-inner-icon="searchIcon"
                        @keydown.enter="searchSubmit"
                        v-model="keyword"
                    ></v-text-field>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <br>
            <h3>&emsp;&emsp;Recommended topics</h3>
            <br>
            <v-chip
                class="ma-2"
                color="primary"
                v-for="(tagInfo, i) in this.sortTagsInfo" 
                :key="i"
            >
                {{tagInfo.name}}
            </v-chip>              
        </v-navigation-drawer>
    </div>
</template>

<script>
import {
    mdiAccountTie,
    mdiHomeAnalytics, 
    mdiPencilBoxOutline,
    mdiMessageBadge,
    mdiFormatListGroup,
    mdiMagnify 
} from '@mdi/js';
import { mapState } from 'vuex';

export default {
    data: () => ({
        userLink: mdiAccountTie,
        drawer: null,
        thename: 'asdf',
        links: [
            [mdiHomeAnalytics, 'Home', '/home'],
            [mdiFormatListGroup, 'List', '/list'],
            [mdiPencilBoxOutline, 'Write', '/write'],
            [mdiMessageBadge, 'Notification', '/notification'],
        ],
        searchIcon: mdiMagnify,
        googlehref: '/profile',
        keyword:''        
    }),
    computed: {
        ...mapState(['userInfo', 'sortTagsInfo'])
    },
    mounted() {
        if (localStorage.getItem('accessToken') == null && localStorage.getItem('refreshToken') == null) { //다 없으면 로그인 페이지로
            this.$router.push({name: 'Landing'}).catch(() => {}); 
        } else {
            this.$store.dispatch('getProfile')
            .then((res) => {
                this.thename = this.userInfo.photo;
                // console.log(this.userInfo);
            })
            .catch((err) => {
                console.log(err);
            });
            this.$store.dispatch('sortTags')
            .then((res) => {
                // console.log(this.$store.state.sortTagsInfo);
            })
            .catch((err) => {
                // console.log();
            });
        }
    },
    methods: {
        searchSubmit() {
            localStorage.setItem('searchKeyword',  this.keyword);
            if (this.$route.path != '/search/topic') this.$router.push({ path: '/search' });
            else {
                this.$router.go();
                this.boxshow = !this.boxshow;
            }
        },
        async logout() {
            await this.$store.dispatch('deleteToken')
            .then((res) => {
                console.log(res);
                this.$router.push({ name: 'Landing' });
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>