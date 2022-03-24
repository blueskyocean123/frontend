<template>
    <v-container>
        <span class="tab"></span>
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    color="primary" 
                    class="ma-2 white--text" 
                    rounded 
                    type="submit"
                    v-bind="attrs"
                    v-on="on"
                >
                    PUBLISH
                    <v-icon right dark>
                        mdi-cloud-upload
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Add tags to your blog
                </v-card-title>

                <v-card-text>
                    Add or change tags so readers know what your story is about.
                    <br><br>
                    <v-combobox
                        v-model="chips"
                        chips
                        clearable
                        label="Your favorite hobbies"
                        multiple
                        prepend-icon="mdi-filter-variant"
                        solo
                    >
                        <template v-slot:selection="{ attrs, item, select, selected }">
                        <v-chip
                            v-bind="attrs"
                            :input-value="selected"
                            close
                            @click="select"
                            @click:close="remove(item)"
                        >
                            <strong>{{ item }}</strong>&nbsp;
                        </v-chip>
                        </template>
                    </v-combobox>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="updateBlog"
                    >
                        Publish Now
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-row>
            <EditorMenuBar :editor="editor1" v-slot="{ commands, isActive }">
                <div>
                    <v-btn text icon
                    :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                    @click="commands.heading({level: 1})"
                    >
                        <b> H1 </b>
                    </v-btn>
                    <v-btn text icon
                    :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                    @click="commands.heading({level: 2})"
                    >
                        <b> H2 </b>
                    </v-btn>
                    
                    <v-btn text icon
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                    >
                        <v-icon>mdi-format-bold</v-icon>
                    </v-btn>

                    <v-btn text icon
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                    >
                        <v-icon>mdi-format-italic</v-icon>
                    </v-btn>
                </div>            
            </EditorMenuBar>
        </v-row>
        <v-row>
            <v-col cols=12 >
                <editor-content class="editor-box" :editor="editor1"/>
            </v-col>
        </v-row>
        <br><br><br><br><br>
        <v-row>
            <EditorMenuBar :editor="editor2" v-slot="{ commands, isActive }">
                <div>
                    <v-btn 
                        text icon
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({level: 1})"
                    >
                        <b> H1 </b>
                    </v-btn>                    
                    <v-btn 
                        text icon
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({level: 2})"
                    >
                        <b> H2 </b>
                    </v-btn>
                    <v-btn 
                        text icon
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({level: 3})"
                    >
                        <b> H3 </b>
                    </v-btn>
                    <v-btn 
                        text icon
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                    >
                        <v-icon>mdi-format-bold</v-icon>
                    </v-btn>
                    <v-btn 
                        text icon
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline"
                    >
                        <v-icon>mdi-format-underline</v-icon>
                    </v-btn>
                    <v-btn 
                        text icon
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                    >
                        <v-icon>mdi-format-italic</v-icon>
                    </v-btn>

                    <v-btn 
                        text icon
                        @click="openModal(commands.image)"
                    >
                        <v-icon>mdi-image</v-icon>
                    </v-btn>
                </div>
            </EditorMenuBar>
        </v-row>
        <v-row>
            <v-col cols=12 >
                <editor-content class="editor-box" :editor="editor2"/>
            </v-col>
        </v-row>        
        <Modal ref="ytmodal" @onConfirm="addCommand" />
    </v-container>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { Bold, Italic, Strike, Underline, Image, Heading } from "tiptap-extensions";
import Modal from "../other/ImageUpload";

let topic, content;
export default {
    name: 'Write',
    components: {
        EditorContent,
        EditorMenuBar,
        Modal
    },
    props: {
        content: {
        type: String,
        default: ""
        }
    },
    data() {
        return {
            editor1: null,
            editor2: null,
            dialog: false,
            chips: ['Programming', 'Playing video games', 'Watching movies', 'Sleeping']
        };
    },
    beforeCreate() {
        this.$store.dispatch('readBlog', this.$route.query.blogId)
        .then((res) => {
            console.log(res.data);
            this.editor1 = new Editor({
                extensions: [
                    new Bold(),
                    new Italic(),
                    new Heading({
                        levels: [1, 2]
                    })
                ],
                content: res.data.topic,
                onUpdate: ({ getHTML }) => {
                    topic = getHTML();
                }
            });
            this.editor2 = new Editor({
                extensions: [
                    new Bold(),
                    new Italic(),
                    new Strike(),
                    new Image(),
                    new Underline(),
                    new Heading({
                        levels: [1, 2, 3]
                    })
                ],
                content: res.data.content,
                onUpdate: ({ getHTML }) => {
                    content = getHTML();
                }
            })
        })
        .catch((error) => {
            alert(error);
        })
    },
    mounted() {
        this.setContent();
    },
    beforeDestroy() {
        this.editor1.destroy();
        this.editor2.destroy();
    },
    methods: {
        updateBlog() {
            if (topic == "" || content == "") {
                alert("Please compose your blog correctly.");
            } else {
                let params = {
                    topic: topic,
                    content: content,
                    tags: this.chips,
                    blogId: this.$route.query.blogId
                };
                this.$store.dispatch('updateBlog', params)
                .then((res) => {
                    console.log(res);
                    this.$router.push({ path: '/list' });
                })
                .catch((error) => {
                    alert(error);
                })
            }            
        },
        remove (item) {
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
        },
        openModal(command) {
            this.$refs.ytmodal.showModal(command);
        },
        addCommand(data) {
            if (data.command !== null) {
                data.command(data.data);
            }
        },
        setContent() {
            this.editor1.setContent(this.content);
            this.editor2.setContent(this.content);
        }
    }
};
</script>

<style >
.editor-box> * {
    border-color: grey;
    border-style: solid;
    border-width: 1px;
}

.tab {
    display: inline-block;
    margin-left: 900px;
}

.is-active{
    border-color: grey;
    border-style: solid;
    border-width: 1px;
}
 /* *:focus {
    outline: none;
}  */
</style>