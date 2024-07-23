<template>
  <div>
    <!--Patient Header-->
    <section class="hero is-info has-background-gradient" style="margin-bottom: 2rem;">
      <div class="hero-body">
        <p class="title">
          Patients
        </p>
        <p class="subtitle" style="margin-top: 1rem;">
          View patient listing and personal details
        </p>
      </div>
    </section>
    <!--Content-->
    <section class="section">
      <div class="container has-text-centered">
        <h1 class="title">Patient Database</h1>
        <div class="columns is-centered is-multiline" >
          <div class="column is-full">
            <div class="columns is-centered">
              <div class="column is-half is-narrow">
                <div class="field has-addons">
                  <div class="control is-expanded">
                    <input
                      class="input"
                      type="text"
                      placeholder="Search for patients..."
                      v-model="searchQuery"
                    />
                  </div>
                </div>
              </div>
            </div>
            <v-btn
              class="ms-auto"
              color="blue-darken-1"
              variant="elevated"
              text="Add Patient"
              @click="newPatientDialog = true"
            ></v-btn>
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <table class="table is-fullwidth is-striped is-hoverable">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Email Address</th>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>Medications</th>
                        <th>Immunizations</th>
                        <th>Appointments</th>
                        <th>Lab Reports</th>
                        <th>Edit Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="patient in filteredPatients" :key="patient.id">
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.email }}</td>
                        <td>{{ patient.age }}</td>
                        <td>{{ patient.sex }}</td>
                        <td>{{ patient.medications.map((drug => {
                          return drug.drugName;
                        })).join(", ")}}</td>
                        <td>
                          <ul>
                            <li v-for="immunization in patient.immunizations" :key="immunization._id">
                              {{ immunization.name }} ({{ formatDate(immunization.date) }})
                            </li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li v-for="appointment in patient.appointments" :key="appointment._id">
                              {{ formatDate(appointment.date) }} - {{ appointment.title }}
                            </li>
                          </ul>
                        </td>
                        <td>{{ patient.labReports }}</td>
                        <td>
                          <button class="button is-info" @click="editPatientDialog(patient)">Edit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Add Patient Dialog -->
    <v-dialog v-model="newPatientDialog" max-width="500">
    <v-card>
      <v-card-title>Add New Patient</v-card-title>
      <v-card-text>
        <!--Name-->
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" v-model="newPatientData.name" />
          </div>
        </div>
        <!--Email-->
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" v-model="newPatientData.email" />
          </div>
        </div>
        <!--Age-->
        <div class="field">
          <label class="label">Age</label>
          <div class="control">
            <input class="input" type="number" v-model="newPatientData.age" />
          </div>
        </div>
        <!--Sex-->
        <div class="field">
          <label class="label">Sex</label>
          <div class="control">
            <div class="select">
              <select v-model="newPatientData.sex">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
      </v-card-text>
      <!--Save or Cancel-->
      <v-card-actions>
        <v-btn color="primary" @click="saveNewPatient">Save</v-btn>
        <v-btn color="error" @click="newPatientDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

    <!-- Edit Patient Dialog -->
  <v-dialog v-model="showEditDialog" max-width="500">
    <v-card>
      <v-card-title>Edit Patient</v-card-title>
      <v-card-text>
        <!--Name-->
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" v-model="editPatientData.name" />
          </div>
        </div>
        <!--Email-->
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" v-model="editPatientData.email" />
          </div>
        </div>
        <!--Age-->
        <div class="field">
          <label class="label">Age</label>
          <div class="control">
            <input class="input" type="number" v-model="editPatientData.age" />
          </div>
        </div>
        <!--Sex-->
        <div class="field">
          <label class="label">Sex</label>
          <div class="control">
            <div class="select">
              <select v-model="editPatientData.sex">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
        <!--Medications-->
        <div class="field">
          <label class="label">Medications</label>
          <div class="control">
            <input class="input" v-model="editPatientData.medicationsString" />
          </div>
        </div>
        <!-- Immunizations -->
        <div class="immunizations-section">
          <h3 class="label">Immunizations</h3>
          <ul>
              <li v-for="(immunization, index) in editPatientData.immunizations" :key="index">
                {{ immunization.name }} ({{ formatDate(immunization.date) }})
              </li>
          </ul>
           <div class="field">
            <label class="label">Add Immunization</label>
            <div class="control">
              <input class="input" v-model="newImmunization.name" placeholder="Immunization Name" />
            </div>
            <div class="control">
                <input class="input" type="date" v-model="newImmunization.date" placeholder="Date" />
              </div>
              <div class="control">
                <input class="input" type="date" v-model="newImmunization.next" placeholder="Next Immunization Date" />
              </div>
            </div>
            <button class="button is-info is-small" @click="addImmunization">Add Immunization</button>
          </div>
          <!-- Appointments -->
          <div class="appointments-section">
            <h3 class="label">Appointments</h3>
            <ul>
              <li v-for="(appointment, index) in editPatientData.appointments" :key="index">
                {{ formatDate(appointment.date) }} - {{ appointment.title }}
              </li>
            </ul>
            <div class="field">
              <label class="label">Add Appointment</label>
              <div class="control">
                <input class="input" type="date" v-model="newAppointment.date" placeholder="Appointment Date" />
              </div>
              <!-- <div class="control">
                <input class="input" v-model="newAppointment.doctor" placeholder="Doctor ID" />
              </div>
              <div class="control">
                <input class="input" v-model="newAppointment.patient" placeholder="Patient ID" />
              </div> -->
              <!-- Doctor Dropdown -->
              <div class="control">
                <div class="select">
                  <select v-model="newAppointment.doctor">
                    <option disabled value="">Select Doctor</option> <!-- Placeholder -->
                    <option v-for="doctor in doctors" :value="doctor._id">{{ doctor.name }}</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <input class="input" v-model="newAppointment.location" placeholder="Location" />
              </div>
              <div class="control">
                <input class="input" v-model="newAppointment.title" placeholder="Appointment Title" />
              </div>
            </div>
            <button class="button is-info is-small" @click="addAppointment">Add Appointment</button>
          </div>
      <!--Lab Reports-->
        <div class="field">
          <label class="label">Lab Reports</label>
          <div class="control">
            <input class="input" v-model="editPatientData.labReports" />
          </div>
        </div>
      </v-card-text>
      <!--Save or Cancel-->
      <v-card-actions>
        <v-btn color="primary" @click="savePatient">Save</v-btn>
        <v-btn color="error" @click="closeEditDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <br>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>EMR</strong> &copy; 2024.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>

