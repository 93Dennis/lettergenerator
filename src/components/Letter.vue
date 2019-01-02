<template>
  <div class="letter-image">
    <img :src="backgroundPath" alt="Brief" width="100%">
    <div class="place-date" v-if="letter.place != '' && letter.date != ''">{{ letter.place }}, den {{ letter.date | convertDate }}</div>
    <div class="content">{{ letter.content }}</div>
  </div>
</template>

<script>
import bg from '@/assets/images/letter-background.jpg';

export default {
  data() {
    return {
      backgroundPath: bg
    }
  },
  props: ['letter'],
  filters: {
    convertDate(value) {
      let oldDate = new Date(value);
      let day = oldDate.getDate();
      let month = oldDate.getMonth() + 1;
      let year = oldDate.getFullYear();
      let newDate = day + '.' + month + '.' + year;
      return newDate;
    }
  }
}
</script>

<style>
  .letter-image {
      position: relative;
      text-align: left;
      color: rgb(7, 8, 87);
      font-family: 'Dancing Script', cursive;
      white-space: pre-wrap;
      line-height: 150%;
      -webkit-filter: drop-shadow(2px 2px 2px #222);
      filter: drop-shadow(2px 2px 2px #222);
    }
  
  @media screen and (max-width: 499px) {
    .letter-image {
      font-size: 0.5em;
    }
  } 
  
  @media screen and (min-width: 500px) and (max-width: 599px) {
    .letter-image {
      font-size: 0.7em;
    }
  } 

  @media screen and (min-width: 600px) and (max-width: 679px) {
    .letter-image {
      font-size: 0.8em;
    }
  } 
  
  @media screen and (min-width: 680px) and (max-width: 749px) {
    .letter-image {
      font-size: 0.9em;
    }
  } 

    @media screen and (min-width: 750px) and (max-width: 799px) {
    .letter-image {
      font-size: 1em;
    }
  } 

  @media screen and (min-width: 800px) and (max-width: 889px) {
    .letter-image {
      font-size: 1.1em;
    }
  } 
  
  @media screen and (min-width: 890px) and (max-width: 959px) {
    .letter-image {
      font-size: 1.2em;
    }
  } 

  @media screen and (min-width: 960px) and (max-width: 1263px) {
    .letter-image {
      font-size: 1.25em;
    }
  } 

  @media screen and (min-width: 1264px) and (max-width: 1904px) {
    .letter-image {
      font-size: 1.2em;
    }
  } 

  @media screen and (min-width: 1905px) {
    .letter-image {
      font-size: 1.4em;
    }
  } 

  .place-date {
    position: absolute;
    top: 5%;
    right: 12%;
  }
  .content {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
  }
</style>

