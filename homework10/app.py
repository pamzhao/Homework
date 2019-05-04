import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.Measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations"
    )

@app.route("/api/v1.0/precipitation")
def names():
    
    # Query all passengers
    results = session.query(Measurement.station, Station.name, Station.latitude, Station.longitude, Station.elevation,Measurement.prcp).all()
    
    # Convert list of tuples into normal list
    all_columns = list(np.ravel(results))

    return jsonify(all_columns)

@app.route("/api/v1.0/stations"")
def stations():
    # Query all passengers
    results = session.query(Station.station, Station.name, Station.latitde, Station.longitude, Station.elevation).all()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_station = []
    for station, name, latitde, longitude, longitude, elevation in results:
        station_dict = {}
        station_dict["station"] = name
        station_dict["name"] = name
        station_dict["latitde"] = latitde
        station_dict["longitude"] = longitude
        station_dict["elevation"] = longitude

        all_stations.append(station_dict)

    return jsonify(all_stations)


if __name__ == '__main__':
    app.run(debug=True)

