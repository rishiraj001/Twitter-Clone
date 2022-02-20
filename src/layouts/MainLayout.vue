<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-btn
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="call_missed_outgoing"
          color="primary"
          no-caps
          rounded
          flat
          dense
          label="Logout"
        />
        <!-- <q-btn
          @click="logoutUser"
          class="absolute-right q-pr-sm"
          icon="call_missed_outgoing"
          no-caps
          flat
          dense>
          Logout<br />
          {{ userDetails.name }}
        </q-btn> -->

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm"> {{ $route.name }} </span>
          <q-icon
            name="fas fa-dove"
            class="header-icon q-pa-md lt-md"
            size="sm"
            color="primary"
          ></q-icon>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="283"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <q-icon
        name="fas fa-dove"
        class="q-pa-md"
        size="lg"
        color="primary"
      ></q-icon>

      <q-list>
        <q-item to="/" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon color="primary" name="home" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            Home
          </q-item-section>
        </q-item>

        <q-item to="/notification" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon color="primary" name="notifications_none" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            Notifications
          </q-item-section>
        </q-item>

        <q-item to="/messages" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon color="primary" name="mail_outline" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            Messages
          </q-item-section>
        </q-item>

        <q-item to="/bookmarks" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon color="primary" name="bookmark_border" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            Bookmarks
          </q-item-section>
        </q-item>

        <q-item to="/lists" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon color="primary" name="sort" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            Lists
          </q-item-section>
        </q-item>

        <q-item to="/profile" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon color="primary" name="person_outline" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            Profile
          </q-item-section>
        </q-item>

        <q-item to="/more" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon color="primary" name="more_horiz" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            More
          </q-item-section>
        </q-item>

        <q-item to="/about" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon color="primary" name="help" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            About
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-input
        v-model="searchTerm"
        type="text"
        dense
        outlined
        rounded
        class="q-ma-md"
        placeholder="Search Twitter"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list
        v-if="filteredBlogs.length != 0"
        padding 
        separator
      >
        <!-- <pre>{{filteredBlogs}}</pre> -->

        <q-item
          v-for="(items,index) in filteredBlogs"
          :key="index"
          class="q-pa-md"
        >
          <q-item-section>
            <q-item-label overline class="text-grey">
              {{ items.title }}
            </q-item-label>

            <q-item-label class="text-weight-bold">
              {{items.subtitle}}
            </q-item-label>
            <q-item-label caption>
              {{ items.caption }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption> {{ items.time }} </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div v-else>
        No Search Result Found
      </div>
      
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
// import { ref } from "vue";

export default {
  name: "SearchBar",
  data() {
    return {
      leftDrawerOpen :true,
      rightDrawerOpen:true,
      // leftDrawerOpen,
      // toggleLeftDrawer() {
      //   leftDrawerOpen = !leftDrawerOpen;
      // },

      // rightDrawerOpen,
      // toggleRightDrawer() {
      //   rightDrawerOpen = !rightDrawerOpen;
      // },
      
      blogs: [
        {
          title: "Education",
          subtitle: "Something Amazing Happended",
          caption: "Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit",
          time: "5 min ago",
        },
        {
          title: "World News",
          subtitle: "US deploys troops to Europe amid rising tensions over Russia and Ukraine",
          caption: "Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.",
          time: "5 min ago",
        },
        {
          title: "Bollywood",
          subtitle: "Shah Rukh Khan offered a prayer at Lata Mangeshkar's funeral as per Islamic rituals, fact-checkers say",
          caption: "Secondary line text. Lorem ipsum dolor sit amet, consectetur dipiscit elit.",
          time: "5 min ago",
        },
        {
          title: "Beijing",
          subtitle: "Beijing 2022: Follow the action at the Winter Olympics",
          caption: "Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.",
          time: "5 min ago",
        },
        {
          title: "Japan",
          subtitle: "Japan 2022: Follow the action at the Winter Olympics",
          caption: "Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.",
          time: "5 min ago",
        },
      ],
      searchTerm:'',
    };
  },

  computed: {
    filteredBlogs() {
      return this.blogs.filter((blog) => {
        let show = blog.title
          .toLowerCase()
          .match(this.searchTerm.toLowerCase());
        return show;
      });
    },
  },
};
</script>
<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>