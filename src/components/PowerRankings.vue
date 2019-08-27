<template>
  <div id="powerRanking" class=".table-responsive">
    <input v-model="week" />
    <input v-model="year" />
    <button v-on:click="updateRankings()">update</button>
    <table class="table">
      <tbody>
        <tr>
          <th colspan="5" scope="col">
            <h3>Power Rankings: Week {{week}} {{year}}</h3>
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
import { getPowerRankings } from "../api/api.js";
export default {
  name: "PowerRankings",
  components: {
    TeamRanking
  },
  data: function() {
    return {
      rankings: [],
      week: 0,
      year: 2019
    };
  },
  created() {
    this.getRankings("118157", this.year, this.week);
  },
  methods: {
    getRankings: function(leagueId, seasonId, week) {
      getPowerRankings(leagueId, seasonId, week).then(value => {
        for (let index = 0; index < value.teams.length; index++) {
          const element = value.teams[index];
          element.ranking = index + 1;
          element.description = "description";
          value.teams[index] = element;
        }
        this.rankings = value.teams;
        this.week = value.week;
      });
    },
    updateRankings: function() {
      this.getRankings("118157", this.year, this.week);
    }
  }
};
</script>