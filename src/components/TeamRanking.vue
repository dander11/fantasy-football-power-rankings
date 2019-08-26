<template>
  <tr class="rank">
    <td scope="col">
      <div class="ranking">{{ranking}}</div>
    </td>
    <td class="teamPicture">
      <img v-bind:src="logoUrl" />
    </td>
    <td scope="col">
      <div class="team-name">{{teamName}}</div>
      <div class="manager-name-under-team">{{owner}}</div>
      <div class="team-record">Record: {{wins}}-{{losses}}</div>
      <div class="team-record">Record vs league: {{totalWins}}-{{totalLosses}}</div>
      <div class="team-record">Power Rating: {{Math.round(powerRanking)}}</div>
    </td>
    <td scope="col" align="center">
      <div class="delta-div">
        <div v-bind:class="deltaClass"></div>
        <div class="delta" v-bind:class="'delta-'+deltaClass">{{delta}}</div>
      </div>
      <div class="last-weeks-position">
        Last Week:
        <span
          class="field-value"
          v-show="!showField('lastWeek')"
          @click="focusField('lastWeek')"
        >{{lastWeek}}</span>
        <input
          v-model="lastWeek"
          placeholder="Edit me"
          v-show="showField('lastWeek')"
          type="lastWeek"
          class="field-value form-control"
          @focus="focusField('lastWeek')"
          @blur="blurField"
        />
      </div>
    </td>
    <td class="center" scope="col">
      <span
        class="field-value"
        v-show="!showField('descriptionText')"
        @click="focusField('descriptionText')"
      >
        <div v-html="descriptionText"></div>
      </span>
      <textarea
        v-model="descriptionText"
        placeholder="Edit me"
        v-show="showField('descriptionText')"
        type="descriptionText"
        class="field-value form-control description-text"
        @focus="focusField('descriptionText')"
        @blur="blurField"
      />
    </td>
  </tr>
</template>

<script lang="ts">
export default {
  name: "TeamRanking",
  props: {
    teamName: String,
    logoUrl: String,
    wins: Number,
    losses: Number,
    totalWins: Number,
    totalLosses: Number,
    description: String,
    ranking: Number,
    owner: String,
    powerRanking: Number
  },
  data: function() {
    return {
      descriptionText: this.description,
      lastWeek: "0",
      editField: ""
    };
  },
  computed: {
    delta: function() {
      return this.getDelta() == 0 ? "---" : this.getDelta();
    },
    deltaClass: function() {
      if (this.delta > 0) {
        return "up";
      } else if (this.delta < 0) {
        return "down";
      } else {
        return "no-change";
      }
    }
  },
  methods: {
    focusField(name) {
      this.editField = name;
    },
    blurField() {
      this.editField = "";
    },
    showField(name) {
      return this[name] == "" || this.editField == name;
    },
    getDelta() {
      return this.lastWeek == 0 ? 0 : parseInt(this.lastWeek) - this.ranking;
    }
  }
};
</script>
<style scoped>
.description-text {
  width: 600px;
  height: 400px;
  font-size: 0.8rem;
}
</style>