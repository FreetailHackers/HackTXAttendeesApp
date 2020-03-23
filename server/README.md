# The HackTX Attendee App Frontend

## How set up test environment

First, set up the virtual environment
```
python3 -m venv venv
. venv/bin/source
```

After doing this, a ```(venv)``` should show up to the left of the terminal prompt  
  
NOTE: Prior to working on this project, please run ```. venv/bin/source``` and make sure that the ```(venv)``` shows up to the left.  This is to prevent polluting the global pip3 installation.

To install everything needed, run the following command
```
pip3 install -r requirements.txt
```

Next, set up a .env file.
```
touch .env
```

Then, set up the .env file to contain the following
```
TESTING=False
FLASK_DEBUG=True
SECRET_KEY=<Generate random string and insert here>
SQLALCHEMY_DATABASE_URI=sqlite:///db/notification.db
SQLALCHEMY_TRACK_MODIFICATIONS=False
```

To run the server, run the following command
```
flask run
```

The web page should just work by itself, just open it in a web browser.  
To interact with the database, run the following command in the db folder
```
sqlite3 -header notifications.db
```
