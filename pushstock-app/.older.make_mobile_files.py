#!/usr/bin/env python

'''
Filename:       make_mobile_files.py
Description:    This program modifies the website source files to enable Ionic 
                to compile them into a mobile app.

Edit History:

Editor      Date        Description
======      ========    ===========
Rapp        04/22/17    File created
'''

### Imports ###

import sys
import os


### "Global" Variables ###

# OS-specific path separator
sep = os.sep

# Directives for making change relative to current line
af = 'after'
be = 'before'
de = 'delete'
re = 'replace'

'''
Guide for adding a change:
    1. Provide key as primary text of line (w/o preceding whitespace)
        e.g. "<app-root></app-root>"
    2. Provide value as a list of tuples in the format
        [
            (prompt=(True or False), directive=(af or be or de or re),
            text=None),
            ...
        ]
'''
index_changes = {

}

app_module_changes = {
}

api_settings_changes = {
}

# Dict of filenames (relative to mobile-app/src) and their change dicts
file_changes = {
    'index.html': index_changes,
    'app' + sep + 'app.module.ts': app_module_changes,
    'app' + sep + 'services' + sep + 'api-settings.ts': api_settings_changes
}


### Functions ###

def apply_all_changes(f, changes):
    print 'Modifying ',
    print f
    for text, change_list in changes:
        print 'Make the following changes at "' + text + '":'
        for change in change_list:
            print '\tPrompt: ', change[0]
            print '\tDirective: ', change[1]
            print '\tText: ', change[2]

def apply_change(f, change):
    pass


### Main ###

# Check whether run in the right directory
if (not os.getcwd().endswith('mobile-app' + sep + 'src')
        and not os.getcwd().endswith('mobile-app' + sep + 'src' + sep)):
    raise RuntimeError('Must be run in mobile-app' + sep + 'src directory')

for f, changes in file_changes:
    #print 'Applying changes to %s...' % (f)
    apply_all_changes(f, changes)
