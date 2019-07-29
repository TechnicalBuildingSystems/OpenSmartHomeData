# Open Smart Home Data Set

## License

The time series of measured data from a smart home is subject to Copyright (c) 2018 Fraunhofer Institute for Building Physics, Nürnberg, Germany

The associated meta data in RDF is subject to Copyright (c) 2018 of the contributors associated to the W3C Linked Building Data Community Group.

All files and their documentation within this repository are licensed under the Creative Commons Attribution Share Alike License  (CC BY-SA 4.0); you may not use these files except in compliance with the license. You may obtain a copy of the license at: [https://creativecommons.org/licenses/by-sa/4.0/](https://creativecommons.org/licenses/by-sa/4.0/)

Unless required by applicable law or agreed to in writing, distributed under the License is distributed on an "AS IS" ASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

## Citation

Please refer to publications and the DOI [![DOI](https://zenodo.org/badge/120334357.svg)](https://zenodo.org/badge/latestdoi/120334357) registered for this repository when using the data in your research.

Please also see the documentation in literature:  
Schneider, G. F., Rasmussen, M. H., Bonsma, P., Oraskari, J., & Pauwels, P. (2018). *Linked building data for modular building information modelling of a smart home*. In 11th European Conference on Product and Process Modelling (pp. 407-414). CRC Press.

## Contributors

The files have been prepared by the contribution of the following persons:

- Mads Holten Rasmussen
- Peter Bonsma
- Pieter Pauwels
- Jyrki Oraskari
- Georg Ferdinand Schneider

## Contributing

Please feel free to fork and contribute to the data set in compliance with the issued license. The intention is to have it as a playground use case for manifold data on the web approaches to smart home data.

## The Data

The data set comprises static and dynamic building data. The data is hosted until 30 July 2019 in a GraphDB triple store sponsored by Ontotext: [https://rdf.ontotext.com/4139541402/mydb/repositories/OpenSmartHomeDataSet](https://rdf.ontotext.com/4139541402/mydb/repositories/OpenSmartHomeDataSet). We are currently searching for a new home for the repo, as the GraphDB cloud services ends operation at the 30 July 2019.

Filename | Description
--- | --- 
Measurement | A set of csv files, which contain the measured sensor and actuator values. A description of the data format provided is decribed below. Also see the annotated RDF version.
MeasurementTurtle | RDF dump of the measurements made using a real world smart home system as RDF dumps in ttl format
00_OpenSmartHomeData.ttl | Meta data describing the observations made by the smart home system measurements
01_LinkOsh.ttl | Links linking instances from 00_OpenSmartHomeData.ttl and 02_BotFromRevit.ttl
02_GeoFromRevit.ttl | BOT export from Revit file (05_Flat.rvt)
02_PropsFromRevit.ttl | PROPS export from Revit file (05_Flat.rvt)
02_GeoFromRevit.ttl | 2D space boundaries from Revit file (05_Flat.rvt)
03_GEOM.ttl | GEOM export generated from the IFC file (04_Flat.ifc)
04_Flat.ifc | IFC model of the flat exported from Revit
05_Flat.rvt | Model of the flat in Revit

## Sensor and Actuator Data Description

The CSV files stored in Measurement folder are named and each contain one time series of measured data. The values are obtained for the Bathroom, Kitchen, Room 1, Room 2, Room 3 and the Toilet. The respective time series are stored separated by a tab, where the first column contains the UNIX time and the second is the reading of the sensor. A dot is used to denote floating point numbers. Moreover, the following applies to the data:

- ThermostatTemperature -> This is the air temperature measured at the thermostat mounted to the radiator. There is one room (Room 2) which has two Thermostats. The value is measured in degree Celsius and given as a floating point number.
- Brightness -> This is the brightness measured by the luminance sensor placed in each room. It is reported as a floating point number and is unit is lux. 
- Humidity -> This is the relative humidity of the air inside each room measured by the humidity sensor mounted to the wall. It return the relative humidity in percent as a integer number.
- Temperature -> This is the indoor air temperature in degree celsius measured by the temperature sensor placed in each room.
- SetpointHistory -> This is the setpoint for the room in degree Celsius as a floating point number as defined by the schedule of the controller.
- OutdoorTemperature -> This is the outside air temperature as obtained from a virtual weather service in degree celsius and stored as a floating point number.

## Acknowledgements

The authors gratefully acknowledge the generous support by Ontotext (https://cloud.ontotext.com/), which provided a free instance of GraphDB Cloud to host the OSH until 30 July 2019.
