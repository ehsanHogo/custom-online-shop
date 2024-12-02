import { ref, onMounted, onUnmounted } from "vue";

export function useIsDesktop() {

    const isDesktop = ref(window.innerWidth >= 768);

    

    // Function to check the viewport size
    const checkViewport = () => {
      isDesktop.value = window.innerWidth >= 768;
    };

    // Lifecycle hooks
    onMounted(() => {
      window.addEventListener("resize", checkViewport);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkViewport);
    });
 


}
