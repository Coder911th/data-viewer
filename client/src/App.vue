<template>
  <div id="app">
    <div class="app__table-name">Variables</div>
    <data-table
        primaryKey="_id"
        :emptyMessage="emptyMessage"
        :columns="columns"
        :rows="rows"/>
  </div>
</template>

<script>
const TESTING = false;

import DataTable from './DataTable'

export default {
  name: 'app',
  data() {
    return {
      columns: [
        {
          caption: 'Название',
          field: 'name',
          width: '50%'
        },
        {
          caption: 'Значение',
          field: 'value',
          width: '50%'
        }
      ],
      rows: TESTING ? [
          {
            "_id": "5be71d7a1c9d44000083fb93",
            "name": "Source",
            "value": "https://ru.wikipedia.org"
          },
          {
            "_id": "5be71dca1c9d44000083fb94",
            "name": "MaxConnections",
            "value": "10"
          },
          {
            "_id": "5be71e0f1c9d44000083fb95",
            "name": "AuthHashMethod",
            "value": "MD5"
          }
        ] : [],
      emptyMessage: 'Загрузка данных...'
    };
  },
  components: {
    DataTable
  },
  async beforeMount() {
    if (TESTING) {
      return;
    }
    try {
      const response = await (await fetch('/api/read-db')).json();
      if (response.error) {
        throw response.error;
      }
      this.rows = response.result;
    } catch (errorMessage) {
      console.error(errorMessage);
      alert(errorMessage);
    }
    this.emptyMessage = 'Нет данных';
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  max-width: 720px;
  min-height: 100vh;
  
  padding: 10px 5px;
  margin: 0 auto;

  box-sizing: border-box;
  border-left: 1px solid black;
  border-right: 1px solid black;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.app__table-name {
  padding-right: 10px;
  text-align: right;
  font-weight: bold;
  font-variant: small-caps;
}
</style>
