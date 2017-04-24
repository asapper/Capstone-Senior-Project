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

### Main ###

if not os.getcwd().endswith('mobile-app/src'):
    raise RuntimeError('Must be run in mobile-app/src directory')

# Alter index.html

# Switch to app/

