<template>
  <div class="layout">
    <div class="layout-container">
      <div class="btns-all">
        <div class="all">
          <div
            class="btn-add"
            @click="
              modalState = `Добавить ${operationType === 'expenses' ? 'расходы' : 'доходы'}`;
            "
          >Добавить</div>
          <ui-button
            :class-name="'btn--min'"
            :is-fixed="true"
            :is-active="operationType === 'expenses'"
            @click="changeOption('expenses')"
          >
            Расходы
          </ui-button>
          <ui-button
            :class-name="'btn--min'"
            :is-fixed="true"
            :is-active="operationType === 'income'"
            @click="changeOption('income')"
          >
            Доходы
          </ui-button>
          <div class="btn-sort" @click="modalState = 'Фильтрация'">Фильтр</div>
        </div>
      </div>
      <h2 :class="`${operationType === 'expenses' ? 'expenses__title' : 'income__title'} ${isLoading ? 'skeleton skeleton--wave' : ''}`">
        {{ getOperationTitle }}
      </h2>
      <div :class="`${operationType === 'expenses' ? 'expenses' : 'income'}`" :style="!isLoading && !getOperations.length ? 'border-left: 0; border-right: 0': ''">
        <div v-if="!isLoading && !getOperations.length" style="align-self: center">
          {{ isFiltered ? `Ваши ${operationType === 'expenses' ? 'расходы' : 'доходы'} не найдены` : `Вы еще не добавили свои ${operationType === 'expenses' ? 'расходы' : 'доходы'}` }}
        </div>
        <ui-operation
          v-for="(operation, idx) in getOperations"
          v-else
          :key="idx"
          :is-first="!idx || getFirstNewOperationId === operation.id"
          :operation="operation"
          :is-loading="isLoading"
          @editOperation="editOperation"
        />
      </div>
    </div>
    <ui-modal
      :modal-show="!!modalState"
      @close="modalState = ''"
    >
      <template #title>
        {{ modalState }}
      </template>
      <template #body>
        <div v-if="modalState === 'Фильтрация'" class="sort-values">
          <div class="sort-value">
            <div class="sort-value__title">
              Показать по категориям:
            </div>

            <div class="sort-value__filter">
              <div v-if="operationType === 'income'" class="new-operation-icons">
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Зарплата')}" @click="selectPreviewFilter('Зарплата')">
                  <img src="/income.png" width="80px">
                </div>
              </div>
              <div v-else class="new-operation-icons">
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Одежда')}" @click="selectPreviewFilter('Одежда')">
                  <img src="/cloth.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Напитки')}" @click="selectPreviewFilter('Напитки')">
                  <img src="/drink.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Фаст-фуд')}" @click="selectPreviewFilter('Фаст-фуд')">
                  <img src="/fast-food.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Заправка')}" @click="selectPreviewFilter('Заправка')">
                  <img src="/gas.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Продукты')}" @click="selectPreviewFilter('Продукты')">
                  <img src="/groceries.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter .includes('Спорт-зал')}" @click="selectPreviewFilter('Спорт-зал')">
                  <img src="/gym.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Подписки')}" @click="selectPreviewFilter('Подписки')">
                  <img src="/music.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Парковка')}" @click="selectPreviewFilter('Парковка')">
                  <img src="/parking.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Ресторан')}" @click="selectPreviewFilter('Ресторан')">
                  <img src="/food.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Электричество')}" @click="selectPreviewFilter('Электричество')">
                  <img src="/electricity.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Дом')}" @click="selectPreviewFilter('Дом')">
                  <img src="/mortgage.png" width="80px">
                </div>
                <div class="new-operation__icon" :class="{'active': previewFilter.includes('Общ. транспорт')}" @click="selectPreviewFilter('Общ. транспорт')">
                  <img src="/public-transport.png" width="80px">
                </div>
              </div>
            </div>
          </div>
          <div class="all">
            <ui-button
              :class-name="'btn--min'"
              :is-fixed="true"
              :is-loading="isFilterOperationsLoading"
              :can-submit="previewFilter.length"
              @click="filterOperations"
            >
              Сохранить
            </ui-button>
            <ui-button
              :class-name="'btn--min'"
              :is-fixed="true"
              :is-loading="isResetFilterOperationsLoading"
              :can-submit="isFiltered"
              @click="filterOperations(true)"
            >
              Сбросить
            </ui-button>
          </div>
        </div>
        <div v-else class="new-operation">
          <div class="new-operation-type">
            <div class="new-operation-type__kind">
              <div>Введите тип {{ newOperation.type === 'expenses' ? 'расхода' : 'дохода' }}: {{ newOperation.kind }}</div>
            </div>
            <div v-if="newOperation.type === 'income'" class="new-operation-icons">
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Зарплата'}" @click="newOperation.kind = 'Зарплата'; newOperation.icon = 'income'">
                <img src="/income.png" width="80px">
              </div>
            </div>
            <div v-else class="new-operation-icons">
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Одежда'}" @click="newOperation.kind = 'Одежда'; newOperation.icon = 'cloth'">
                <img src="/cloth.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Напитки'}" @click="newOperation.kind = 'Напитки'; newOperation.icon = 'drink'">
                <img src="/drink.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Фаст-фуд'}" @click="newOperation.kind = 'Фаст-фуд'; newOperation.icon = 'fast-food'">
                <img src="/fast-food.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Заправка'}" @click="newOperation.kind = 'Заправка'; newOperation.icon = 'gas'">
                <img src="/gas.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Продукты'}" @click="newOperation.kind = 'Продукты'; newOperation.icon = 'groceries'">
                <img src="/groceries.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Спорт-зал'}" @click="newOperation.kind = 'Спорт-зал'; newOperation.icon = 'gym'">
                <img src="/gym.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Подписки'}" @click="newOperation.kind = 'Подписки'; newOperation.icon = 'music'">
                <img src="/music.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Парковка'}" @click="newOperation.kind = 'Парковка'; newOperation.icon = 'parking'">
                <img src="/parking.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Ресторан'}" @click="newOperation.kind = 'Ресторан'; newOperation.icon = 'food'">
                <img src="/food.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Электричество'}" @click="newOperation.kind = 'Электричество'; newOperation.icon = 'electricity'">
                <img src="/electricity.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Дом'}" @click="newOperation.kind = 'Дом'; newOperation.icon = 'mortgage'">
                <img src="/mortgage.png" width="80px">
              </div>
              <div class="new-operation__icon" :class="{'active': newOperation.kind === 'Общ. транспорт'}" @click="newOperation.kind = 'Общ. транспорт'; newOperation.icon = 'public-transport'">
                <img src="/public-transport.png" width="80px">
              </div>
            </div>
          </div>
          <div class="new-operation-date">
            <label for="date-input">Выберите дату:</label>
            <input id="date-input" :value="formatMillisecondsToDate(newOperation.date)" type="date" @change="setNewOperation('date', $event.target.value)">
          </div>
          <div v-if="newOperation.type === 'expenses'" class="new-operation-place">
            <label for="inpiu-place">Введите место расхода:</label>
            <input id="input-place" :value="newOperation.place" placeholder="Например: Пятёрочка" type="text" @input="setNewOperation('place', $event.target.value)"/>
          </div>
          <div class="new-operation-price">
            <label for="input-price">Введите количество {{ newOperation.type === 'expenses' ? 'потраченных' : 'полученных' }} средств, ₽:</label>
            <input id="input-price" :value="newOperation.price" placeholder="Например: 4000" type="number" @input="setNewOperation('price', $event.target.value)"/>
          </div>
          <ui-button
            v-if="modalState && modalState !== 'Изменить операцию'"
            :class-name="'btn--full'"
            :is-loading="isNewOperationLoading"
            @click="addNewOperation"
          >
            Добавить {{ newOperation.type === 'expenses' ? 'расход' : 'доход' }}
          </ui-button>
          <div v-else class="all">
            <ui-button
              :class-name="'btn--min'"
              :is-fixed="true"
              :is-loading="isChangeLoading"
              @click="btnClick"
            >
              Изменить
            </ui-button>
            <ui-button
              :class-name="'btn--min'"
              :is-fixed="true"
              :is-loading="isRemoveLoading"
              @click="btnClick(true)"
            >
              Удалить
            </ui-button>
          </div>
        </div>
      </template>
    </ui-modal>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'DefaultLayout',

  data () {
    return {
      modalState: '',
      previewFilter: [],
      isFiltered: false,
      isFilterOperationsLoading: false,
      isResetFilterOperationsLoading: false,
      isRemoveLoading: false,
      isChangeLoading: false,
      operationType: '',
      operations: [],
      newOperation: {
        id: 0,
        isNew: true,
        icon: '',
        date: 0,
        type: this.operationType,
        kind: '',
        place: '',
        price: 0
      },
      isNewOperationLoading: false,
      isLoading: true
    }
  },

  computed: {
    getOperationTitle () {
      return this.operationType === 'expenses' ? 'Ваши расходы' : 'Ваши доходы'
    },

    getOperations () {
      return this.operations?.filter(el => el.type === this.operationType)
    },

    getFirstNewOperationId () {
      return this.getOperations?.find(el => !el?.isNew)?.id || 0
    }
  },

  watch: {
    operationType () {
      this.newOperation = this.getNewOperationType()
    }
  },

  mounted () {
    setTimeout(() => {
      this.operationType = 'expenses'
      this.operations = this.$cookies.get('operations') || []
      this.operations.forEach(el => { el.isNew = false })
      this.operations.sort((a,b) => b.date - a.date)
      this.$cookies.set('operations', this.operations)
      this.isLoading = false
    }, 500)
  },

  methods: {
    formatMillisecondsToDate(milliseconds) {
      const date = new Date(milliseconds);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },

    getNewOperationType () {
      const id = new Date().getTime()
      return this.operationType === 'expenses'
        ? {
            id,
            isNew: true,
            icon: '',
            type: this.operationType,
            date: id,
            kind: '',
            place: '',
            price: undefined
          }
        : {
            id,
            isNew: true,
            icon: '',
            type: this.operationType,
            date: id,
            kind: '',
            price: undefined
          }
    },

    changeOption (option) {
      this.isLoading = true

      setTimeout(() => {
        this.operationType = option
        this.isLoading = false
      }, 500)
    },

    btnClick (remove) {
      if (!remove) {
        this.saveOperation()
        return
      }

      this.isRemoveLoading = true

      setTimeout(() => {
        this.removeOperation()
        this.isRemoveLoading = false
        this.modalState = ''
        this.newOperation = this.getNewOperationType()
      }, 1000)
    },

    setNewOperation (type, value) {
      switch (type) {
        case 'date': {
          this.newOperation[type] = new Date(value).getTime()
          break
        }

        default: {
          this.newOperation[type] = value
          break
        }
      }
    },

    editOperation(operation) {
      this.modalState = 'Изменить операцию'
      this.newOperation = { ...operation }
    },

    saveOperation () {
      this.operations = this.operations.filter(el => el.id !== this.newOperation.id)
      this.addNewOperation()
    },

    removeOperation () {
      this.operations = this.operations.filter(el => el.id !== this.newOperation.id)
      this.$cookies.set('operations', this.operations)
    },

    addNewOperation () {
      this.isNewOperationLoading = true
      this.isChangeLoading = true
      setTimeout(() => {
        this.operations.reverse()
        this.operations.push(this.newOperation)
        this.operations.reverse()
        this.operations.sort((a,b) => b.date - a.date)
        this.$cookies.set('operations', this.operations)
        this.isNewOperationLoading = false
        this.isChangeLoading = false
        this.modalState = ''
        this.newOperation = this.getNewOperationType()
      }, 1000)
    },

    selectPreviewFilter(filter) {
      if (this.previewFilter.includes(filter)) {
        this.previewFilter = this.previewFilter.filter(el => el !== filter)
        return
      }

      this.previewFilter.push(filter)
    },

    filterOperations (state) {
      state ? this.isResetFilterOperationsLoading = true : this.isFilterOperationsLoading = true
      setTimeout(() => {
        if (state) {
          this.operations = this.$cookies.get('operations') || []
          this.operations.sort((a,b) => b.date - a.date)
          this.isResetFilterOperationsLoading = false
          this.isFiltered = false
          this.modalState = ''
          this.previewFilter = []
          return
        }

        this.operations = this.operations.filter(el => this.previewFilter.includes(el.kind))
        this.isFilterOperationsLoading = false
        this.modalState = ''
        this.isFiltered = true
      }, 1000)
    }
  }
}
</script>
