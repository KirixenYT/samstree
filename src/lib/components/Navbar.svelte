<script>
  import { auth, user } from "$lib/firebase";
  import { signOut } from "firebase/auth";
  import { userData } from "$lib/firebase";
  import { goto } from "$app/navigation";
  let isOpen = false;

  async function signOutSSR() {
    const res = await fetch("/api/signin", {method: "DELETE"});
    await signOut(auth);
    goto("/login") //redirect to login page
  }

  function checkIsOpened(){
    isOpen= !isOpen;
  }
</script>

<nav class="navbar bg-base-100 max-w-full w-full">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost normal-case text-xl">Sam's tree</a>
  </div>

  <div class="navbar-center lg:hidden">
    <button on:click={checkIsOpened}>
      <!-- Replace "Menu" with your hamburger icon -->
        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
        <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
        <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
        </svg>
    </button>
    {#if isOpen}
      <ul class="menu">
        <li>
          <a href="/{$userData?.username}">👁️View</a>
        </li>
        <li>
          <a href="/{$userData?.username}/edit">🎨Edit</a>
        </li>
        <li>
          <a href="/{$userData?.username}/bio">✏️Edit Bio</a>
        </li>
      </ul>
    {/if}
  </div>

  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li>
        <a href="/{$userData?.username}">👁️View</a>
      </li>
      <li>
        <a href="/{$userData?.username}/edit">🎨Edit</a>
      </li>
      <li>
        <a href="/{$userData?.username}/bio">✏️Edit Bio</a>
      </li>
    </ul>
  </div>

  <div class="navbar-end">
    <button class="btn btn-primary" on:click={ () => signOutSSR()}>Sign Out</button>
  </div>
</nav>

<style>
@media(max-width: 1023px){
  .navbar-center{
    overflow-x: auto;
    white-space: nowrap;
  }
  .navbar-center ul {
    display: inline-flex;
  }
}
</style>
