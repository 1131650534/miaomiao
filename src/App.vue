<template>
    <!-- keep-alive 防止每次刷新都重新渲染 vue自带的缓存 -->
  <keep-alive>
    <router-view/>
  </keep-alive>
</template>

