# unicorn-rgb-server
HTTP Server to receive instructions to control the lights of the Pimoroni UnicornHD RGB grid

Individual lights can be set with a GET request sent to: /pixel/set/{x}/{y}/{r}/{g}/{b}
Lights can all be reset with a GET request to: /pixel/clear
