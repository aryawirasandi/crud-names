<template>
  <div id="app">
     <h1>Lists of names</h1>
      <div>
        <label> Name : </label>
        <input type="text" v-model="name"  @keyup.enter="submitName" placeholder="please input your name">
        <button @click="submitName" class="add">Add</button>
      </div>
     
      <div>
          <ul v-for="personName of names" :key="personName['.key']">
            <li>
              <div v-if="personName.edit == true">
                <input type="text" v-model="personName.name">
                <button @click="cancelEdit(personName['.key'])" class="cancel">Cancel</button>
                <button @click="updateName(personName)" class="update">Update</button>
              </div >
                 <div v-else>
                    <p>{{personName.name}}</p>
                <button @click="removeName(personName['.key'])" class="remove">remove</button>
                <button @click="setEditName(personName['.key'])" class="edit">Edit</button>
                 </div>
            </li>
          </ul>
      </div>
  </div>
</template>

<script>
import {namesRef} from './firebase'
export default {
  
  data () {
    return {
      name: ''
    }
  },
  firebase : {
    names: namesRef
  }, 
  methods:{
    submitName() {
      namesRef.push({name: this.name, edit: false})
      this.name = ""
    },
    removeName(key){
      namesRef.child(key).remove();
    },
    setEditName(key){
      namesRef.child(key).update({edit: true})
    },
    cancelEdit(key){
      namesRef.child(key).update({edit: false});
    },
    updateName(person){
      const key = person['.key'];
      namesRef.child(key).set({name: person.name, edit:false});
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  background-color: transparent;
  border: 2px solid black;
}

p{
  border: solid black 2px;
  padding: 25px;
}
input{
  height: 50px;
  width: 150px;
}
.add{
  background-color: green;
  width: 150px;
  color: white; 
  padding: 15px;
  font-family: sans-serif;
  font-size: 25px;
}
</style>
