<template>
  <div mx-2 inline-flex flex-row cursor-default items-center>
    <div flex flex-col children:mx-auto>
      <img inline-block h-10 w-10 src="/nuxt.svg">
    </div>
    <div
      text="3xl gray4"
      m="x-4 y-auto"
      i-carbon-add transform transition-all-500 hover:rotate-135
    />
    <div flex flex-col children:mx-auto>
      <img inline-block h-10 w-10 src="/vite.png">
    </div>
  </div>
</template>
