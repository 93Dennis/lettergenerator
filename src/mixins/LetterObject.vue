<script>
export default {
  data () {
    return {
      letter: {
        sender: {
          name: '',
          street: '',
          place: '',
          country: ''
        },
        recipient: {
          name: '',
          street: '',
          place: '',
          country: ''
        },
        place: '',
        date: '',
        content: '',
        key: '',
        fontSize: 1,
        background: './1.png',
        fontFamily: 'Dancing Script',
        fontColor: {
          rgba: {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          }
        }
      }
    }
  }
}
</script>