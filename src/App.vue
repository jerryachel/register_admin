<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body,#app{
	min-width: 1000px;
    width:100%;
    height:100%;
    font-family: "Microsoft YaHei";
    font-size:14px;
}
</style>
