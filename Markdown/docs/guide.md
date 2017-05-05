# User Guide
Following is a set of instructions to use and test our product.

---

## Accounts Information
The two devices that would need to be accessed in order to test our product are the Raspberry Pi and the server. In order to access the Raspberry Pi you will need to connect it to a power source. If you want to have a graphical interface with it, you can connect an HDMI cable and a mouse and a keyboard to the Raspberry Pi. In order to access the server (in room H275) it needs to be powered on. Following is the information for the accounts in each device.

- Raspberry Pi:

    `Username: pi`

    `Password: raspberry`

- Server:

    `Username: admin`

    `Password: group02`

Beyond these two devices you might want to access one of the computers in the lab, which you can access using your ECS credentials.

### Website information
In the setup instructions you ran a start-up script that created a few base accounts that you can use for testing our product. Following is the information regarding those accounts:

- Admin account (highest privileges)

    `Email: admin@admin.com`

    `Password: admin`

- Worker account (default privileges)

    `Email: worker@worker.com`

    `Password: worker`

- Unassigned worker (no privileges, same as a newly registered account)

    `Email: unassigned@unassigned.com`

    `Password: unassigned`

---

## Interacting with the application
As mentioned in earlier documentation, our app handles the given business problem by creating tasks when a FLIC button is clicked. These tasks are assigned to the registered workers. Following is list of operations you can perform on our system, along with instructions on how to test these.

**Note:** not all roles can perform all the operations presented here. More specifically, an Admin role is the only one allowed to perform most of these operations; a Worker role can only see his/her tasks and complete them.

### Button operations
There are different operations you can perform on button objects.

##### Creation
There are two ways in which a button can be created. More importantly, a button is considered *inactive* until a two-part process is performed. There are two ways to create a button.

1. Creating a button by clicking a FLIC button first.

    With the Raspberry Pi running and listening for button events, click a FLIC button. If successful, you should see a success message in the Raspberry Pi (if using a graphical interface); you should also find the button added in the list of Inactive buttons. In order to make it Active, go to the Buttons table and click on "Actions". In the dropdown menu click on the option "Assign FLIC Button". This will take you to another page where you can assign a button.

2. Creating a button from the website first.

    In the Buttons page you can manually create a button by clicking on the "Actions" button and then clicking on the option "Add FLIC Button". After entering the button information successfully, you will see that the button is added to the Inactive list. **Note:** ensure you entered the MAC address correctly, as it will be matched when you click the button next. In order to activate the button simply click it.

We chose to use this approach to help prevent FLIC buttons from being created accidentally. Hence, buttons require a two-way activation process before their events can trigger a task creation.

##### Editing
Editing a button is super simple. Go to the Buttons page and click on the *pencil* icon in the Buttons table. This will take you to another page where you can edit the button's information. Clicks Save to store your changes or Cancel to ignore those changes.

##### Removing
In order to remove a button you will need to click on the *trash can* icon in the Buttons table. You will see a modal pop up asking you to confirm a button's deletion. Confirm the deletion in order to delete the button.

### Employee operations
Employees operations are performed in a similar way as for the Buttons.

##### Creation
There are two ways to create a worker. You can either register a worker (i.e., the worker would register him/herself) or you can (as an admin) manually create a worker.

- In order to register yourself as a worker, you need to be logged out of the application. Then, in the log in page click on "Regsiter", where you can enter your information. From there you will need an admin to assign you a role before you can do any operations.
- In order to manually create a worker you need to be logged in as an admin. Then head to the Employees page and click on "Add Employee". There you can enter the worker's information and create an account for that worker.

Note that workers need to be assigned a role before they can be assigned a task.

##### Editing
In order to edit an Employee you will need to click on the *pencil* icon in the Employees table. This will take you to another page where you can edit an Employee's information. Click Save to store your changes or Cancel to ignore those changes.

##### Removing
In order to delete a worker you will need to click on the *trash can* icon in the Employees table. You will see a modal pop up asking you to confirm an employee's deletion. Confirm the deletion in order to delete the Employee.

**Note:** all open tasks assigned to an Employee being deleted will be assigned to other available workers.

### Task operations
There is also a set of operations you can perform on Tasks.

##### Creation
There are two ways in which you can create a task. You can either click an Activated button, which would automatically create a task, or you can manually create a task.

- In order to create a task with a FLIC button (intended purpose), make sure that the button is registered in the website and has been activated. When you click it, a new task should be created and assigned to the next available worker.
- In order to create a task manually, go to the Tasks page and click on the "Add Task" button. In order to create a task manually there ought to be buttons and workers registered in the system, so ensure that is the case. From this page, select the button and worker to assign this task to and save.

##### Editing
You can edit a task by clicking on the *pencil* icon in the Tasks table. You will be taken to a new page where you can edit the Employee that task is assigned to. Click Save to store those changes or Cancel to ignore them.

###### Reassigning to another employee
This operation can be done by editing a Task, which is explained in the step above.

##### Removing
In order to delete a task you will need to click on the *trash can* icon in the Tasks table. You will see a modal pop up asking you to confirm a task's deletion. Confirm the deletion in order to delete the Task.


---

## Restoring valid data
During your testing you might need to restore some valid data to proceed. Follow these steps to do that.

1. Remove the *mongodb-docker* directory inside of your *~/data* directory.
2. Head back to the project folder, at the top level, and run the following command:

        ./startup-script.sh

This should clean up the database completely and then create a fresh set of workers with the default account information given above.

---

## Running our test suite
In order to run our test suite you will need to have Mongo installed locally; you can follow [these instructions](https://docs.mongodb.com/manual/administration/install-community/) to install MongoDB.

Once you have MongoDB installed, start it by running the following command (which might require you to use `sudo`):

    mongod

Once MongoDB is running, go to the *pushstock-app/server* directory. Once there, run the following command to run the suite of tests:

    npm test

The output of this command will show you all the tests being ran and a coverage report for all the files in that directory.

---

In the following page you will find some general information about the project developers in charge of this product.
