var storeGenerator = require('./store-generator');

module.exports = storeGenerator({
    getActiveSection: function() {
        return this._cachedData.activeSection;
    },

    getActiveItem: function() {
        return this._cachedData.activeItem;
    },

    isActive: function() {
        return this._cachedData.isActive;
    },

    activate: function() {
        this._cachedData.isActive = true;
        this.emit('changed');
    },

    deactivate: function() {
        this._cachedData.isActive = false;
        this.emit('changed');
    },

    setActiveMenuItem: function(activeSection, activeItem) {
        this._cachedData = {
            activeSection: activeSection,
            activeItem: activeItem
        };
        this.emit('changed');
    },

    resetData: function() {
        this._cachedData = {
            activeSection: null,
            activeItem: null,
            isActive: false
        };
    },

    _cachedData: {
        activeSection: null,
        activeItem: null,
        isActive: false
    }
});
