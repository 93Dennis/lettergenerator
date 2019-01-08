<template>
  <div class="envelope" :style="envelopeStyle">
    <img :src="backgroundPath" alt="Briefumschlag" width="100%">
    <div class="sender" v-if="letter.sender">
      {{ letter.sender.name }}<br>
      {{ letter.sender.street }}<br>
      {{ letter.sender.place }}<br>
      {{ letter.sender.country }}<br>
      </div>
    <div class="recipient" v-if="letter.recipient">
      {{ letter.recipient.name }}<br>
      {{ letter.recipient.street }}<br>
      {{ letter.recipient.place }}<br>
      {{ letter.recipient.country }}<br>
    </div>
  </div>
</template>

<script>
import bg from '@/assets/images/old_air_mail.png';

export default {
  data() {
    return {
      backgroundPath: bg
    }
  },
  props: ['letter'],
  computed: {
    envelopeStyle() {
      let styleObj = {};
      styleObj.fontFamily = this.letter.fontFamily;
      if (!this.letter.fontColor) {
        styleObj.color = 'rgba(0, 0, 0, 1)';
      } else {
        styleObj.color = `rgba(
          ${this.letter.fontColor.rgba.r}, 
          ${this.letter.fontColor.rgba.g}, 
          ${this.letter.fontColor.rgba.b},
          ${this.letter.fontColor.rgba.a}
        )`;
      }
      return styleObj;
    }
  }
}
</script>

<style>
  .envelope {
    position: relative;
    text-align: left;
    white-space: pre-wrap;
    line-height: 100%;
    cursor: pointer;
    -webkit-filter: drop-shadow(5px 5px 5px #222);
    filter: drop-shadow(5px 5px 5px #222);
  }
  .sender {
    font-size: 1.2em;
    position: absolute;
    top: 12%;
    left: 10%;
  }
  .recipient {
    font-size: 1.5em;
    position: absolute;
    bottom: 20%;
    right: 18%;
  }

  @media screen and (max-width: 499px) {
    .envelope {
      font-size: 0.5em;
    }
  } 
  @media screen and (min-width: 500px) and (max-width: 599px) {
    .envelope {
      font-size: 0.7em;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 679px) {
    .envelope {
      font-size: 0.8em;
    }
  } 
  @media screen and (min-width: 680px) and (max-width: 749px) {
    .envelope {
      font-size: 0.9em;
    }
  }
  @media screen and (min-width: 750px) and (max-width: 799px) {
    .envelope {
      font-size: 1em;
    }
  }
  @media screen and (min-width: 800px) and (max-width: 889px) {
    .envelope {
      font-size: 1.1em;
    }
  } 
  @media screen and (min-width: 890px) and (max-width: 959px) {
    .envelope {
      font-size: 1.2em;
    }
  } 
  @media screen and (min-width: 960px) and (max-width: 1263px) {
    .envelope {
      font-size: 1.25em;
    }
  } 
  @media screen and (min-width: 1264px) and (max-width: 1904px) {
    .envelope {
      font-size: 1.2em;
    }
  } 
  @media screen and (min-width: 1905px) {
    .envelope {
      font-size: 1.4em;
    }
  } 
</style>

