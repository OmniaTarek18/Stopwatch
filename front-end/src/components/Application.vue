<template>
  <div class="container">

    <h1 class="display-3">Stop Watch</h1>
    <hr>

    <div class="counter"> {{ time }} </div>

    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <button type="button" class="btn btn-outline-dark" id="start" @click="startCounter()">Start</button>
      <button type="button" class="btn btn-outline-dark" id="lab" @click="handleLab()" disabled>Lab</button>
      <button type="button" class="btn btn-outline-dark" id="reset" @click="resetCounter()" disabled>Reset</button>
    </div>
    <div class="labs">
      <table class="table" v-if="labs.length">
        <thead>
          <tr>
            <th scope="col">Labs</th>
            <th scope="col">Time</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lab, index) in labs">
            <td>{{ index }}</td>
            <td>{{ lab[0] }}</td>
            <td>{{ lab[1] }}</td>
          </tr>
        </tbody>
      </table>
      
    </div>
  </div>
</template>
<script>
import Time from '../components/Time.js';
export default {
  data() {
    return {
      time: "00 : 00 : 00",
      start: false,
      counter: 0,
      myInterval: null,
      labs: [],
      obj:new Time(),
      lastObj:new Time(),
    }
  },
  methods: {
    startCounter() {
      if (this.start) {
        this.handlePause();
        return;
      }
      this.start = true;
      this.toggleStartBtn();
      this.myInterval = setInterval(() => {

        var seconds = parseInt(this.counter % 60, 10);
        var minutes = parseInt(this.counter / 60, 10);
        var hours = parseInt(this.counter / 60 / 60, 10);

        this.obj.update(hours,minutes,seconds);
        this.time = this.obj.print();

        this.counter++;

      }, 1000);

    },
    handleLab() {
      var period = this.obj.calcPeriod(this.lastObj);
      this.lastObj.update(this.obj.hours,this.obj.minutes,this.obj.seconds);
      this.labs.push([period, this.time]);
    },
    resetCounter() {
      this.counter = 0;
      this.labs = [];
      this.start = false;
      this.toggleStartBtn();
      clearInterval(this.myInterval);
      this.time = "00 : 00 : 00"
    },
    handlePause() {
      this.start = false;
      this.toggleStartBtn();
      clearInterval(this.myInterval);
      document.getElementById("reset").disabled = false;
    },
    toggleStartBtn() {
      if (this.start) {
        document.getElementById("start").textContent = "Pause";
        document.getElementById("lab").disabled = false;
        document.getElementById("reset").disabled = false;
      }
      else {
        document.getElementById("start").textContent = "Start";
        document.getElementById("lab").disabled = true;
        document.getElementById("reset").disabled = true;
      }
    }
  }
}
</script>
<style>
.container {
  margin-top: 100px;
  color: rgb(37, 37, 55);
}

h1,
.counter {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.counter {
  font-size: 80px;
}

.btn-group {
  margin-top: 30px;
  width: 20%;
}

.labs{
  margin: 20px auto;
  height: 200px;
  overflow: scroll;
}
</style>