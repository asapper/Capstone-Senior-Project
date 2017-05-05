#!/usr/bin/env python3

# Filename: my_client.py
# Author: Andy Sapper
#
# This implementation was adapted from that provided by 50ButtonsEach in the
# test_client.py file.
#
# This program attempts to connect to all previously verified Flic buttons by
# this server. It also monitors when new buttons are verified and connects to
# them as well.


import datetime
import fliclib
import urllib.parse
import urllib.request
import io
import json
from datetime import timedelta


API_URL = 'https://192.168.3.128'
LAST_CLICK = 'last_click'
CLICKS_IGNORED = 'clicks_ignored'
# ignores clicks for specified number of seconds
SPAM_THRESHOLD = timedelta(seconds=10)
client = fliclib.FlicClient("localhost")


def process_button_click(channel, click_type, was_queued, time_diff):
    """Process all events from connected buttons."""
    # store time click event occured
    click_timestamp = datetime.datetime.utcnow()
    # store button MAC address
    button_addr = channel.bd_addr

    print("[{}] ".format(channel.bd_addr), end='')
    if click_type is fliclib.ClickType.ButtonSingleClick:
        print("Single click by {} at {}".format(
            button_addr, click_timestamp))
        if button_addr in client.events:  # check timestamp
            if (click_timestamp - client.events[button_addr][LAST_CLICK]) < SPAM_THRESHOLD:
                client.events[button_addr][CLICKS_IGNORED] += 1
                print(">>> Click being ignored...")
            else:  # process click
                send_button_info(button_addr, click_timestamp)
                print(">>> Click being acknowledged; clicks ignored = {}...".format(
                    client.events[button_addr][CLICKS_IGNORED]))
                client.events[button_addr][LAST_CLICK] = click_timestamp
                client.events[button_addr][CLICKS_IGNORED] = 0
        else:
            client.events[button_addr] = {}
            client.events[button_addr][LAST_CLICK] = click_timestamp
            client.events[button_addr][CLICKS_IGNORED] = 0
            send_button_info(button_addr, click_timestamp)
            print(">>> New event being added...")
    elif click_type is fliclib.ClickType.ButtonDoubleClick:
        print("Double click detected...")
    elif click_type is fliclib.ClickType.ButtonHold:
        print("Hold click detected...")
    else:
        print("Unknown click detected... ERROR")


def send_button_info(button_addr, click_timestamp):
    # Get JWT for header
    loginUrl = API_URL + '/auth/login'
    values = { 'email' : 'raspberrypi@pushstock.com',
           'password' : '201702_PVS02_RPi' }
    data = urllib.parse.urlencode(values)
    data = data.encode('ascii')
    loginReq = urllib.request.Request(loginUrl, data )
    with urllib.request.urlopen(loginReq) as r, \
        io.TextIOWrapper(r, encoding=r.headers.get_content_charset('utf-8')) as file:
            result = json.load(file)
    header = {'Authorization': 'JWT ' + result['token']}

    # API url for single click
    url = API_URL + '/api/singleClick'
    # data to send to API
    values = {'macAddr': button_addr,
              'click_timestamp': click_timestamp}
    data = urllib.parse.urlencode(values)
    data = data.encode('ascii')  # bytes
    req = urllib.request.Request(url, data, header)
    with urllib.request.urlopen(req) as response:
        print(response.read())
    # reset client variables used
    client.events[button_addr][LAST_CLICK] = click_timestamp
    client.events[button_addr][CLICKS_IGNORED] = 0


def process_status_change(channel, connection_status, disconnect_reason):
    """Proccesses when the status of a connected button has changed."""
    print((channel.bd_addr + " " + str(connection_status) + (" " +
           str(disconnect_reason) if connection_status ==
           fliclib.ConnectionStatus.Disconnected else "")))


def got_button(bd_addr):
    """Processes status change and click events from connected buttons."""
    cc = fliclib.ButtonConnectionChannel(bd_addr)
    cc.on_button_single_or_double_click_or_hold = process_button_click
    cc.on_connection_status_changed = process_status_change
    client.add_connection_channel(cc)


def got_info(items):
    """Prints MAC addresses of buttons connected."""
    print("{} buttons connected.".format(items['nb_verified_buttons']))
    for bd_addr in items["bd_addr_of_verified_buttons"]:
        got_button(bd_addr)


client.get_info(got_info)
client.on_new_verified_button = got_button
client.handle_events()
