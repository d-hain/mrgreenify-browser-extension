let enabled = true;
const checkboxEnabled = document.getElementById("checkbox-enabled");

chrome.storage.local.get("enabled", (data) => {
    enabled = !!data.enabled; // !! converts to boolean

    if (enabled) {
        checkboxEnabled.checked = true;
    } else {
        checkboxEnabled.checked = false;
    }
});

checkboxEnabled.onclick = () => {
    enabled = !enabled;
    chrome.storage.local.set({ enabled });
};
