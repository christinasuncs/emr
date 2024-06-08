<template>
    <div>
      <!-- Hero Section -->
      <section class="hero is-info has-background-gradient" style="margin-bottom: 2rem;">
        <div class="hero-body">
          <p class="title">Drugs</p>
          <p class="subtitle" style="margin-top: 1rem;">Manage drug inventory and patient medications</p>
        </div>
      </section>
  
      <div style="display: block; margin-left: auto; margin-right: auto; width: 90%;">
        <!-- Search Bar -->
      <v-text-field v-model="search" label="Search Drugs" class="mb-4"></v-text-field>

      <!-- Drug List -->
      <v-data-table :headers="headers" :items="filteredDrugs" :search="search" class="elevation-1" :loading="loading">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Drug List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <!-- Loading Indicator -->
          <template v-slot:loading>
            <v-progress-circular indeterminate color="primary" class="mx-auto"></v-progress-circular>
          </template>
        <!-- Column for Button -->
        <template v-slot:item.addDrug="{ item }">
          <v-btn color="primary" @click="openAddDrugDialog(item)">Add</v-btn>
        </template>
      </v-data-table>

        <br><br>
        </div>

        <!-- Footer -->
        <footer class="footer">
          <div class="content has-text-centered">
            <p><strong>EMR</strong> &copy; 2024.</p>
          </div>
        </footer>
        
      <!-- Drug dialog for adding drugs -->
      <v-dialog v-model="addDrugDialog" max-width="500">
        <v-card>
          <v-card-title>Add Drug</v-card-title>
          <v-card-text>
            <!-- dropdown for selecting a patient -->
            <v-select v-model="selectedPatient" :items="patients" item-text="name" item-value="_id" label="Select Patient" filter></v-select>
            <div>Drug Name: {{ selectedDrug ? selectedDrug.brand_name : '' }}</div>
            <v-text-field v-model="dosage" label="Dosage"></v-text-field>
            <v-text-field v-model="frequency" label="Frequency"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="submitDrug">Add</v-btn>
            <v-btn color="error" @click="addDrugDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
  </template>
  
  <script>
  import { addDrugToUser } from '@/services/UserService';

  export default {
    data() {
      return {
        search: '',
        drugs: [],
        headers: [
        { title: 'Drug Code', value: 'drug_code' },
        { title: 'Brand Name', value: 'brand_name' },
        { title: 'Drug ID Number', value: 'drug_identification_number' },
        { title: 'Company Name', value: 'company_name' },
        { title: 'Last Update', value: 'last_update_date' },
        { title: 'Assign Drug', value: 'addDrug', sortable: false },
      ],
        addDrugDialog: false,
        selectedDrug: null,
        dosage: '',
        frequency: '',
        patientSearch: '',
        patients: [],
        selectedPatient: null,
        loading: true
      }
    },
    mounted() {
      this.fetchDrugs();
      this.fetchPatients();
    },
    computed: {
      filteredDrugs() {
        // search term to lowercase in case
        const searchTerm = this.search.toLowerCase();
        return this.drugs.filter(drug =>
          drug.brand_name.toLowerCase().includes(searchTerm) ||
          drug.company_name.toLowerCase().includes(searchTerm) ||
          drug.drug_identification_number.includes(searchTerm)
        );
      },
      filteredPatients() {
        const searchTerm = this.patientSearch.toLowerCase();
        return this.patients.filter(patient =>
          patient.title.toLowerCase().includes(searchTerm)
        );
      },
    },
    created() {
      this.fetchDrugs();
    },
    methods: {
      async fetchDrugs() {
        this.loading = true;
        try {
          const response = await fetch('https://health-products.canada.ca/api/drug/drugproduct');
          const data = await response.json();
          this.drugs = data;
        } catch (error) {
          console.error('Error fetching drugs:', error);
        } finally {
          this.loading = false;
        }
      },
      async fetchPatients() {
      try {
        const response = await fetch('http://localhost:3000/api/user/patients');
        if (response.ok) {
          const patients = await response.json();
          // map patients array to include a 'title' property
          this.patients = patients.map(patient => ({
            _id: patient._id,
            title: patient.name, 
          }));
        } else {
          console.error('Error fetching patients:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    },

      async submitDrug() {
        try {
          console.log(this.selectedPatient)
          await addDrugToUser(this.selectedPatient, {
            drugName: this.selectedDrug.brand_name,
            dosage:  this.dosage,
            frequency: this.frequency,
          });
          // Log successful addition
          console.log('Drug added successfully.');
          // Close the dialog
          this.addDrugDialog = false;
        } catch (error) {
          console.error('Error adding drug:', error);
        }
      },
        openAddDrugDialog(item) {
          this.selectedDrug = item;
          this.dosage = '';
          this.frequency = '';
          this.addDrugDialog = true;
      },
    }
  }
  </script>
  
  <style scoped>



.footer {
    margin-top: 2rem;
    padding: 2rem 0;
    background-color: #f8f9fa;
  }

  .has-background-gradient {
    background: linear-gradient(45deg, #4e94f3, #46cdcf);
  }



@media (prefers-color-scheme: dark) {
    .footer {
        background-color: #212529;
        color: #f8f9fa;
    }

    .has-background-gradient {
        background: linear-gradient(45deg, #2a2a2a, #1a1a1a); 

    }

      .v-data-table {
    background-color: #2a2a2a;
    color: #f8f9fa;
  }

  .v-data-table th {
    background-color: #333;
    color: #f8f9fa;
  }

  .v-data-table td {
    border-color: #444;
  }

  .v-toolbar {
    background-color: #333;
  }

  .v-toolbar-title {
    color: #f8f9fa;
    background-color: #333;
  }

  .v-btn {
    background-color: #333;
    color: #f8f9fa;
  }

  .v-text-field input,
  .v-select input {
    background-color: #333;
    color: #f8f9fa;
  }

  .v-text-field label,
  .v-select label {
    color: #f8f9fa;
  }

}




  
  </style>
  