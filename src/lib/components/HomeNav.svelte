<script>
    import { auth, user } from "$lib/firebase";
    import { signOut } from "firebase/auth";
    import { userData } from "$lib/firebase";
    import { goto } from "$app/navigation";
    
    
    

    let isOpen = false;
    let isSignedIn =false;
    async function signOutSSR() {
      const res = await fetch("/api/signin", {method: "DELETE"});
      await signOut(auth);
      goto("/login") //redirect to login page
    }
    
    function checkIsOpened(){
      isOpen= !isOpen;
    }

    function checkIsSignedIn(){

    }

    export let className = '';
</script>
  
  <nav class="navbar bg-base-100 max-w-full w-full {className}">
    <div class="navbar-start">
        <a href="/" class="btn btn-ghost normal-case text-xl">Sam's tree</a>
      </div>
    <!-- ... -->
    {#if $user}  <!-- Change this to $user -->
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
    {:else}
      <div class="navbar-end">
        <button class="btn btn-primary" on:click={ () => signOutSSR()}>Sign In</button>
      </div>
    {/if}
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
  