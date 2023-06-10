<template>
  <transition v-if="modalShow" name="fade">
    <div
      class="modal"
      role="dialog"
      :style="`display: ${modalShow ? 'block' : 'none'}`"
    >
      <div
        class="modal-overlay"
        @click.self="close"
      >
        <div
          class="modal-main"
        >
          <div class="modal-title">
            <slot name="title" />
          </div>
          <button
            type="button"
            class="modal-close"
            @click="close"
          />
          <div class="modal-content">
            <slot name="body" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UiModal',
  props: {
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
})
</script>
