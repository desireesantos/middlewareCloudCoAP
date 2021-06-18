#!/bin/bash

echo "Start coap server . . . "
# -v 9 --> Max Verbosity level
# -d 9 --> Dynamic creation of up to a total of max resources. If max is reached, a 4.06 code is returned"
coap-server -v 9 -d 9 &

echo "Start coap client . . . "
sleep 5 &
npm start