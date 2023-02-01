<template>
  <dp-card
    :heading="Translator.trans('tasks.my')">
    <div class="u-mt">
      <span v-cleanhtml="Translator.trans('segments.assigned.now', { count: assignedSegmentCount })" />
    </div>
    <div
      class="text--right u-mt"
      v-if="assignedSegmentCount !== 0">
      <dp-button
        :href="userFilteredSegmentUrl"
        :text="Translator.trans('tasks.view')" />
    </div>
  </dp-card>
</template>

<script>
import { checkResponse, dpApi } from '../../lib'
import { CleanHtml } from '../../directives/CleanHtml/CleanHtml'
import DpButton from '../DpButton/DpButton'
import DpCard from './DpCard'

export default {
  name: 'DpDashboardTaskCard',

  components: {
    DpButton,
    DpCard
  },

  directives: {
    cleanhtml: CleanHtml
  },

  props: {
    currentUserId: {
      type: String,
      required: true
    },

    filterHashUpdatedRoute: {
      type: String,
      required: true
    },

    procedureId: {
      type: String,
      required: true
    },

    resourceListRoute: {
      type: String,
      required: true
    },

    userFilteredRoute: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      assignedSegmentCount: 0,
      userHash: ''
    }
  },

  computed: {
    userFilteredSegmentUrl () {
      return this.userFilteredRoute + '/' + this.userHash
    }
  },

  mounted () {
    // Filter by current user as assignee and current procedure
    const filterQuery = {
      [this.currentUserId]: {
        condition: {
          path: 'assignee',
          value: this.currentUserId
        }
      },
      sameProcedure: {
        condition: {
          path: 'parentStatement.procedure.id',
          value: this.procedureId
        }
      }
    }

    // Get count of segments assigned to the current user
    const segmentUrl = this.resourceListRoute
    dpApi.get(segmentUrl, { filter: filterQuery }, { serialize: true }).then(response => {
      this.assignedSegmentCount = response.data.data.length
    })

    /*
     * It is currently difficult to get the default filter hash but a filter hash is needed to retrieve an updated hash.
     * Therefore, we place a get request to the default segment list route. The backend will respond with a 302 status
     * code redirecting to the default filter hash. The 302 is handled by the browser and axios will receive the
     * redirected response. The redirected response will contain the default filter hash, which can then be extracted
     * and used to obtain an updated filter hash.
     */
    dpApi.get(this.userFilteredRoute)
      .then(response => {
        const redirectUrl = response.request.responseURL
        const splitUrl = redirectUrl.split('/')
        const queryHash = splitUrl[splitUrl.length - 1]
        const filterData = {
          filter: {
            ...filterQuery
          },
          searchPhrase: ''
        }

        // Get the actual filter hash
        const url = Routing.generate(this.filterHashUpdatedRoute, { queryHash })
        dpApi.patch(url, {}, filterData)
          .then(response => checkResponse(response))
          .then(response => {
            if (response) {
              this.userHash = response
            }
          })
      })
  }
}
</script>
