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
  async asyncData(context) {
    const asteroidsList = await context.app.$axios.$get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${process.env.neoWsApiKey}`
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
      return this.dates.join(' ~ ')
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
      console.log(this.$refs.rangeForm.validate())
    },
    searchAsteroidsById() {
      console.log(this.$refs.idForm.validate())
    },
    closeCalendar() {
      this.menu = false
      this.dates = []
    },
  },
}
</script>
