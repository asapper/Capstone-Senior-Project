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
Rapp        04/27/17    Add function for parsing and editing files
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
# format: (start_comment, end_comment) ...all thanks to html
comments = {
    'html': ('<!--', '-->'),
    'ts': ('//', '')
}

# List of files to scan, w/ relative paths from src directory
'''
files = [
    'index.html',
    'app/app.module.ts',
    'app/services/api-settings.ts'
]
'''
files = [
    'parsetest.ts',
    'parsetest.html'
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

    # Build regex patterns
    multfmtstr = '^\s*{}\s*{} {}{}'

    addsingle = '^(\s*){}\s*{}\s+(.*){}'.format(comment[0], mobile_add,
            comment[1])
    as_pat = re.compile(addsingle)

    #print 'addsingle: ', addsingle

    addmultstart = multfmtstr.format(comment[0], mobile_add, mobile_mult_start,
            comment[1])
    addmultend = multfmtstr.format(comment[0], mobile_add, mobile_mult_end,
            comment[1])
    addmultmid = '^(\s*){}\s*(.*){}'.format(comment[0], comment[1])
    am_start_pat = re.compile(addmultstart)
    am_end_pat = re.compile(addmultend)
    am_mid_pat = re.compile(addmultmid)

    #print 'addmult: {} {} {}'.format(addmultstart, addmultend, addmultmid)

    delsingle = '^.*{}\s*{}\s*{}'.format(comment[0], mobile_del, comment[1])
    ds_pat = re.compile(delsingle)

    #print 'delsingle: ', delsingle

    delmultstart = multfmtstr.format(comment[0], mobile_del, mobile_mult_start,
            comment[1])
    delmultend = multfmtstr.format(comment[0], mobile_del, mobile_mult_end,
            comment[1])
    dm_start_pat = re.compile(delmultstart)
    dm_end_pat = re.compile(delmultend)

    #print 'delmult: {} {}'.format(delmultstart, delmultend)

    changesingle = '^(\s*).+{}\s*{}\s+(.+){}'.format(comment[0], mobile_change,
            comment[1])
    cs_pat = re.compile(changesingle)

    #print 'changesingle: ', changesingle

    changemultstart = multfmtstr.format(comment[0], mobile_change,
            mobile_mult_start, comment[1])
    changemultend = multfmtstr.format(comment[0], mobile_change,
            mobile_mult_end, comment[1])
    # Allow change to be empty, so basically a delete
    changemultmid = '^(\s*).+{}\s*(.*){}'.format(comment[0], comment[1])
    cm_start_pat = re.compile(changemultstart)
    cm_end_pat = re.compile(changemultend)
    cm_mid_pat = re.compile(changemultmid)

    #print 'changemult: {} {} {}'.format(changemultstart, changemultend, 
            #changemultmid)

    # Delete any lines
    old_lines = lines
    lines = []
    keep_line = True
    for line in old_lines:
        if keep_line and dm_start_pat.match(line):
            keep_line = False
            continue

        if not keep_line and dm_end_pat.match(line):
            keep_line = True
            continue

        if ds_pat.match(line):
            continue

        if keep_line:
            lines.append(line)

    def edit_lines(old_lines, single, start, mid, end):
        new_lines = []
        mult = False
        for line in old_lines:
            if not mult:
                if start.match(line):
                    mult = True
                    continue

                result = single.match(line)
                if result:
                    line = result.group(1) + result.group(2)
                new_lines.append(line)
            else:
                mid_result = mid.match(line)
                end_result = end.match(line)

                if end_result:
                    mult = False
                    continue
                elif mid_result:
                    new_lines.append(mid_result.group(1) + mid_result.group(2))
                else:
                    # Currently editing mult lines, but line doesn't match
                    raise RuntimeError(('"{}" should be marked for edit, but'
                            + 'isn\'t').format(line))

        return new_lines

    # Change any lines
    lines = edit_lines(lines, cs_pat, cm_start_pat, cm_mid_pat, cm_end_pat)

    # Add any lines
    lines = edit_lines(lines, as_pat, am_start_pat, am_mid_pat, am_end_pat)

    '''
    # Change any lines
    old_lines = lines
    lines = []
    changing_mult = False
    for line in old_lines:
        if not changing_mult:
            if cm_start_pat.match(line):
                changing_mult = True
                continue

            result = cs_pat.match(line)
            if result:
                line = result.group(1) + result.group(2)
            lines.append(line)
        else:
            mid = cm_mid_pat.match(line)
            end = cm_end_pat.match(line)

            if end:
                changing_mult = False
            elif mid:
                line = result.group(1) + result.group(2)
                lines.append(line)
            else:
                # If line doesn't match a change_mult pattern, raise error
                raise RuntimeError('"{}" should be marked for change, but
                        isn\'t'.format(line))

    # Add any lines
    old_lines = lines
    lines = []
    adding_mult = False
    for line in old_lines:
        if not adding_mult:
            if am_start_pat.match(line):
                adding_mult = True
                continue

            result = as_pat.match(line)
            if result:
                line = result.group(1) + result.group(2)
            lines.append(line)
        else:
            mid = am_mid_pat.match(line)
            end = am_end_pat.match(line)

            if end:
                adding_mult = False
                continue
            elif mid:
                line = result.group(1) + result.group(2)
                lines.append(line)
            else:
                # If line doesn't match an add_mult pattern, raise error
                raise RuntimeError('"{}" should be marked for change, but
                        isn\'t'.format(line))
    '''

    for i, line in enumerate(lines):
        if line.find('\n') < 0:
            lines[i] = line + '\n'

    for line in lines:
        print line,

    '''
    # Write new contents back to file
    f = open(filename, 'w')
    for line in lines:
        f.write(line)
        pass
    f.close()
    '''


### Main ###

# Check whether run in the right directory
if (not os.getcwd().endswith('mobile-app' + sep + 'src')
        and not os.getcwd().endswith('mobile-app' + sep + 'src' + sep)):
    #errorstr = 'Must be run in mobile-app%ssrc directory' % sep
    #raise RuntimeError(errorstr)
    raise RuntimeError('Must be run in mobile-app{0}src{0}'.format(sep))

for filename in files:
    print 'Modifying {}...'.format(filename)
    scan_and_modify(filename)

