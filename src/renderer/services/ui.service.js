module.exports = (ngModule) => {
    ngModule.service('$ui', (blockUI) => {

        const uiBlockerElementName = 'uiBlocker';

        return {

            //#region Methods

            /*
            * Search for an element
            */
            addSlimScrollbar: (szElementQuery, options) => {
                $(szElementQuery).mCustomScrollbar(options);
            },

            /*
            * Find dom element in page.
            * */
            findDomElement: (element) => {
                return $(element);
            },

            /*
            * Block application ui.
            * */
            blockAppUI: () => {
                let uiBlocker = blockUI.instances.get(uiBlockerElementName);
                if (!uiBlocker)
                    return;

                uiBlocker.start();
            },

            /*
            * Unblock application UI.
            * */
            unblockAppUI: () => {
                let uiBlocker = blockUI.instances.get(uiBlockerElementName);
                if (!uiBlocker)
                    return;

                uiBlocker.stop();
            },

            //#endregion
        };

    });
};