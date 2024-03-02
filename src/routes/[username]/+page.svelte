<script lang="ts">
    import UserLink from "$lib/components/UserLink.svelte";
    import type { PageData } from "./$types";
    import Navbar from "$lib/components/Navbar.svelte";
    export let data: PageData;
  
</script>
  
  <svelte:head>
    <title>@{data.username} Links</title>
    <meta name="description" content={data.bio} />
  </svelte:head>
  
  
 
  <main class="prose text-center mx-auto mt-8 justify-center max-w-xl">
    
    <h1 class="text-7xl text-purple-500">
      @{data.username}
    </h1>
  
    <img
      src={data.photoURL ?? "/user.png"}
      alt="photoURL"
      width="256"
      class="mx-auto pt-5"
    />
  
    <p class="text-xl my-8">{data.bio ?? "no bio yet..."}</p>
    <div class="text-center mb-8 max-w-xl mx-auto group relative">
      <ul class="flex flex-col items-center">
        {#each data.links as item}
          <li class="my-2">
            <UserLink {...item} />
          </li>
        {/each}
      </ul>
    </div>

  
  </main>