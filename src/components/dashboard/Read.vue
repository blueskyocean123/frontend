<template>
  <main>  
    <v-container>
      <v-row align="center">
        <v-col>
          <v-list-item>
            <v-list-item-avatar>
              <v-img v-bind:src="this.blogInfo.createdBy_user.photo" alt="John" ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="this.blogInfo.createdBy_user.name"></v-list-item-title>
              <v-list-item-subtitle v-html="this.blogInfo.createdAt"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col align="center">
          <div v-if="followType==1">
            <v-btn
              color="primary"
              depressed
              @click="createFollow"
            >
              <v-icon left>{{followIcon}}</v-icon>
              Follow
            </v-btn>
          </div>
          <div v-else-if="followType==2">
            <v-btn
              color="grey"
              depressed
              @click="deleteFollow"
            >
              <v-icon left>{{followIcon}}</v-icon>
              Following
            </v-btn>
          </div>
          <div v-else>
            
          </div>
        </v-col>
      </v-row>
      <br>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col>
            <div v-html="this.blogInfo.topic"></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div v-html="this.blogInfo.content"></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-chip
                class="ma-2"
                color="grey"
                v-for="(tagInfo, i) in this.getTagsInfo" 
                :key="i"
            >
                {{tagInfo.tag.name}}
            </v-chip>   
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12" md="1">
            <div v-if="clapType==1">
              <v-btn
                icon
                height=36
                width=36
                color="primary"
                @click="createClap"
              >
                <v-icon size=24>{{clapIcon}}</v-icon>
              </v-btn>
              &nbsp;{{clapNum}}
            </div>
            <div v-else>
              <v-btn
                icon
                height=36
                width=36
                color="primary"
                disabled
              >
                <v-icon size=24>{{clapIcon}}</v-icon>
              </v-btn>
              &nbsp;{{clapNum}}
            </div>
          </v-col>
          <v-col cols="12" md="1">
            <v-btn
              icon
              height=36
              width=36
              color="primary"
              @click="drawer=!drawer"
            >
              <v-icon size=24>{{commentIcon}}</v-icon>
            </v-btn>
            &nbsp;{{comments.length}}
          </v-col>
        </v-row>
      </v-container>
      <v-navigation-drawer
        v-model="drawer" 
        temporary 
        fixed 
        right 
        width=380
      >
        <v-toolbar
          color="primary"
          dark
        >
          <v-icon color="grey">
            {{commentIcon}}
          </v-icon>
          <v-toolbar-title>&nbsp;Comments</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list>
          <v-subheader>Recent comment</v-subheader>
          <v-list-item
            v-for="(comment, i) in this.comments" 
            :key="i"
          >
            <span v-for="n in comment.depth" :key="n">&emsp;</span>
            <v-list-item-icon>
              <v-avatar class="ma-2">
                <v-img v-bind:src="comment.createdBy_user.photo" alt="John" ></v-img>
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{comment.createdBy_user.name}}</v-list-item-title>
              <v-list-item-subtitle>
                <v-textarea
                  v-model="comment.content"
                  disabled
                  auto-grow
                  rows="1"
                ></v-textarea>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <a @click="loadInput(comment.id)">Reply</a>
              </v-list-item-subtitle>
              <div style="display: none;" :id="comment.id">
                <v-textarea
                  v-model="nestedComment"
                  append-outer-icon="mdi-send"
                  class="mx-2"
                  label="Please write your reply"
                  rows="1"
                  auto-grow
                  @click:append-outer="sendNestedComment(comment.id, comment.blog_id)"
                  @click:clear="clearMessage"
                ></v-textarea>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="originComment"
                  :append-outer-icon="'mdi-send'"
                  filled
                  clearable
                  label="Please write your comment"
                  type="text"
                  @click:append-outer="sendOriginComment(blogInfo.comment_id, blogInfo.id)"
                  @click:clear="clearMessage"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-navigation-drawer>
    </v-container>    
  </main>
</template>

<script>
import { mapState } from 'vuex';
import { mdiHandClap, mdiAccountMultiplePlus, mdiCommentTextMultipleOutline } from '@mdi/js';

