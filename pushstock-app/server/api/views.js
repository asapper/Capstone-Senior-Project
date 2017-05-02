/*
 * Filename:    views.js
 * Description: This file defines the views returned in response to API calls.
 *
 * Edit history:
 *
 * Editor       Date            Description
 * ------       --------        -----------
 * sapper       03/01/17        File created
 * rapp         03/13/17        Added task creation in response to singleClick call
 * Saul         03/16/17        Added view to get all employees in DB
 * Saul         03/20/17        Deleted all employees
 * Saul         03/27/17        Added DeleteButtonView
 * Saul         03/27/17        Added DeleteEmployeeView
 * Saul         03/29/17        Working updateSingleEmployeeView
 * Saul         04/11/17        Notifications change for success and failure
 * Saul         04/18/17        If an error occurs deleting an employee null is
 *                              null is returned.
 * Saul         04/20/17        markTaskCompleteView implemented
 * Saul         04/20/17        getOpenTasksView implemented
 * Saul         04/20/17        getComnpleteTasksView implemented
 * Sapper       05/01/17        moved view implementations into separate files
 */

module.exports = {
    // Handle API authentication
    apiAuthProcedure: function(req, res, next) {
        next(); // next route
    },

    // Handle index view for API urls
    indexView: function(req, res) {
        res.json({ message: 'Hooray! Welcome to our API!' });
    },
};
