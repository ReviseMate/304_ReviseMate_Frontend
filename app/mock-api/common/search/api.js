import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { contacts } from "../../apps/contacts/data";
import { tasks } from "../../apps/tasks/data";
import { defaultNavigation } from "../navigation/data";
import { cloneDeep } from 'lodash-es';
let SearchMockApi = class SearchMockApi {
    /**
     * Constructor
     */
    constructor(_fuseMockApiService, _fuseNavigationService) {
        this._fuseMockApiService = _fuseMockApiService;
        this._fuseNavigationService = _fuseNavigationService;
        this._defaultNavigation = defaultNavigation;
        this._contacts = contacts;
        this._tasks = tasks;
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
        // Get the flat navigation and store it
        const flatNavigation = this._fuseNavigationService.getFlatNavigation(this._defaultNavigation);
        // -----------------------------------------------------------------------------------------------------
        // @ Search results - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/common/search')
            .reply(({ request }) => {
            // Get the search query
            const query = cloneDeep(request.body.query.toLowerCase());
            // If the search query is an empty string,
            // return an empty array
            if (query === '') {
                return [200, { results: [] }];
            }
            // Filter the contacts
            const contactsResults = cloneDeep(this._contacts)
                .filter(contact => contact.name.toLowerCase().includes(query));
            // Filter the navigation
            const pagesResults = cloneDeep(flatNavigation)
                .filter(page => (page.title?.toLowerCase().includes(query) || (page.subtitle && page.subtitle.includes(query))));
            // Filter the tasks
            const tasksResults = cloneDeep(this._tasks)
                .filter(task => task.title.toLowerCase().includes(query));
            // Prepare the results array
            const results = [];
            // If there are contacts results...
            if (contactsResults.length > 0) {
                // Normalize the results
                contactsResults.forEach((result) => {
                    // Add a link
                    result.link = '/apps/contacts/' + result.id;
                    // Add the name as the value
                    result.value = result.name;
                });
                // Add to the results
                results.push({
                    id: 'contacts',
                    label: 'Contacts',
                    results: contactsResults,
                });
            }
            // If there are page results...
            if (pagesResults.length > 0) {
                // Normalize the results
                pagesResults.forEach((result) => {
                    // Add the page title as the value
                    result.value = result.title;
                });
                // Add to the results
                results.push({
                    id: 'pages',
                    label: 'Pages',
                    results: pagesResults,
                });
            }
            // If there are tasks results...
            if (tasksResults.length > 0) {
                // Normalize the results
                tasksResults.forEach((result) => {
                    // Add a link
                    result.link = '/apps/tasks/' + result.id;
                    // Add the title as the value
                    result.value = result.title;
                });
                // Add to the results
                results.push({
                    id: 'tasks',
                    label: 'Tasks',
                    results: tasksResults,
                });
            }
            // Return the response
            return [200, results];
        });
    }
};
SearchMockApi = __decorate([
    Injectable({ providedIn: 'root' })
], SearchMockApi);
export { SearchMockApi };
//# sourceMappingURL=api.js.map