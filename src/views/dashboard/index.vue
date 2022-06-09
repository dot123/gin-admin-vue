<template>
  <div style="margin-left: 15px">
    <p>您好，{{ this.$store.getters.name }}！</p>
  </div>
</template>
<script>
import resize from '../../utils/mixins/resize'

export default {
  components: {},
  mixins: [resize],
  props: [],
  data() {
    return { }
  },
  computed: {},
  mounted() {
  },
  beforeDestroy() {
  },
  created() {
  },
  methods: {
  }
}
</script>
