<template>
  <div class="operation" @click="$emit('editOperation', operation)">
    <div v-if="isFirst" class="operation-category">
      {{ getCategory }}
    </div>
    <span class="operation-date">
      {{ getDate }}
    </span>
    <div class="operation-main">
      <div class="about">
        <div class="about-icon" :class="`${isLoading ? 'skeleton skeleton--wave' : ''}`">
          <img :src="getIcon" width="65px">
        </div>
        <div class="about-type" :class="`${isLoading ? 'skeleton skeleton--wave' : ''}`">
          <div class="about-type__kind" :class="`${isLoading ? 'skeleton skeleton--wave' : ''}`">
            {{ operation.kind }}
          </div>
          <div v-if="operation.type === 'expenses'" class="about-type__place" :class="`${isLoading ? 'skeleton skeleton--wave' : ''}`">
            {{ operation.place }}
          </div>
        </div>
      </div>
      <div class="price" :class="`${isLoading ? 'skeleton skeleton--wave' : ''}`">
        {{ operation.price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiOperation',
  props: {
    operation: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isFirst: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getCategory () {
      return this.operation.isNew ? 'Новые' : 'История'
    },

    getDate () {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }

      const today = new Intl.DateTimeFormat('ru-RU', options).format(new Date().getTime())

      const date = new Intl.DateTimeFormat('ru-RU', options).format(this.operation.date)

      if (today === date) {
        return 'Сегодня'
      }

      return date
    },

    getIcon () {
      return `/${this.operation.icon}.png`
    }
  }
}
</script>

<style>

</style>