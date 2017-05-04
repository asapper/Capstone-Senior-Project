/*
 * File:			api-settings.ts
 * Description:		This file provides information about the API in use.
 *
 * Edit History:
 *
 * Editor			Date				Description
 * ======			========		===========
 * Rapp				03/28/17		File created
 */
export class ApiSettings {
    private static endpoint = 'https://192.168.3.117:4200';
    //public static API = ApiSettings.endpoint + '/api';
    public static AUTH = ApiSettings.endpoint + '/auth';
    //public static API = 'http://localhost:8100/api';
    public static API = '/api';
}
