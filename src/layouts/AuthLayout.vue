<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="label_outline"
          no-caps
          flat
          dense
          label="Login"
        />
        <!-- <q-btn
          v-else
          class="absolute-right q-pr-sm"
          icon="call_missed_outgoing"
          no-caps
          flat
          dense>
          Logout<br />
        </q-btn> -->

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  
};
</script>

<style lang="stylus">
.q-toolbar
  .q-btn
    line-height: 1.2
</style>