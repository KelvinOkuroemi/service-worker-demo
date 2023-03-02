// Step - Register service worker
if (navigator.serviceWorker) {
    // Check for browser support
    window.addEventListener("load", () => {
      // After browser loads
      navigator.serviceWorker
        .register(
          "/serviceWorkerDemo/sw-demo/serviceWorker.js"
        ) // Register
        .then((reg) => console.log("service worker registered"))
        .catch((err) => console.log(`Here is the error: ${err}`));
    });
  }
  
