<script>
export default {
  data() {
    return {
      valid: false,
      contentRules: [
        v => !!v || 'Du musst eine Nachricht angeben.'
      ],
      keyRules: [
        v => !!v || 'Du musst einen Schlüssel angeben'
      ]
    }
  }
}
</script>
