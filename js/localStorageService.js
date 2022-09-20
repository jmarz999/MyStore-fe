storageService = {
    addToLocalStorage: function (item, storageKey) {
        let storageData = [];

        let existingStorage = localStorage.getItem(storageKey)

        if (existingStorage != null) {
            storageData = JSON.parse(existingStorage);
        }

        if (storageData.indexOf(item) == -1) {
            storageData.push(item)
        }
        localStorage.setItem(storageKey, JSON.stringify(storageData))
    },

    removeFromLocalStorage: function (item, storageKey) {
        let existingStorage = localStorage.getItem(storageKey);

        if (existingStorage != null) {
            let storageData = JSON.parse(existingStorage);

            storageData = storageData.filter(x => {
                return x != item;
            });

            localStorage.setItem(storageKey, JSON.stringify(storageData));
        }
    },

    existingStorage: function (item, storageKey) {
        let existingStorage = localStorage.getItem(storageKey);
        let exists = false;

        if (existingStorage != null) {
            let parsed = JSON.parse(existingStorage);
            exists = parsed.indexOf(item) != -1;
        }

        return exists;
    },

    getFromLocalStorage: function (storageKey) {
        return JSON.parse(localStorage.getItem(storageKey));
    },

    clearStorage: function (storageKey) {
        localStorage.removeItem(storageKey);
    }
}