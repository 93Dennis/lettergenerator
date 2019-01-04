<template>
  <div class="letter-image" :style="styleOptions">
    <div 
      class="place-date" 
      :style="textStyle"
      v-if="letter.place != '' && letter.date != ''"
    >
      {{ letter.place }}, den {{ letter.date | convertDate }}
    </div>
    <div class="content" :style="textStyle">{{ letter.content }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      styleOptions: {
        backgroundImage: 'url(' + require('../assets/images/ricepaper_v3.png') + ')'
      }
    }
  },
  props: ['letter'],
  computed: {
    textStyle() {
      let styleObj = {};
      if (!this.letter.fontSizeMultiplier) {
        styleObj.fontSize = '1em';
        styleObj.lineHeight = '150%';
      } else {
        styleObj.fontSize = this.letter.fontSizeMultiplier.size + 'em';
        styleObj.lineHeight = this.letter.fontSizeMultiplier.lineHeight + '%';
      }
      return styleObj;
    }
  },
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
    text-align: left;
    color: rgb(7, 8, 87);
    font-family: 'Dancing Script', cursive;
    background-repeat: repeat;
    -webkit-filter: drop-shadow(2px 2px 2px #222);
    filter: drop-shadow(2px 2px 2px #222);
    overflow: hidden;
  }
  .place-date {
    text-align: right;
    padding: 5% 11% 0;
    white-space: nowrap;
  }
  .content {
    height: 90%;
    padding: 7% 8% 10%;
    white-space: pre-wrap;
  }
  
  @media screen and (max-width: 210px) {
    .letter-image {
      font-size: 1.28vw;
    }
  } 
  @media screen and (min-width: 210px) and (max-width: 229px) {
    .letter-image {
      font-size: 1.36vw;
    }
  } 
  @media screen and (min-width: 230px) and (max-width: 259px) {
    .letter-image {
      font-size: 1.5vw;
    }
  } 
  @media screen and (min-width: 260px) and (max-width: 299px) {
    .letter-image {
      font-size: 1.6vw;
    }
  } 
  @media screen and (min-width: 300px) and (max-width: 329px) {
    .letter-image {
      font-size: 1.7vw;
    }
  }
  @media screen and (min-width: 330px) and (max-width: 359px) {
    .letter-image {
      font-size: 1.74vw;
    }
  } 
  @media screen and (min-width: 360px) and (max-width: 399px) {
    .letter-image {
      font-size: 1.8vw;
    }
  } 
  @media screen and (min-width: 400px) and (max-width: 429px) {
    .letter-image {
      font-size: 1.86vw;
    }
  } 
  @media screen and (min-width: 430px) and (max-width: 459px) {
    .letter-image {
      font-size: 1.9vw;
    }
  } 
  @media screen and (min-width: 460px) and (max-width: 499px) {
    .letter-image {
      font-size: 1.94vw;
    }
  } 
  @media screen and (min-width: 500px) and (max-width: 599px) {
    .letter-image {
      font-size: 1.96vw;
    }
  } 
  @media screen and (min-width: 600px) and (max-width: 699px) {
    .letter-image {
      font-size: 1.84vw;
    }
  } 
  @media screen and (min-width: 700px) and (max-width: 799px) {
    .letter-image {
      font-size: 1.86vw;
    }
  } 
  @media screen and (min-width: 800px) and (max-width: 899px) {
    .letter-image {
      font-size: 1.88vw;
    }
  } 
  @media screen and (min-width: 900px) and (max-width: 959px) {
    .letter-image {
      font-size: 1.9vw;
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
</style>

