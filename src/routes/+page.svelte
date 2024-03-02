<script lang="ts">
  import { userData } from "$lib/firebase";
  import HomeNav from "$lib/components/HomeNav.svelte";
  let posX =0;
  let posY =0;
  let isHovered = false;
  let offset = 0;
  function checkHover(e:any){
    isHovered = !isHovered;
    // Get the position of the link and add some offset to it
    // posX = e.target.getBoundingClientRect().left + window.scrollX + 20;
    // posY = e.target.getBoundingClientRect().top + window.scrollY - 50;
  }

  function moveImg(e:any) {
        offset += e.movementX;
    }
</script>
  
  <svelte:head>
    <title>Sam's tree - a place for links</title>
    <meta name="description" content="Demo project for the a linktree clone" />
  </svelte:head>
  
  <!--Specific nav bar for the home page and possibly login-->
  <div class="relative">
    <HomeNav className="absolute"/>
  </div>
  
  <main class="flex w-full min-h-screen">
  
    <div class="hero bg-base-200">
      <div class="hero-content text-center">
        <div class="w-full">
          <h1 class="text-7xl font-bold">Sam's tree</h1>
          <p class="py-6 text-2xl">The best website to share your links</p>
          {#if $userData?.username}
            <a href="/{$userData.username}/edit" class="btn btn-primary">Edit Profile</a>
          {:else}
            <a href="/login" class="btn btn-primary">Get Started</a>
            <a href="/KirIXen" class="btn btn-secondary">Example Profile</a>
          {/if}
          {#if isHovered}
            <img src="anime.gif" alt="Special effect" style="position: absolute; left: {offset +1200}px; top: 450px"/>
          {/if}
          
        </div>
      </div>
    </div>
    
  </main>
