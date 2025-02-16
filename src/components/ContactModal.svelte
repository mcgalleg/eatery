<script>
  import { onMount } from 'svelte';
  
  export let isOpen = false;
  
  function openModal() {
    console.log('openModal called');
    isOpen = true;
    document.body.classList.add('modal-open');
  }
  
  let formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    eventType: 'Corporate',
    package: 'Special Delivery',
    venue: '',
    message: ''
  };
  
  let isSubmitting = false;
  let submitStatus = { success: false, message: '' };
  
  const closeModal = () => {
    console.log('closeModal called');
    isOpen = false;
    document.body.classList.remove('modal-open');
    formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      eventDate: '',
      guestCount: '',
      eventType: 'Corporate',
      package: 'Special Delivery',
      venue: '',
      message: ''
    };
    submitStatus = { success: false, message: '' };
  };
  
  // Close modal on escape key
  const handleKeydown = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  
  onMount(() => {
    console.log('ContactModal mounted');
    if (typeof window !== 'undefined') {
      // Expose the openModal function globally
      window.openQuoteModal = openModal;
      
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
        // Clean up the global function
        delete window.openQuoteModal;
      };
    }
  });
  
  $: {
    console.log('isOpen changed:', isOpen);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    isSubmitting = true;
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        submitStatus = {
          success: true,
          message: 'Thank you for your inquiry! We will get back to you shortly.'
        };
        setTimeout(closeModal, 3000);
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      submitStatus = {
        success: false,
        message: error.message || 'Failed to send message. Please try again.'
      };
    } finally {
      isSubmitting = false;
    }
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
         role="dialog" 
         aria-modal="true">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Request a Quote</h2>
          <button 
            class="text-gray-500 hover:text-gray-700"
            on:click={closeModal}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        {#if submitStatus.message}
          <div class={`p-4 mb-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitStatus.message}
          </div>
        {/if}
        
        <form on:submit={handleSubmit} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                id="firstName"
                bind:value={formData.firstName}
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
              />
            </div>
            
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                id="lastName"
                bind:value={formData.lastName}
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
              />
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                id="phone"
                bind:value={formData.phone}
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
              />
            </div>
            
            <div>
              <label for="eventDate" class="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
              <input
                type="date"
                id="eventDate"
                bind:value={formData.eventDate}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
              />
            </div>
            
            <div>
              <label for="guestCount" class="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
              <input
                type="number"
                id="guestCount"
                bind:value={formData.guestCount}
                min="1"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
              />
            </div>
            
            <div class="md:col-span-2">
              <label for="eventType" class="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
              <select
                id="eventType"
                bind:value={formData.eventType}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
              >
                <option value="Corporate">Corporate</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Memorial Service">Memorial Service</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="md:col-span-2">
              <label for="package" class="block text-sm font-medium text-gray-700 mb-1">Package</label>
              <select
                id="package"
                bind:value={formData.package}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
              >
                <option value="Special Delivery">Special Delivery</option>
                <option value="Staffed Event">Staffed Event</option>
                <option value="Venue Reservation">Venue Reservation</option>
              </select>
            </div>
          </div>
          
          <div>
            <label for="venue" class="block text-sm font-medium text-gray-700 mb-1">Venue Address (if known)</label>
            <input
              type="text"
              id="venue"
              bind:value={formData.venue}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
            />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
            <textarea
              id="message"
              bind:value={formData.message}
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full px-6 py-3 bg-orange text-gray-600 rounded-lg hover:opacity-90 transition-opacity font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Prevent body scroll when modal is open */
  :global(body.modal-open) {
    overflow: hidden;
  }
</style> 