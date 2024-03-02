<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from '$app/stores';
    import { enhance } from "$app/forms";
    import Navbar from "$lib/components/Navbar.svelte";
    import { db, userData, user } from "$lib/firebase";
    import { onSnapshot, doc } from "firebase/firestore";
    import { onDestroy } from "svelte";
    import { writable } from "svelte/store";
  
    export let data: PageData = {
        username: '',
        bio: '',
        photoURL: '',
    };

    const fetchedUserData = writable({}); //new writable store 

    async function fetchUserData() {
        if($user){
            const userRef = doc(db, "users", $user.uid)
            unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const fetchedData = docSnapshot.data();
                fetchedUserData.set(fetchedData);
                data = {   // update data
                    username: fetchedData.username,
                    bio: fetchedData.bio,
                    photoURL: fetchedData.photoURL,
                };
            } else {
                console.error("User document does not exist");
            }
        });
        }
    }

    let unsubscribe: () => void;
    fetchUserData();

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });
</script>
  
<Navbar />
<main class="max-w-lg prose text-center mx-auto my-6">
    <img
    src={data.photoURL ?? "/user.png"}
    alt="photoURL"
    width="256"
    class="mx-auto"
  />

  <h1 class="text-7xl text-purple-500 pb-5">
    @{$userData?.username}
  </h1>
  
    <p>Current Bio: <span class="text-info">{data.bio}</span></p>
  
    <p>Status Code: {$page.status}</p>
    <p class="text-error">{$page.form?.problem ?? ''}</p>
  
    <form method="POST" use:enhance>
      <div class="form-control">
        <label for="bio" class="label">
          <span class="label-text">Your bio</span>
        </label>
        <textarea
          name="bio"
          class="textarea textarea-bordered textarea-accent"
          value={data.bio}
        />
      </div>
      <button class="btn btn-primary my-5">Update Bio</button>
    </form>
  </main>
  