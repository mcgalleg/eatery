<script>
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="bg-nav-pattern bg-repeat-x w-full fixed top-0 z-50 ">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-24 md:h-32 pr-4">
      <!-- Left Menu -->
      <div class="hidden md:flex items-center space-x-2 lg:space-x-4 mb-4">
        {#each ['ORDER ONLINE', 'MENU'] as item, i}
          <div class="relative">
            <a 
              href={i === 0 ? 'https://order.toasttab.com/online/rositas' : '/menu' } 
              class="text-white hover:text-yellow px-2 lg:px-3 py-2 rounded-md relative menu-item whitespace-nowrap text-sm lg:text-base"
              target={i === 0 ? '_blank' : null}
              rel={i === 0 ? 'noopener noreferrer' : null}
            >
              {item}
            </a>
            <img 
              src="/burst.svg" 
              alt="" 
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 transition-opacity duration-200 pointer-events-none burst-overlay"
            />
            <img 
              src="/burst.svg" 
              alt="" 
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 transition-opacity duration-200 pointer-events-none burst-overlay-bottom"
            />
          </div>
        {/each}
      </div>

      <!-- Logo/Brand (Centered) -->
      <div class="flex-shrink-0 mb-4 flex justify-center w-full md:w-auto md:mb-4">
        <a href="/" class="block">
          <img src="/rositas-logo.svg" alt="Uncle Julio's" class="h-16 md:h-20 w-auto" />
        </a>
      </div>

      <!-- Right Menu -->
      <div class="hidden md:flex items-center space-x-2 lg:space-x-4 mb-4">
        {#each ['VENUE & CATERING', 'GIFT CARDS & REWARDS'] as item, i}
          <div class="relative">
            <a 
              href={i === 0 ? '/venue-catering' : '/gift-card'} 
              class="text-white hover:text-yellow px-2 lg:px-3 py-2 rounded-md relative menu-item whitespace-nowrap text-sm lg:text-base"
            >
              {item}
            </a>
            <img 
              src="/burst.svg" 
              alt="" 
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 transition-opacity duration-200 pointer-events-none burst-overlay"
            />
            <img 
              src="/burst.svg" 
              alt="" 
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 transition-opacity duration-200 pointer-events-none burst-overlay-bottom"
            />
          </div>
        {/each}
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button 
          on:click={toggleMenu}
          class="text-white hover:text-gray-300 mb-4 mr-4"
          aria-label="Toggle menu"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {#if isMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <div class="md:hidden fixed inset-0 bg-gray-900 bg-opacity-90 z-40">
      <!-- Close button -->
      <button 
        on:click={toggleMenu}
        class="absolute top-4 right-4 text-white hover:text-gray-300"
        aria-label="Close menu"
      >
        <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Menu items -->
      <div class="flex flex-col items-center justify-center h-full">
        <a 
          href="/" 
          class="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-2xl mb-4"
        >
          HOME
        </a>
        <a 
          href="https://order.toasttab.com/online/rositas" 
          class="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-2xl mb-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          ORDER ONLINE
        </a>
        <a href="/menu" class="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-2xl mb-4">
          MENU
        </a>
        <a href="/venue-catering" class="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-2xl mb-4">
          VENUE & CATERING
        </a>
        <a href="/gift-card" class="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-2xl">
          GIFT CARDS & REWARDS
        </a>
      </div>
    </div>
  {/if}
</nav>

<style>
  :global(.bg-nav-pattern) {
    background-image: url('/Nav-BG.webp');
    background-position: bottom;
  }

  .menu-item:hover + .burst-overlay,
  .menu-item:hover ~ .burst-overlay-bottom {
    opacity: 1;
  }

  .relative {
    isolation: isolate;
  }

  .menu-item {
    z-index: 2;
  }

  .burst-overlay {
    z-index: 1;
    width: 64px; /* Set width to 16px */
    height: auto; /* Maintain aspect ratio */
    opacity: 0; /* Ensure it's hidden by default */
    transition: opacity 0.2s; /* Smooth transition */
    position: absolute; /* Position it absolutely */
    left: 50%; /* Center horizontally */
    top: -32px; /* Position it above the menu item */
    transform: translateX(-50%); /* Center it */
  }

  .burst-overlay-bottom {
    z-index: 1;
    width: 64px;
    height: auto;
    opacity: 0;
    transition: opacity 0.2s;
    position: absolute;
    left: 50%;
    top: 32px; /* Position it below the menu item */
    transform: translateX(-50%) scaleY(-1); /* Flip vertically */
  }
</style>