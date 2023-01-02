<template>
  <div>
    <statement-pdf-import-status-chart></statement-pdf-import-status-chart>
  </div>
</template>

<script>
import externalComponent from './externalComponent'

const StatementPdfImportStatusChart = () => {
  externalComponent('http://ewm.dplan.local/js/addons/StatementPdfStatusImportChart.umd.js')
}

export default {
  name: "DpAddonWrapper",

  components: {
    StatementPdfImportStatusChart
  }
}
</script>

