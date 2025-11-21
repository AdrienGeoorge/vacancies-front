<template>
  <div>
    <h2>Tableau de bord</h2>
    <p>Bienvenue dans ton dashboard sécurisé !</p>
    <button @click="logout">Se déconnecter</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('jwt_token');
      this.$router.push('/login');
    },
  },
};
</script>
