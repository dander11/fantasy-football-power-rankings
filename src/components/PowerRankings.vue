<template>
  <div id="powerRanking" class=".table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th colspan="5" scope="col">
            <h3>Power Rankings: Week {{week}} 2019</h3>
          </th>
        </tr>
        <tr>
          <th class="center">
            <b>Rank</b>
          </th>
          <th colspan="2" class="center">
            <b>Team / Record</b>
          </th>
          <th class="center">
            <b>Trending</b>
          </th>
          <th class="center">
            <b>Comments</b>
          </th>
        </tr>
        <TeamRanking v-for="rank in rankings" v-bind:key="rank.teamName" v-bind="rank" />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import TeamRanking from "./TeamRanking.vue";
export default {
  name: "PowerRankings",
  components: {
    TeamRanking
  },
  props: {
    rankings: Array,
    week: Number
  }
};
</script>