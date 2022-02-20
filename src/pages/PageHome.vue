<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <!-- q-col-gutter-md=> All this for Tweet button -->
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            class="new-tweet"
            v-model="newTweet"
            placeholder="What`s happening?"
            maxlength="280"
            bottom-slots
            counter
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img
                  src="https://secure.gravatar.com/avatar/ae2f0dc5708743b65c19baeac2a70c47"
                />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <!-- if i have not added the Shrink then the both Tweet and Button get remain close to each other -->
        <div class="col col-shrink">
          <q-btn
            :disable="!newTweet"
            @click="addNewTweet"
            class="q-mb-lg"
            color="primary"
            label="Tweet"
            rounded
            unelevated
            no-caps
          />
        </div>
      </div>

      <q-separator class="divider" color="grey-2" size="10px" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item v-for="tweet in tweets" :key="tweet.id" class="tweet q-py-md">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img
                  src="https://secure.gravatar.com/avatar/ae2f0dc5708743b65c19baeac2a70c47"
                />
              </q-avatar>
            </q-item-section>
            <!-- <pre>{{ users }}</pre> -->
            <q-item-section v-for="(user, index) in users" :key="index">
              <q-item-label class="text-subtitle1">
                <strong> {{ user.name }} </strong>
                <span class="text-grey-7">
                  {{ user.username }}
                  <br class="lt-md" />
                  &bull; {{ relativeDate(tweet.date) }}
                </span>
              </q-item-label>

              <q-item-label class="tweet-content text-body1">
                {{ tweet.content }}
              </q-item-label>
              <div class="Tweet-icons row justify-between q-mt-sm">
                <q-btn
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                  flat
                  round
                ></q-btn>
                <q-btn
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                  flat
                  round
                ></q-btn>
                <q-btn
                  @click="toggleLiked(tweet)"
                  :color="tweet.liked ? 'pink' : 'grey'"
                  :icon="tweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                  flat
                  round
                ></q-btn>
                <q-btn
                  @click="deleteTweet(tweet)"
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                  flat
                  round
                ></q-btn>
              </div>
            </q-item-section>

            <!-- <q-item-section side top> {{ tweet.date | relativeDate }} </q-item-section> -->
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { db } from "src/boot/firebase";
import { formatDistance } from "date-fns";
export default {
  name: "PageHome",
  data() {
    return {
      newTweet: "",
      tweets: [
        // {
        //   id: 'ID1',
        //   content: "Be your own hero, its cheaper than a movie ticket.",
        //   date: 1644158946461,
        //   liked: false
        // },
        // {
        //   id: 'ID1',
        //   content: `Fugit sed fuga repudiandae odio alias dolorum soluta consequuntur numquam quae assumenda atque, Accusantium earum accusamus eius magni
        //   natus rerum ut`,
        //   date: 1644158981439,
        //   liked: true
        // },
      ],
      users: [
        // {
        //   name: 'Rishiraj Mishra',
        //   username: '@rishi_21',
        // }
      ],
    };
  },
  methods: {
    addNewTweet() {
      let newTweetAdding = {
        content: this.newTweet,
        date: Date.now(),
        liked: false,
      };
      // this.tweets.unshift(newTweetAdding)
      db.collection("tweets")
        .add(newTweetAdding)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      this.newTweet = "";
    },
    deleteTweet(tweet) {
      db.collection("tweets")
        .doc(tweet.id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
    toggleLiked(tweet) {
      db.collection("tweets")
        .doc(tweet.id)
        .update({
          liked: !tweet.liked,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },

    relativeDate(value) {
      return formatDistance(value, new Date());
    },
    getTweets() {
    db.collection("tweets")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let tweetChange = change.doc.data();
          tweetChange.id = change.doc.id;
          if (change.type === "added") {
            // console.log('New tweet: ', tweetChange)
            this.tweets.unshift(tweetChange);
          }
          if (change.type === "modified") {
            // console.log('Modified tweet: ', tweetChange)
            let index = this.tweets.findIndex(
              (tweet) => tweet.id === tweetChange.id
            );
            Object.assign(this.tweets[index], tweetChange);
          }
          if (change.type === "removed") {
            // console.log('Removed tweet: ', tweetChange)
            let index = this.tweets.findIndex(
              (tweet) => tweet.id === tweetChange.id
            );
            this.tweets.splice(index, 1);
          }
        })
      })
    },
    getUserandUsername(){
      db.collection("users")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc)=>{
          console.log(doc.id, "->", doc);
          this.users.unshift(doc.data());
        });
      });
    }
  },
  created(){
    this.getTweets();
    this.getUserandUsername();
  }
};
</script>
<style lang="sass">
.new-tweet
  textarea
    font-size: 19px
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.tweet-content
  white-space: pre-line

.Tweet-icons
  margin-left: -5px

.tweet:not(:first-child)
  border-top: 1px solid rgba(0,0,0,0.12)
</style>
