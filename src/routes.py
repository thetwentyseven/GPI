import ConfigParser
import requests
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, render_template, flash
from urllib import urlopen
import json

app = Flask(__name__)

# Sessions
app.secret_key = "super secret key"

# Database
database = 'database/gpi.db'
conn = sqlite3.connect(database)
c =  conn.cursor()

# Functions
def init_db():
  with app.app_context():
    db = get_db()
    with app.open_resource('database/schema.sql', mode='r') as f:
      db.cursor().executescript(f.read())
    db.commit()

# Routes
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html')

@app.errorhandler(401)
def unauthorized(error):
    return render_template('401.html')

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/api')
def api():
    res = requests.get('https://api.openaq.org/v1/locations?country=GB')
    try:
        data = res.json()['results']
    except KeyError:
        data = None
    return render_template('api.html', data=data)

@app.route('/login', methods=['POST', 'GET'])
def login():
    info = None
    alert = None
    if request.method == 'POST':
        # Get the data from the form
        email = request.form['email']
        password = request.form['password']

        # Check if is in the database
        db = sqlite3.connect(database)
        query = db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password])
        users = [dict(id=row[0], firstname=row[1], lastname=row[2], email=row[3], password=row[4]) for row in query.fetchall()]
        if users:
        # db.close()
            info = "You are now connected."
            session['logged'] = True
            session['id'] = users[0]['id']
            return render_template('login.html', users=users, info=info)
        else:
            alert = "The email or password are wrong, or you are not register."
            return render_template('login.html', users=users, alert=alert)

    else:
        return render_template('login.html', info=info)

@app.route('/logout')
def logout():
    session.pop('logged', None)
    return redirect(url_for('root'))

@app.route('/register', methods=['POST', 'GET'])
def register():
    info = None
    alert = None
    if request.method == 'POST':
        # Get the data from the form
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        email = request.form['email']
        tpassword = request.form['tpassword']
        password = request.form['password']
        # Check if the password matches
        if tpassword != password:
            alert = "The password does not match. Try again."
            return render_template('login.html', info=info, alert=alert)

        # Check if is in the database already
        db = sqlite3.connect(database)
        query = db.execute('SELECT * FROM users WHERE email = ?', [email])
        users = [dict(id=row[0], firstname=row[1], lastname=row[2], email=row[3], password=row[4]) for row in query.fetchall()]
        if users:
            alert = "This user is already on the database."
            return render_template('login.html', users=users, alert=alert)
        else:
            db.execute('INSERT INTO users (firstname,lastname,email,password) VALUES (?,?,?,?)',[firstname,lastname,email,password] )
            db.commit()
            db.close()
            info = "The user has been created."
            return render_template('login.html', users=users, info=info)

    else:
        return render_template('login.html', info=info)

@app.route('/profile')
def profile():
    if not session.get('logged'):
        abort(401)
    id = session['id']
    db = sqlite3.connect(database)
    query = db.execute('SELECT * FROM users WHERE id = ?', [id])
    users = [dict(id=row[0], firstname=row[1], lastname=row[2], email=row[3], password=row[4]) for row in query.fetchall()]
    users = users[0]
    if users:
        return render_template('profile.html', users=users)
    else:
        return render_template('profile.html')

@app.route('/update', methods=['POST', 'GET'])
def update():
    info = None
    alert = None
    if not session.get('logged'):
        abort(401)
    # Get the data from the form
    if request.method == 'POST':
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        email = request.form['email']
        tpassword = request.form['tpassword']
        password = request.form['password']
        # Create a dict to pass it to profile again
        users = {}
        users["firstname"] = firstname
        users["lastname"] = lastname
        users["email"] = email
        users["tpassword"] = tpassword
        users["password"] = password

        # Check if the password matches
        if tpassword != password:
            alert = "The password does not match. Try again."
            return render_template('profile.html', info=info, alert=alert, users=users)
        # Update the user
        id = session.get('id')
        db = sqlite3.connect(database)
        db.execute('UPDATE users SET id = ?, firstname = ?, lastname = ?, password = ? WHERE id = ?', [id, firstname, lastname, password, id])
        db.commit()
        db.close()
        info = "The user has been updated."
        return render_template('profile.html', id=id, info=info, users=users)
    else:
        alert = "Nothing was send through the form."
        return render_template('profile.html', alert=alert)

# Configuration
def init(app):
  config = ConfigParser.ConfigParser()
  try:
      config_location = "etc/default.cfg"
      config.read(config_location)

      app.config['DEBUG'] = config.get("config", "debug")
      app.config['ip_address'] = config.get("config", "ip_address")
      app.config['port'] = config.get("config", "port")
      app.config['url'] = config.get("config", "url")

  except:
      print "Could not read configs from: ", config_location

if __name__ == "__main__":
  init(app)
  app.run(
          host = app.config['ip_address'],
          port = int(app.config['port'])
          )
