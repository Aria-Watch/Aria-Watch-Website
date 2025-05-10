In this paragraph it's described how to assemble the PCB that we designed starting from the order from JLCPCB.

In you want to build our device, make sure you have some background in soldering, even with SMD components.

Alternatively, you can create your own just by using any breadboard and by buying already soldered modules. But that's not going to be covered in this article.
## Requirements
For the PCB build you are going to need at least the following:
### Hardware:
- Air solder (Hot air station)
- Soldering iron
- Flux
- Solder paste
- Solder 
### Components:
- 1 x USB Type C 16 Pin (USB4105)
- 1x 2.45mm 4 Pin Header
- 1x Molex 53261-0871 8 Pin
- 1x AMS1117 3.3v Regulator
- 1x 5050 RGB WS2812B LED
- 1x ESP32-S3 (With or with external antenna)
- 1x 1uF SMD 0805 Capacitor
- 1x 22uF SMD 0805 Capacitor
- 2x 4.7k Ohm 1/4W through hole resistors
- 1x 10k Ohm 1/4W through hole resistor
- 1x PMS5003 
- 1x Bosch BME680
- 1x SCD40

PS: You can easily get all the components from Aliexpress.


# Manufacturing the PCB
You can find the pcb design on our github right here: 

Feel free to choose with which manufacturer go, we suggest you JLCPCB.
# Lets assemble!
So, lets get to the assembly process. 

First of all, start with the bare minimum to test the ESP and power-data connections.
We suggest you to follow the process as described here, but in the end you need to assemble all the components, feel free to do what you are comfortable with.

You can easily find where each components go as its marked on the PCB.
### 1- Type C
Place the necessary solder paste and proceed by soldering the Type-C connector using hot air:

### 2- AMS1117 3.3V 
As this one it's big enough you can proceed by soldering it using a soldering iron, or if you prefer by hot air:

### 3- Capacitors
For this one you will need the hot air as the capacitors are really tiny, proceed by soldering each one as marked on the PCB:

### 4- ESP32-S3
Last for now, solder the ESP32-S3 Package. 
If you are brave enough you can proceed by soldering each pin with the soldering iron, but it's recommended to do it with the hot-air station:

> [!NOTE]  
> At this point we soldered al the basic components to test that the USB power and data lines are correctly working:
> - Try to connect the USB Type-C to a computer.
> - Verify that a new COM device it's showing in the device manager.

### 5- Resistors
You can now proceed to solder the rest of the components, the resistors are labeled on the PCB, for this we recommend using the soldering iron:

### 6- BLE Switch
As the resistors, you can solder this tiny switch with the soldering iron:

### 7- Headers
In the same area, you will find the place for the I2C Headers, proceed to solder those if you want to expand the board with some other custom sensors.

### 8- BOOT button
With the soldering iron also proceed to solder the button needed to choose the boot mode for the ESP32.

### 9- PM Sensor header (Molex 53261-0871 8 Pin)
Place some solder paste where needed and proceed to solder using hot air the Molex connector needed for the PM sensor:

### 10- 5050 LED
Keeping the hot air in hand, proceed to place some solder paste on the LED pads, and solder it:


 


