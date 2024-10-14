<template>
    <div class="bg-gray-50">
        <h1>Hello App!</h1>
        <p>
            <strong>Current route path:</strong> {{ $route.fullPath }}
        </p>
        <nav>
            <RouterLink to="/">Go to Home</RouterLink>
            <br />
            <RouterLink to="/login">Go to About</RouterLink>
        </nav>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
    components: {
        RouterLink, RouterView
    }
}
</script>