<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a
            href="https://github.com/deadphoenix8091/nosdave-frontend"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            Github
          </a>
        </li>
      </ul>
      <div class="copyright">
        &copy; {{ year }}, made with <i class="tim-icons icon-heart-2"></i> by
        
        <a
          href="https://github.com/deadphoenix8091"
          target="_blank"
          rel="noopener"
          >deadphoenix8091</a
        >.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
