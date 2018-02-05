# Open Smart Home Data Set

## License

The time series of measured data from a smart home is subject to Copyright (c) 2018 Fraunhofer Institute for Building Physics, Nürnberg, Germany

The associated meta data in RDF is suject to Copyright (c) 2018 W3C Linked Building Data Community Group.

All files and their documentation within this repository are licensed under the Creative Commons Attribution Share Alike License  (CC BY-SA 4.0); you may not use these files except in compliance with the license. You may obtain a copy of the license at: [https://creativecommons.org/licenses/by-sa/4.0/](https://creativecommons.org/licenses/by-sa/4.0/)

Unless required by applicable law or agreed to in writing, distributed under the License is distributed on an "AS IS" ASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

## Contributors

The files have been prepared by the contribution of the following persons:

- Mads Holten Rasmussen
- Peter Bonsma
- Pieter Pauwels
- Georg Ferdinand Schneider

## Contributing

Please feel free to fork and contribute to the data set in compliance with the issued license. The intention is to have it as a playground use case for manifold data on the web approaches to smart home data.

## The Data

The data set comprises static and dynamic building data. 

MeasurementTurtle - RDF dump of the measurements made using a real world smart home system as RDF dumps in ttl format
00_OpenSmartHomeData.ttl - Meta data describing the observations made by the smart home system measurements
01_LinkOshAndRevit.ttl - Links linking instances from 00_OpenSmartHomeData.ttl and 02_BotFromRevit.ttl
02_BotFromRevit.ttl - Bot export from Revit file (05_Flat.rvt)
03_GEOM.ttl - GEOM export generated from the IFC file (04_Flat.ifc)
04_Flat.ifc - IFC model of the flat exported from Revit
05_Flat.rvt - Model of the flat in Revit
