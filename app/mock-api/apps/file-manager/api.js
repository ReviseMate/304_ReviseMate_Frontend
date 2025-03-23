import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { items as itemsData } from "./data";
import { cloneDeep } from 'lodash-es';
let FileManagerMockApi = class FileManagerMockApi {
    /**
     * Constructor
     */
    constructor(_fuseMockApiService) {
        this._fuseMockApiService = _fuseMockApiService;
        this._items = itemsData;
        // Register Mock API handlers
        this.registerHandlers();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register Mock API handlers
     */
    registerHandlers() {
        // -----------------------------------------------------------------------------------------------------
        // @ Items - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/file-manager')
            .reply(({ request }) => {
            // Clone the items
            let items = cloneDeep(this._items);
            // See if the folder id exist
            const folderId = request.params.get('folderId') === 'null' ? null : request.params.get('folderId');
            // Filter the items by folder id. If folder id is null,
            // that means we want to root items which have folder id
            // of null
            items = items.filter(item => item.folderId === folderId);
            // Separate the items by folders and files
            const folders = items.filter(item => item.type === 'folder');
            const files = items.filter(item => item.type !== 'folder');
            // Sort the folders and files alphabetically by filename
            folders.sort((a, b) => a.name.localeCompare(b.name));
            files.sort((a, b) => a.name.localeCompare(b.name));
            // Figure out the path and attach it to the response
            // Prepare the empty paths array
            const pathItems = cloneDeep(this._items);
            const path = [];
            // Prepare the current folder
            let currentFolder = null;
            // Get the current folder and add it as the first entry
            if (folderId) {
                currentFolder = pathItems.find(item => item.id === folderId);
                path.push(currentFolder);
            }
            // Start traversing and storing the folders as a path array
            // until we hit null on the folder id
            while (currentFolder?.folderId) {
                currentFolder = pathItems.find(item => item.id === currentFolder.folderId);
                if (currentFolder) {
                    path.unshift(currentFolder);
                }
            }
            return [
                200,
                {
                    folders,
                    files,
                    path,
                },
            ];
        });
    }
};
FileManagerMockApi = __decorate([
    Injectable({ providedIn: 'root' })
], FileManagerMockApi);
export { FileManagerMockApi };
//# sourceMappingURL=api.js.map