export default {
  name: 'Read',
  computed: {
    ...mapState(['blogInfo', 'comments', 'userInfo', 'clapType', 'clapNum', 'followType', 'getTagsInfo'])
  },
  data: () => ({
    commentIcon: mdiCommentTextMultipleOutline,
    clapIcon: mdiHandClap,
    followIcon: mdiAccountMultiplePlus,
    originComment: '',
    marker: true,
    nestedComment: '',
    drawer: false
  }),
  methods: {
    toggleMarker () {
      this.marker = !this.marker
    },
    loadInput(id) {
      var x = document.getElementById(id);
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },
    sendNestedComment(parentId, blogId) {
      let params = {
        blogId: blogId,
        commentId: parentId,
        content: this.nestedComment
      }
      this.$store.dispatch('commitComment', params)
      .then((res) => {
          console.log(res);
      })
      .catch((err) => {
          console.log(err);
      })
      var x = document.getElementById(parentId);
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },
    sendOriginComment (parentId, blogId) {
      let params = {
        blogId: blogId,
        commentId: parentId,
        content: this.originComment
      }
      this.$store.dispatch('commitComment', params)
      .then((res) => {
          console.log(res);
      })
      .catch((err) => {
          console.log(err);
      })
    },
    clearMessage () {
      this.message = ''
    },
    createFollow() {
      let params = {
        userId: this.blogInfo.createdBy
      }
      this.$store.dispatch('createFollow', params)
      .then((res) => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteFollow() {
      let params = {
        loginUserId: this.userInfo.id,
        blogUserId: this.blogInfo.createdBy
      }
      this.$store.dispatch('deleteFollow', params)
      .then(res => {

      })
      .catch(err => {
        console.log(err);
      })
    },
    createClap() {
      let params = {
        blogId: this.$route.query.blogID
      }
      this.$store.dispatch('createClap', params)
      .then(res => {
        this.$store.dispatch('getClapNum', this.$route.query.blogID)
        .then(res => {
          this.$store.dispatch('checkClap', this.$route.query.blogID)
          .then(res => {
            // if (res.data.msg < 2) this.claptype = 1;
            // else this.claptype = 2;
          })
          .catch(error => {
            console.log(error);
          })
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('getProfile')
    .then((res) => { 
      this.$store.dispatch('readBlog', this.$route.query.blogID)
      .then((res) => {
        console.log(this.$store.state.blogInfo);
        if (this.blogInfo.createdBy != this.userInfo.id) {
          this.$store.dispatch('checkFollow', this.blogInfo.createdBy)
          .then(res => {
            // console.log(res);
          })
          .catch(error => {
            console.log(error);
          })

          this.$store.dispatch('checkClap', this.$route.query.blogID)
          .then(res => {
            
          })
          .catch(error => {
            console.log(error);
          })
        }
      })
      .catch((error) => {
        alert(error);
      });
    });    
    await this.$store.dispatch('readComment', this.$route.query.blogID)
    .then((res) => {
      // console.log(this.comments); 
    })
    .catch((error) => {
      alert(error);
    });
    await this.$store.dispatch('getClapNum', this.$route.query.blogID)
    .then(res => {
      // this.clapNum = res.data.msg;
    })
    .catch(err => {
      console.log(err);
    });
    await this.$store.dispatch('getTag', this.$route.query.blogID)
    .then(res => {
      // console.log(this.$store.state.getTagsInfo);
    })
    .catch(err => {
      console.log(err);
    })
  }
}
</script>

<style scoped>
.posts >>> p {
  color: blue;
}
.v-progress-circular {
  margin: 1rem;
}
.button {
  border: none;
  color: white;
  padding: 5px 7px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 1px 1px;
  cursor: pointer;
}
.input {
  font-size: 16px;
  font-size: max(16px, 1em);
  font-family: inherit;
  padding: 0.25em 0.5em;
  background-color: #fff;
  border: 2px solid var(--input-border);
  border-radius: 4px;
}

.button1 {background-color: #4CAF50;} /* Green */
.button2 {background-color: #008CBA;} /* Blue */

</style>
