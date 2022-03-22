import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex) //vue에 Vuex를 설정

export default new Vuex.Store({
  state: {
    host: 'http://localhost:8080',
    accessToken: null,
    refreshToken: null,
    userInfo: { 
      photo: ''
    },
    blogs: { },
    blogInfo: {
      createdBy_user:{ }
    },
    comments: { },
    sortTagsInfo: { },
    getTagsInfo: { },
    keyword: '',
    topicResults: { },
    contentResults: { },
    userbioResults: { },
    tagResults: { },
    tagBlogs: { },
    clapType: 0,
    clapNum: { },
    followType: 0,
    followFlags: []
  },
  mutations: {
    initToken (state, payload) {
      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    refreshToken(state, payload) { // accessToken 재셋팅
      localStorage.setItem('accessToken', payload.newAcsToken);
      //localStorage.setItem('refreshToken', payload.refreshToken);
      state.accessToken = payload.newAcsToken;
      //state.refreshToken = payload.refreshToken;
    },
    removeToken () {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    getBlogs(state, payload) {
      state.blogs = payload;
      for (var i = 0; i < state.blogs.length; i++) {
        state.blogs[i].topic = state.blogs[i].topic.replace(/(<([^>]+)>)/ig,"");      
        const div = document.createElement('div')
        div.innerHTML = state.blogs[i].content;
        const img = div.querySelector('img');
        if (img != null) state.blogs[i].image = img.src;
        else state.blogs[i].image = '';
        state.blogs[i].content = state.blogs[i].content.replace(/(<([^>]+)>)/ig,"");
        state.blogs[i].createdAt = state.blogs[i].createdAt.replace(/(<([^>]+)>)/ig,"").substring(0, 10);
      } 
    },
    getBlogInfo(state, payload) {
      state.blogInfo = payload;
    },
    getComments(state, payload) {
      state.comments = payload;
      for (var i = 0; i < state.comments.length; i++) {
        state.comments[i].id = state.comments[i].id.toString();
      }
    },
    getUserInfo(state, payload) {
      state.userInfo = payload;
    },
    // getKeyword(state, payload) {
    //   state.keyword = payload;
    // },
    getTopicResults(state, payload) {
      state.topicResults = payload;
      for (var i = 0; i < state.topicResults.length; i++) {
        state.topicResults[i].topic = state.topicResults[i].topic.replace(/(<([^>]+)>)/ig,"");        
        const div = document.createElement('div')
        div.innerHTML = state.topicResults[i].content;
        const img = div.querySelector('img');
        state.topicResults[i].image = img.src;
        state.topicResults[i].content = state.topicResults[i].content.replace(/(<([^>]+)>)/ig,"");
        state.topicResults[i].createdAt = state.topicResults[i].createdAt.replace(/(<([^>]+)>)/ig,"").substring(0, 10);
      }
    },
    getContentResults(state, payload) {
      state.contentResults = payload;
      for (var i = 0; i < state.contentResults.length; i++) {
        state.contentResults[i].topic = state.contentResults[i].topic.replace(/(<([^>]+)>)/ig,"");
        const div = document.createElement('div')
        div.innerHTML = state.contentResults[i].content;
        const img = div.querySelector('img');
        state.contentResults[i].image = img.src;
        state.contentResults[i].content = state.contentResults[i].content.replace(/(<([^>]+)>)/ig,"");
        state.contentResults[i].createdAt = state.contentResults[i].createdAt.replace(/(<([^>]+)>)/ig,"").substring(0, 10);
      } 
    },
    getTagResults(state, payload) {
      state.tagResults = payload;
    },
    getTagBlogs(state, payload) {
      state.tagBlogs = payload;
      for (var i = 0; i < state.tagBlogs.length; i++) {
        for (var j = 0; j < state.tagBlogs[i].classifies.length; j++) {
          state.tagBlogs[i].classifies[j].blog.topic = state.tagBlogs[i].classifies[j].blog.topic.replace(/(<([^>]+)>)/ig,"");
          const div = document.createElement('div')
          div.innerHTML = state.tagBlogs[i].classifies[j].blog.content;
          const img = div.querySelector('img');
          state.tagBlogs[i].classifies[j].blog.image = img.src;
          state.tagBlogs[i].classifies[j].blog.content = state.tagBlogs[i].classifies[j].blog.content.replace(/(<([^>]+)>)/ig,"");
          state.tagBlogs[i].classifies[j].blog.createdAt = state.tagBlogs[i].classifies[j].blog.createdAt.replace(/(<([^>]+)>)/ig,"");
        }
      } 
    },
    getuserbioResults(state, payload) {
      state.userbioResults = payload;
      for ( var i = 0; i < state.userbioResults.length; i++ ) state.followFlags.push(0);
    },
    iniUserbioResults(state, payload) {
      if (state.userbioResults) {
        // for ( var i = 0; i < state.userbioResults.length; i++ ) {
        //   state.userbioResults[i].followFlag = 0;
        //   for ( var j = 0; j < payload.data.length; j++ ) {
        //     if (state.userbioResults[i].id == payload.data[j].receiver) {
        //       state.userbioResults[i].followFlag = 1;
        //     }
        //   }
        // }
        for ( var i = 0; i < state.userbioResults.length; i++ ) {
          for ( var j = 0; j < payload.data.length; j++ ) {
            if (state.userbioResults[i].id == payload.data[j].receiver) {
              state.followFlags[i] = 1;
            }
          }
        }
      }
    },
    sortTagsInfo(state, payload) {
      state.sortTagsInfo = payload;
    },
    getTagsInfo(state, payload) {
      state.getTagsInfo = payload;
    },
    getClapType(state, payload) {
      if (payload.msg < 2) state.clapType = 1;
      else state.clapType = 2;
    },
    getFollowType(state, payload) {
      if (payload.msg == 'non-existed') state.followType = 1;
      else if (payload.msg == 'existed') state.followType = 2;
      else state.followType = 0;
    },
    getClapNum(state, payload) {
      state.clapNum = payload.msg;
    }
  },
  getters: {
    // 쿠키에 저장된 토큰 가져오기
    getToken (state) {
      let ac = localStorage.getItem('accessToken');
      let rf = localStorage.getItem('refreshToken');
      return {
        access: ac,
        refresh: rf
      };
    },
    followFlags (state) {
      return state.followFlags;
    },
    getKeyword (state) {
      let keyword = localStorage.getItem('searchKeyword');
      return keyword;
    }
  },
  actions: {
    // auth part
    emailLogInInit: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/user/auth/login', params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    emailLogInEnd: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/user/auth/login/?authcode=' + params.authcode + '&email=' + params.email)
        .then(res => {
          commit('initToken', res.data.data);
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    emailSignUpInit: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/user/auth/signup', params)
        .then(res => {
          // commit('tokenInit', res.data.data);
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    emailSignUpEnd: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        const signupURL = 'http://3.88.169.40:84/user/auth/signup/?authcode=' + params.authcode + '&email=' + params.email;
        axios.get(signupURL)
        .then(res => {
          commit('initToken', res.data.data);
          // commit('loginToken', res.data.auth_info);
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },    
    deleteToken: ({commit}) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/user/token/delete').then(res => {
          commit('removeToken');
          resolve(res);
        }).catch(err => {
          console.log('refreshToken error : ', err.config);
          reject(err.config.data);
        })
      })
    },
    refreshToken: ({commit}) => { 
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/user/token/refresh').then(res => {
          commit('refreshToken', res.data.data);
          //console.log(res.data);
          resolve(res.data.data);
        }).catch(err => {
          console.log('refreshToken error : ', err.config);
          reject(err.config.data);
        })
      })
    },
    // oauth part
    gmailLogInEnd: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/user/oauth/login/google', params)
        .then(res => {
          if (res.data.message == 'OAuth success') {
            commit('initToken', res.data.data);
          }
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    gmailSignUpEnd: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/user/oauth/signup/google', params)
        .then(res => {
          if (res.data.message == 'OAuth success') {
            commit('initToken', res.data.data);
          }
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    // blog part
    createBlog: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/blog/create', params)
        .then(res => {
          let newParams = {
            blogId: res.data.id,
            tags: params.tags
          }
          axios.post('http://3.88.169.40:84/blog/tag/create', newParams)
          .then(res=> {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    // imageUpload: ({commit}, params) => {
    //   return new Promise((resolve, reject) => {
    //     axios.post('http://3.88.169.40:84/image/upload', params)
    //     .then(res => {
    //       resolve(res);
    //     })
    //     .catch(err => {
    //       console.log(err.message);
    //       reject(err.message);
    //     });
    //   })
    // },
    readBlog: ({commit}, blogId) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/blog/read/?blogId=' + blogId)
        .then(res => {
          commit('getBlogInfo', res.data);
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    deleteBlog: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/blog/delete', params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    updateBlog: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/blog/update', params)
        .then(res => {
          let secParams = {
            blogId: params.blogId,
            tags: params.tags
          }
          axios.post('http://3.88.169.40:84/blog/tag/init', secParams)
          .then(res=> {
            let thirdParams = {
              blogId: params.blogId,
              tags: params.tags
            }
            axios.post('http://3.88.169.40:84/blog/tag/create', thirdParams)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            })
          })
          .catch(err => {
            reject(err);
          })
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    getGoodBlogs: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/blog/getGoodBlogs')
        .then(res => {
          commit('getBlogs', res.data);
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    uploadImage: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('image', params.imageFile);
        axios.post('http://3.88.169.40:84/image/upload', 
          formData, { 
            headers: { 
              'Content-Type': 'multipart/form-data' 
            }
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        })
      })
    },
    getMyBlogs: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/blog/getMyBlogs')
        .then(res => {
          commit('getBlogs', res.data);
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    getOtherBlogs: ({commit}, userId) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/blog/getOtherBlogs/?userId=' + userId)
        .then(res => {
          commit('getBlogs', res.data);
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    // user part
    getProfile: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/user/profile/read/me')
        .then(res => {
          commit('getUserInfo', res.data)
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    updateProfile: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/user/profile/update/me', params)
        .then(res => {
          // commit('getUserInfo', res.data)
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    // comment part
    readComment: ({commit}, blogId) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/blog/comment/read/?blogId=' + blogId)
        .then(res => {
          // console.log(res.data);
          commit('getComments', res.data);
          resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    commitComment: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/blog/comment/create', params)
        .then(res => {
          if (res.data.msg == "success") {
            axios.get('http://3.88.169.40:84/blog/comment/read/?blogId=' + params.blogId)
            .then(res => {
              // console.log(res.data);
              commit('getComments', res.data);
              resolve(res);
            })
            .catch(err => {
              console.log(err.message);
              reject(err.message);
            });
          } else {
            console.log("failed");
          }
        })
        .catch(err => {
          console.log(err.message);
          reject(err.message);
        });
      })
    },
    //follow part
    createFollow: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/user/follow/create', params)
        .then(res => {
          commit('getFollowType', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        })
      })
    },
    checkFollow: ({commit}, userId) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/user/follow/check/?userId=' + userId)
        .then(res => {
          commit('getFollowType', res.data);
          resolve(res.data);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    deleteFollow: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/user/follow/delete', params)
        .then(res => {
          commit('getFollowType', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        })
      })
    },
    getFollow: ({commit}) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/user/follow/get')
        .then(res => {
          commit('iniUserbioResults', res);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    // clap part
    createClap: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.post('http://3.88.169.40:84/blog/clap/create', params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    getClapNum: ({commit}, blogId) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/blog/clap/get/?blogId=' + blogId)
        .then(res => {
          commit('getClapNum', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    checkClap: ({commit}, blogId) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/blog/clap/check/?blogId=' + blogId)
        .then(res => {
          commit('getClapType', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    // tag part
    sortTags: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/blog/tag/sort')
        .then((res) => {
          commit('sortTagsInfo', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    getTag: ({commit}, blogId) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/blog/tag/get/?blogId=' + blogId)
        .then((res) => {
          commit('getTagsInfo', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    // search part
    searchTopic: ({commit}) => {
      return new Promise((resolve, reject) => {
        let keyword = localStorage.getItem('searchKeyword');
        axios.get('http://3.88.169.40:84/blog/search/topic/?keyword=' + keyword)
        .then((res) => {
          commit('getTopicResults', res.data.foundBlog);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    searchTag: ({commit}) => {
      return new Promise((resolve, reject) => {
        let keyword = localStorage.getItem('searchKeyword');
        axios.get('http://3.88.169.40:84/blog/search/tag/?keyword=' + keyword)
        .then(res => {
          commit('getTagResults', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    searchTagBlogs: ({commit}, tagName) => {
      return new Promise((resolve, reject) => {
        axios.get('http://3.88.169.40:84/blog/search/tagBlog/?name=' + tagName)
        .then(res => {
          commit('getTagBlogs', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    searchContent: ({commit}) => {
      return new Promise((resolve, reject) => {        
        let keyword = localStorage.getItem('searchKeyword');
        axios.get('http://3.88.169.40:84/blog/search/content/?keyword=' + keyword)
        .then(res => {
          commit('getContentResults', res.data.foundBlog);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    },
    searchUserBioinfo: ({commit}) => {
      return new Promise((resolve, reject) => {
        let keyword = localStorage.getItem('searchKeyword');
        axios.get('http://3.88.169.40:84/blog/search/userbio/?keyword=' + keyword)
        .then(res => {
          commit('getuserbioResults', res.data.foundUser);
          resolve(res);
        })
        .catch(err => {
          reject(err.message);
        });
      })
    }
  }
})