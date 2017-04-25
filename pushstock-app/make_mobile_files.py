#!/usr/bin/env python

'''
Filename:       make_mobile_files.py
Description:    This program modifies the website source files to enable Ionic 
                to compile them into a mobile app. It scans each file in its
                list and looks for commented mobile add or delete commands and
                then executes them (delete deletes intermittent lines, add
                uncomments them).

                Rules for adding mobile add or delete commands to a file:
                    To add a single line, write 
                        <comment token> mobile add <line to add>
                    To add multiple lines, write
                        <comment token> mobile add --start
                        <comment token> <line to add>
                        ...
                        <comment token> mobile add --end

                    To change a single line, write
                        <line to delete> <comment token> mobile change <line to
                        add>
                    To change multiple lines, write
                        <comment token> mobile change --start
                        <line to delete> <comment token> <line to add>
                        ...
                        <comment token> mobile change --end

                    To delete a single line, write
                        <line to delete> <comment token> mobile delete
                    To delete multiple lines, write
                        <comment token> mobile delete --start
                        <line to delete>
                        ...
                        <comment token> mobile delete --end

Edit History:

Editor      Date        Description
======      ========    ===========
Rapp        04/22/17    File created
Rapp        04/25/17    Added global variables to guide how to modify files
'''

### Imports ###

#import sys
import os
import re


### "Global" Variables ###

# OS-specific path separator
sep = os.sep

# Commands denoting where to start uncommenting or deleting
mobile_add = 'mobile add' 
mobile_change = 'mobile change'
mobile_del = 'mobile delete'
mobile_mult_start = '--start'
mobile_mult_end = '--end'

# The single-line comment style associated with each file type
comments = {
    'html': '<!--',
    'ts': '//'
}

# List of files to scan, w/ relative paths from src directory
files = [
    'index.html',
    'app/app.module.ts',
    'app/services/api-settings.ts'
]


### Functions ###

def scan_and_modify(filename):
    # Get file contents
    f = open(filename)
    lines = f.readlines()
    f.close()

    # Get file comment style
    filetype = filename[filename.rfind('.')+1:]
    comment = comments[filetype]

    # cur debug
    #print 'comment style is ', comment

    # Build regex patterns

    multfmtstr = '\s*{}\s*{} {}'

    addsingle = '(\s*){}\s*{}\s+(.*)'.format(comment, mobile_add)

    #print 'addsingle: ', addsingle

    addmultstart = multfmtstr.format(comment, mobile_add, mobile_mult_start)
    addmultend = multfmtstr.format(comment, mobile_add, mobile_mult_end)
    addmultmid = '(\s*){}\s*(.*)'.format(comment)

    #print 'addmult: {} {} {}'.format(addmultstart, addmultend, addmultmid)

    delsingle = '.*{}\s*{}'.format(comment, mobile_del)

    #print 'delsingle: ', delsingle

    delmultstart = multfmtstr.format(comment, mobile_del, mobile_mult_start)
    delmultend = multfmtstr.format(comment, mobile_del, mobile_mult_end)

    #print 'delmult: {} {}'.format(delmultstart, delmultend)

    changesingle = '(\s*).+{}\s*{}\s+(.*)'.format(comment, mobile_change)

    #print 'changesingle: ', changesingle

    changemultstart = multfmtstr.format(comment, mobile_change,
            mobile_mult_start)
    changemultend = multfmtstr.format(comment, mobile_change, mobile_mult_end)
    changemultmid = '(\s*).+{}\s+(.*)'.format(comment)

    #print 'changemult: {} {} {}'.format(changemultstart, changemultend, 
            #changemultmid)

    # Delete any lines
    for line in lines: pass


    # Change any lines

    # Add any lines

    # TODO delete old file first???
    # Write new contents back to file
    f = open(filename, 'w')
    for line in lines:
        #f.write(line)
        pass
    f.close()


### Main ###

# Check whether run in the right directory
if (not os.getcwd().endswith('mobile-app' + sep + 'src')
        and not os.getcwd().endswith('mobile-app' + sep + 'src' + sep)):
    errorstr = 'Must be run in mobile-app%ssrc directory' % sep
    raise RuntimeError(errorstr)

for filename in files:
    print 'Modifying {}...'.format(filename)
    scan_and_modify(filename)