import axios from "axios"
export default {
  data() {
    return {
      searchQuery: "",
      patients: [],
      doctors: [],
      showEditDialog: false,
      newPatientDialog: false,
      editPatientData: {
        immunizations: [],
        appointments: []
      },
      newPatientData: {
        name: "",
        email: "",
        age: "",
        sex: "",
        medicationsString: "",
        immunizations: [],
        appointments: [],
        labReports: ""
      },
      newImmunization: {
        name: "",
        date: "",
        next: "",
      },
      newAppointment: {
        date: "",
        doctor: "",
        patient: "",
        location: "",
        title: "",
      },
    };
  },

  mounted() {
    this.getPatients();
    this.fetchDoctors();
  },

  computed: {
    filteredPatients() {
      return this.patients.filter(patient => {
        const query = this.searchQuery.toLowerCase();
        return patient.name.toLowerCase().includes(query);
      });
    },
    immunizationsWithEmpty() {
    return this.editPatientData.immunizations.length === 0 ? [{}] : this.editPatientData.immunizations;
  }
  },
  methods: {
    async saveNewPatient() {
      // console.log(this.newPatientData)
      try{
        const newPatient = {
          ...this.newPatientData,
          medications: this.newPatientData.medicationsString.split(",").map(drugName => ({ drugName: drugName.trim() })),
          role: "Patient"
        }
        await axios.post('https://electronic-medical-record-uqm3.onrender.com/api/user/', newPatient);
        this.newPatientDialog = false
        this.getPatients()
      } catch (error) {
        console.error("Error creating new patient: ", error);
      }

    },
    async getPatients() {
      try{
        const patients = await axios.get('https://electronic-medical-record-uqm3.onrender.com/api/user/patients/'); 
        this.patients = patients.data;
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    },
    async fetchDoctors() {
        try {
            const response = await axios.get('https://electronic-medical-record-uqm3.onrender.com/api/user/doctors');
            this.doctors = response.data;
        } catch (error) {
            console.error("Error fetching doctors: ", error);
        }
    },
    // editPatientDialog(patient) {
    //   this.showEditDialog = true;
    //   this.editPatientData = {
    //     ...patient,
    //     medicationsString: patient.medications.map(drug => drug.drugName).join(", "),
    //     immunizations: patient.immunizations || []    // initialize an empty array if the patient doesn't have any existing immunizations
    //   };
    //   this.editPatientData.id = patient.id;
    // },
    editPatientDialog(patient) {
      this.showEditDialog = true;
      this.editPatientData = {
        ...patient,
        medicationsString: patient.medications.map(drug => drug.drugName).join(", "),
      };
      // Initialize new immunization and appointment fields to empty
      this.newImmunization = {
        name: "",
        date: "",
        next: ""
      };
      this.newAppointment = {
        date: "",
        doctor: "",
        patient: "",
        location: "",
        title: ""
      };
      this.editPatientData.id = patient._id;
    },

    // set showEditDialog to false to close it
    closeEditDialog() {
      this.showEditDialog = false;
      this.editPatientData = {};
    },

    addImmunization() {
      if (this.newImmunization.name && this.newImmunization.date) {
        this.editPatientData.immunizations.push({ ...this.newImmunization });
        this.newImmunization = {
          name: "",
          date: "",
          next: ""
        };
      } else {
        alert("Please fill out the immunization name and date.");
      }
    },
    addAppointment() {
      if (this.newAppointment.date && this.newAppointment.title) {
        this.newAppointment.patient = this.editPatientData._id
        this.editPatientData.appointments.push({ ...this.newAppointment });
        this.newAppointment = {
          date: "",
          doctor: "",
          patient: "",
          location: "",
          title: ""
        };
      } else {
        alert("Please fill out the appointment date and title.");
      }
    },

    async savePatient() {
      try {
        const updatedPatient = {
          ...this.editPatientData,
          medications: this.editPatientData.medicationsString.split(",").map(drugName => ({ drugName: drugName.trim() }))
        };

        await axios.put(`https://electronic-medical-record-uqm3.onrender.com/api/user/${updatedPatient._id}`, updatedPatient);
        const index = this.patients.findIndex(patient => patient._id === updatedPatient._id);
        if (index !== -1) {
          // Update the patient directly in the array
          this.patients[index] = updatedPatient;
        }
        this.closeEditDialog();
      } catch (error) {
        console.error("Error updating patient: ", error);
      }
    },

    //format the date for the immunizations
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Adjust the date format as needed
    }
  },
};
</script>

<style scoped>
.columns.is-centered {
  display: flex;
  justify-content: center;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.table {
  margin-top: 1rem;
}

.table th,
.table td {
  padding: 1rem;
  text-align: left;
  border-right: 1px solid #ddd; /* Add right border */
}

.table th:last-child,
.table td:last-child {
  border-right: none; /* Remove right border for the last column */
}

.table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.table td {
  vertical-align: middle;
}

.footer {
  padding: 2rem 0;
}

.social-icons a {
  margin-right: 1.0rem;
}

:root {
      --bg-color: #fff;
      --text-color: #000;
      --border-color: #ccc;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg-color: #333;
        --text-color: #fff;
        --border-color: #444;
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      background-color: var(--bg-color);
      color: var(--text-color);
      border: 1px solid var(--border-color);
      padding: 8px;
    }

    th:nth-child(odd) {
      background-color: var(--bg-color);
    }

    th:nth-child(even) {
      background-color: var(--border-color);
    }

  .immunizations-section,
  .appointments-section {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .immunizations-section h3,
  .appointments-section h3 {
    margin-bottom: 1rem;
  }

  /* Add spacing between the dropdowns */
  .field {
    margin-bottom: 1rem;
  }

</style>
