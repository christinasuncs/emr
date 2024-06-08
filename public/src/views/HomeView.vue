<template>
  <div>
      <!-- Hero Section -->
      <section class="hero is-info is-medium has-background-gradient">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-size-1">
            Welcome to the EMR Dashboard
          </h1>
          <h2 class="subtitle is-size-4" style="margin-top: 2rem;">
            Manage your electronic medical records efficiently
          </h2>
        </div>
      </div>
    </section>

    <!-- Main Content Sections -->
    <section class="section">
        <div class="container has-text-centered">
          <h2 class="title">Dashboard Overview</h2>
          <p class="subtitle">Quick access to features</p>

        <div class="columns is-centered is-multiline" style="padding: 2rem">
          <!--Patients Card-->
          <div class="column is-half-desktop is-full-mobile">
            <div class="card fade-pop-in">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Patients</p>
                  </div>
                </div>
                <div class="content">
                  View important patient information and medical history.
                  <br>
                  <br>
                  <router-link to="/patients" class="button is-info">View Patients</router-link>
                </div>
              </div>
            </div>
          </div>
          <!--Calendar Card-->
          <div class="column is-half-desktop is-full-mobile">
            <div class="card fade-pop-in">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Calendar</p>
                  </div>
                </div>
                <div class="content">
                  Schedule and manage appointments seamlessly.
                  <br>
                  <br>
                  <router-link to="/calendar" class="button is-info">View Calendar</router-link>
                </div>
              </div>
            </div>
          </div>
          <!--Drugs Card-->
          <div class="column is-half-desktop is-full-mobile">
            <div class="card fade-pop-in">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Drugs</p>
                  </div>
                </div>
                <div class="content">
                  Check drug inventory and assign patient medications.
                  <br>
                  <br>
                  <router-link to="/drugs" class="button is-info">View Drugs</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>

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
</template>

<script>
import { RouterLink } from 'vue-router'
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
}

.has-background-gradient {
  background: linear-gradient(45deg, #4e94f3, #46cdcf);
}


.fade-pop-in {
  opacity: 0;
  transform: scale(0.95);
  animation: fadePopIn 1.5s ease-out forwards;
}

@keyframes fadePopIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>