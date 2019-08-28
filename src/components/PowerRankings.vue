<template>
  <div class=".table-responsive">
    <div class="form-inline container row">
      <div class="form-group col-sm-3">
        <label for="leagueId">League ID:</label>
        <input
          type="text"
          class="form-control"
          id="leagueId"
          v-on:keyup.enter="updateRankings()"
          v-model="leagueId"
        />
      </div>
      <div class="form-group col-sm-3">
        <label for="week">Week:</label>
        <input
          type="number"
          class="form-control"
          id="week"
          v-on:keyup.enter="updateRankings()"
          v-model="week"
        />
      </div>
      <div class="form-group col-sm-3">
        <label for="year">Year:</label>
        <input
          type="number"
          class="form-control"
          id="year"
          v-on:keyup.enter="updateRankings()"
          v-model="year"
        />
      </div>
      <div class="form-group col-sm-3">
        <button class="btn btn-primary" v-on:click="updateRankings()">update</button>
      </div>
    </div>
    <div id="powerRanking">
      <table class="table" id="rankings-table">
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
      year: 2019,
      leagueId: "118157"
    };
  },
  created() {
    this.getRankings(this.leagueId, this.year, this.week);
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
      this.getRankings(this.leagueId, this.year, this.week);
    }
  }
};
</script>