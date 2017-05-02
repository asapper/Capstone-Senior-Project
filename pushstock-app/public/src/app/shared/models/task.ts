/*
* File: task.ts
* Author: Andy Sapper
* Description: model used for tasks.
*
* Edit history:
*
* Editor       Date            Description
* ======       ========        ===========
* Sapper       04/07/17        File created
*/

import { Button } from './button';
import { Employee } from './employee';

export class Task {
    public button: Button;
    public employee: Employee;
}
