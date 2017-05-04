/*
 * File:			api-settings.ts
 * Description:		This file provides information about the API in use.
 *
 * Edit History:
 *
 * Editor		Date		Description
 * ======		========	===========
 * Rapp			03/28/17	File created
 * Rapp         05/04/17    Adapted for mobile (no longer uses localhost)
 */
export class ApiSettings {
    //private static endpoint = 'https://192.168.3.117:4200';
    private static endpoint = 'http://192.168.3.117:8333';
    public static API = ApiSettings.endpoint + '/api';
    public static AUTH = ApiSettings.endpoint + '/auth';
    //public static API = '/api';
}
