<template>
  <div>
    <v-main class="primary d-flex justify-center align-center">
      <v-container class="pa-5">
        <v-form
          ref="rangeForm"
          v-model="rangeFormValid"
          @submit.prevent="searchAsteroidsByRange"
        >
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12">
              <h1 class="text-h5 text-sm-h4 white--text text-center my-5">
                Find Asteroids by range
              </h1>
            </v-col>
            <v-col cols="12" sm="8">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="dateRangeText"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateRangeText"
                    label="Select Date range"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    solo
                    clearable
                    :rules="[rules.required, rules.dateRange]"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dates" range>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="closeCalendar">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(dates)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <div class="text-center mb-5">
                <v-btn color="secondary" type="submit" dark rounded>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
        <v-divider class="white my-5"></v-divider>
        <v-form
          ref="idForm"
          v-model="idFormValid"
          @submit.prevent="searchAsteroidsById"
        >
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12">
              <h1 class="text-h5 text-sm-h4 white--text text-center my-5">
                Find Asteroid by ID
              </h1>
            </v-col>
            <v-col cols="12" sm="8">
              <v-text-field
                v-model="searchId"
                label="Enter ID"
                solo
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <div class="text-center mb-5">
                <v-btn color="secondary" type="submit" dark rounded>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-main>
    <v-main class="grey lighten-3">
      <v-container>
        <v-card>
          <v-card-title>
            Asteroids List
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="asteroidsListInTable"
            :search="search"
            hide-default-footer
          ></v-data-table>
        </v-card>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  async asyncData({ app, env }) {
    const asteroidsList = await app.$axios.$get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${env.neoWsApiKey}`
    )
    return { asteroidsList }
  },
  data() {
    return {
      rangeFormValid: false,
      idFormValid: false,
      menu: false,
      dates: [],
      search: '',
      searchId: '',
      headers: [
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Estimated Diameter Max(Km)',
          value: 'estimated_diameter_max',
        },
        {
          text: 'Estimated Diameter Min(Km)',
          value: 'estimated_diameter_min',
        },
        {
          text: 'Class Type',
          value: 'orbit_class_type',
        },
      ],
      rules: {
        required: (value) => !!value || 'Required.',
        dateRange: () => this.diffDates <= 7 || 'Date limit is only 7 Days',
      },
    }
  },
  computed: {
    asteroidsListInTable() {
      return this.asteroidsList.near_earth_objects.map((asteroid) => {
        return {
          id: asteroid.id,
          name: asteroid.name,
          estimated_diameter_max:
            asteroid.estimated_diameter.kilometers.estimated_diameter_max,
          estimated_diameter_min:
            asteroid.estimated_diameter.kilometers.estimated_diameter_min,
          orbit_class_type: asteroid.orbital_data.orbit_class.orbit_class_type,
        }
      })
    },
    dateRangeText() {
      return this.sortedDates.join(' ~ ')
    },
    sortedDates() {
      const dateRange = [...this.dates]
      return dateRange.sort((date1, date2) => {
        return new Date(date1) - new Date(date2)
      })
    },
    diffDates() {
      const date1 = new Date(this.dates[0])
      const date2 = new Date(this.dates[1])
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    },
  },
  methods: {
    searchAsteroidsByRange() {
      if (this.$refs.rangeForm.validate()) {
        this.$router.push({
          name: 'asteroids-by-range',
          query: {
            startDate: this.sortedDates[0],
            endDate: this.sortedDates[1],
          },
        })
      }
    },
    searchAsteroidsById() {
      if (this.$refs.idForm.validate()) {
        this.$router.push({
          name: 'asteroid-by-id-id',
          params: {
            id: this.searchId,
          },
        })
      }
    },
    closeCalendar() {
      this.menu = false
      this.dates = []
    },
  },
}
</script>
