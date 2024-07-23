<template>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <section class="hero is-fullheight has-background-gradient" style="padding-top: 50px;">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <div class="box">
              <figure class="avatar">
                <img src="../assets/images/logo.jpg">
              </figure>
              <br>
              <div>
                <!-- <button class="button is-medium" @click="handleLogin()"> -->
                <button class="button is-medium">
                  <a href="https://electronic-medical-record-uqm3.onrender.com/api/uac/google">
                    <img src="../assets/images/google_logo.png" alt="Google Logo" style="width: 20px; height: 20px; margin-right: 5px;">
                    Login with Google
                  </a>  
                </button>
              </div>
              <br>
              <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>
            </div>
          </div>
      </div>
    <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>EMR</strong> &copy; 2024.
      </p>
    </div>
  </footer>
    </section>

  </template>
    
    <script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { login as authLogin } from '@/services/AuthService';

const store = useStore();
const router = useRouter();
const errorMessage = ref('');

// const handleLogin = async () => {
//   try {
//     // Simulate successful login
//     store.dispatch('login');
//     errorMessage.value = '';
//     router.push('/');
//   } catch (error) {
//     console.error(error);
//     errorMessage.value = 'Login failed. Please try again.';
//   }
// };

// const handleLogin = async () => {
//   try {
//     const response = await authLogin();
//     console.log(response.data); // Handle login response
//     store.dispatch('login');
//     errorMessage.value = '';
//     router.push('/');
//   } catch (error) {
//     console.error(error);
//     errorMessage.value = 'Login failed. Please try again.';
//   }
// };
</script>
    
    <style scoped>
  .login-hr {
    border-color: black;
  }
  
  .avatar {
    margin: 0 auto;
  }

  .has-background-gradient {
  background: linear-gradient(45deg, #4e94f3, #46cdcf);
  }
  
    </style>
    