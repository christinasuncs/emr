<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
    <section class="hero is-info has-background-gradient" style="margin-bottom: 2rem;">
      <div class="hero-body">
        <p class="title">
          Calendar
        </p>
        <p class="subtitle" style="margin-top: 1rem;">
          Schedule and view appointments
        </p>
      </div>
    </section>
    <div
    style="display: block; margin-left: auto; margin-right: auto; width: 90%;">
      <v-btn @click="handleDateClick">Add Event</v-btn>
      <FullCalendar :options="calendarOptions" />
      <template>
        <div class="text-center pa-4">
          <v-dialog v-model="dialog" width="auto">
            <v-card
              max-width="600"
              prepend-icon="mdi-calendar-check"
              text="Please fill in the required information to create a new appointment."
              title="New Appointment"
            >
              <v-container>
                <v-row>
                  <v-col cols="12" md="6" sm="12">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="12">
                    <v-text-field
                      v-model="editedItem.date"
                      label="Date"
                      type="datetime-local"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="12">
                    <v-select
                      label="Patient"
                      v-model="editedItem.patient"
                      :items="patients.map(patient => patient.name)"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6" sm="12">
                    <v-text-field
                      v-model="editedItem.location"
                      label="Location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="12">
                    <v-select
                      v-model="editedItem.doctor"
                      label="Doctor"
                      :items="doctors.map(doctor => doctor.name)"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <template v-slot:actions>
                <v-btn
                  class="ms-auto"
                  color="blue-darken-1"
                  variant="elevated"
                  text="Create"
                  @click="addEvent"
                ></v-btn>
              </template>
            </v-card>
          </v-dialog>
          <v-dialog v-model="appointment_dialog" width="50%">
            <v-card
              max-width="1000"
              prepend-icon="mdi-calendar-check"
              text="Please see the appointment info below"
              title="Appointment Info"
            >
              <v-container>
                <v-row>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      v-model="selectedAppointment.title"
                      label="Title"
                      variant="solo"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      v-model="selectedAppointment.date"
                      label="Date"
                      variant="solo"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      v-model="selectedAppointment.patient"
                      label="Patient"
                      variant="solo"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      v-model="selectedAppointment.location"
                      label="Location"
                      variant="solo"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      v-model="selectedAppointment.doctor"
                      label="Doctor"
                      variant="solo"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <template v-slot:actions>
                <v-btn
                  class="ms-auto"
                  variant="elevated"
                  text="Edit"
                  @click="openEditModal"
                ></v-btn>
                <v-btn
                  class="ms-auto"
                  variant="elevated"
                  text="Close"
                  @click="appointment_dialog = false"
                ></v-btn>
              </template>
            </v-card>
          </v-dialog>
          <v-dialog v-model="edit_appointment_dialog" width="50%">
            <v-card
              max-width="1000"
              prepend-icon="mdi-calendar-check"
              title="Edit Appointment Info"
            >
              <v-container>
                <v-row>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      v-model="selectedAppointment.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      v-model="selectedAppointment.date"
                      label="Date"
                      type="datetime-local"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-select
                      v-model="selectedAppointment.patient"
                      label="Patient"
                      :items="patients.map(patient => patient.name)"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field
                      v-model="selectedAppointment.location"
                      label="Location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-select
                      v-model="selectedAppointment.doctor"
                      label="Doctor"
                      :items="doctors.map(doctor => doctor.name)"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <template v-slot:actions>
                <v-btn
                  class="ms-auto"
                  variant="elevated"
                  text="Confirm"
                  @click="handleEditClick"
                ></v-btn>
                <v-btn
                  class="ms-auto"
                  variant="elevated"
                  text="Cancel"
                  @click="edit_appointment_dialog = false"
                ></v-btn>
              </template>
            </v-card>
          </v-dialog>
        </div>
      </template>
      <br>
      <br>
      <!--Footer-->
        <footer class="footer">
          <div class="content has-text-centered">
            <p>
              <strong>EMR</strong> &copy; 2024.
            </p>
          </div>
        </footer>
    </div>
  </div>
  </template>
  
  <script>
  import axios from "axios"
  import FullCalendar from "@fullcalendar/vue3"
  import dayGridPlugin from "@fullcalendar/daygrid"
  import interactionPlugin from "@fullcalendar/interaction" // for selectable
  import moment from "moment"
  
  export default {
    components: {
      FullCalendar,
    },
    data() {
      return {
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: "dayGridMonth",
          // selectable: true,
          events: [], // Empty array for no initial events
          // dateClick: this.handleDateClick,
          eventClick: this.handleEventClick,
        },
        dialog: false,
        appointment_dialog: false,
        edit_appointment_dialog: false,
        selectedAppointment: {},
        editedItem: {
          title: "",
          date: "",
          patient: "",
          location: "",
          doctor: "",
        },
        defaultItem: {
          title: "",
          date: "",
          patient: "",
          location: "",
          doctor: "",
        },
        patients: [],
        doctors: []
      }
    },
    mounted() {
      this.fetchAppointments()
      this.fetchUsers()
    },
    methods: {
      async fetchAppointments(){
        try{
          const appointments = await axios.get('http://localhost:3000/api/appointments/'); // change link to whatever it is
          this.calendarOptions.events = appointments.data;
        } catch (error) {
          console.error("Error fetching appointments: ", error);
        }
      },
      async fetchUsers() {
        try{
          const users = await axios.get('http://localhost:3000/api/user/'); // change link to whatever it is
          users.data.forEach(user => {
            if(user.role == "Patient") {
              this.patients.push(user)
            } else if(user.role == "Doctor") {
              this.doctors.push(user)
            }
          })
        } catch (error) {
          console.error("Error fetching appointments: ", error);
        }
      },
      handleDateClick() {
        // console.log(info.dateStr)
        // this.editedItem.date = info.dateStr
        this.dialog = true
      },
      handleEventClick(info) {
        // console.log("tset")
        this.calendarOptions.events.forEach(event => {
          const date = new Date(event.date)
          if(event.title == info.event.title && info.event.start == date.toString()){
            this.selectedAppointment = {...event}
          }
        })

        const date = new Date(this.selectedAppointment.date)
        this.selectedAppointment.date = date.toString()
        const patientIdToNameMap = {};
        this.patients.forEach(patient => {
          patientIdToNameMap[patient._id] = patient.name;
        });

        const doctorIdToNameMap = {}
        this.doctors.forEach(doctor => {
          doctorIdToNameMap[doctor._id] = doctor.name;
        });

        this.selectedAppointment.patient = patientIdToNameMap[this.selectedAppointment.patient]
        this.selectedAppointment.doctor = doctorIdToNameMap[this.selectedAppointment.doctor]

        this.appointment_dialog = true
      },
      async handleEditClick(info) {
        console.log(this.selectedAppointment)
        try{
          const patient_name = `${this.selectedAppointment.patient}`
          const doctor_name = `${this.selectedAppointment.doctor}`
          const patientNameToIdMap = {}
          
          this.patients.forEach(patient => {
            patientNameToIdMap[patient.name] = patient;
          })
          const doctorNameToIdMap = {}
          this.doctors.forEach(doctor => {
            doctorNameToIdMap[doctor.name] = doctor;
          })

          this.selectedAppointment.patient = patientNameToIdMap[patient_name]._id
          this.selectedAppointment.doctor = doctorNameToIdMap[doctor_name]._id
          const patient_email = patientNameToIdMap[patient_name].email
          await axios.put(`http://localhost:3000/api/appointments/${this.selectedAppointment._id}`, this.selectedAppointment);

          console.log(patient_name)
          console.log(patient_email)
          console.log(this.selectedAppointment.date)
          await axios.post('http://localhost:3000/api/email/update', {
            name: patient_name,
            email: patient_email,
            message: `${this.selectedAppointment.title} on ${this.selectedAppointment.date.split("T")[0]} at ${this.selectedAppointment.date.split("T")[1]} at ${this.selectedAppointment.location}`
          })
          
          this.edit_appointment_dialog = false
          this.fetchAppointments()
        } catch (error) {
          console.error("Error editing appointments: ", error);
        }
      },
      async addEvent() {
        try{
          const patient_name = `${this.editedItem.patient}`
          const doctor_name = `${this.editedItem.doctor}`
          const patientNameToIdMap = {}
          
          this.patients.forEach(patient => {
            patientNameToIdMap[patient.name] = patient;
          })
          const doctorNameToIdMap = {}
          this.doctors.forEach(doctor => {
            doctorNameToIdMap[doctor.name] = doctor;
          })

          this.editedItem.patient = patientNameToIdMap[patient_name]._id
          this.editedItem.doctor = doctorNameToIdMap[doctor_name]._id
          const patient_email = patientNameToIdMap[patient_name].email
          await axios.post('http://localhost:3000/api/appointments/new', this.editedItem);

          // Generate a new event and push it to the events array
          this.calendarOptions.events.push({
            title: this.editedItem.title,
            date: this.editedItem.date, // Use current date as start
            patient: this.editedItem.patient,
            location: this.editedItem.location,
            doctor: this.editedItem.doctor
          })
          const date = this.editedItem.date.split("T")

          this.dialog = false

          // send email
          await axios.post('http://localhost:3000/api/email/reminder', {
            name: patient_name,
            email: patient_email,
            message: `${this.editedItem.title} on ${date[0]} at ${date[1]} at ${this.editedItem.location}`

          })
          this.editedItem = this.defaultItem
        } catch (error) {
          console.error("Error creating appointments: ", error);
        }
      },
      async openEditModal() {
        this.appointment_dialog = false
        this.edit_appointment_dialog = true

        const date = moment(this.selectedAppointment.date).format("YYYY-MM-DDThh:mm")

        // this.calendarOptions.events

        this.selectedAppointment.date = date

      }
    },
  }
  </script>
  
  <style scoped>
  .footer {
    margin-top: 2rem;
    padding: 2rem 0;
    background: #f5f5f5;
  }

  .has-background-gradient {
  background: linear-gradient(45deg, #46cdcf, #4e94f3);
  }

  @media (prefers-color-scheme: dark) {
  .footer {
    background: #333; /* Dark background color */
    color: #f5f5f5; /* Light text color */
  }
}

  
  
  </style>